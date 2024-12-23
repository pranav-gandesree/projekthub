// 'use client'

// import React from 'react';
// import { contacts, messages } from '@/data/mockData';
// import { Contact } from '@/app/types/message';
// import ContactList from './ContactList';
// import MessageThread from './MessageThread';
// import MessageInput from './MessageInput';

// export default function MessageList() {
//   const [selectedContact, setSelectedContact] = React.useState<Contact>(contacts[0]);

//   return (
//     <div className="flex h-screen bg-gray-900">
//       <ContactList
//         contacts={contacts}
//         selectedContact={selectedContact}
//         onSelectContact={setSelectedContact}
//       />
//       <div className="flex-1 flex flex-col">
//         {selectedContact ? (
//           <>
//             <MessageThread messages={messages} selectedContact={selectedContact} />
//             <MessageInput />
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-400 bg-gray-900">
//             Select a conversation to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }























'use client';

import React, { useEffect, useState } from 'react';
import { Contact, Message } from '@/app/types/message'; 
import ContactList from './ContactList';
import MessageThread from './MessageThread';
import MessageInput from './MessageInput';
import { useRouter } from 'next/navigation'; 
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';

export default function MessageList() {
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(undefined); 
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const router = useRouter();

  const { data: session } = useSession();

  // Get the user ID dynamically
  const userId = session?.user.id!; 

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4000');

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data) as Message;
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWs(socket);

    // Cleanup WebSocket on unmount
    return () => {
      if (socket) {
        socket.close();
        console.log('WebSocket disconnected');
      }
    };
  }, []);

  // Fetch contacts from API
  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(`/api/contacts?userId=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch contacts');

        const data: Contact[] = await response.json();
        setContacts(data);

        // Automatically select the first contact if available
        if (data.length > 0) {
          setSelectedContact(data[0]);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }

    fetchContacts();
  }, [userId]);

  // Handle sending messages
  const handleSendMessage = (content: string) => {
    if (ws && content.trim() && selectedContact) {
      const message: Message = {
        senderId: userId,
        recipientId: selectedContact.id,
        content,
        timestamp: new Date().toISOString(),
        id: uuidv4(),
      };

      // Send the message via WebSocket
      ws.send(JSON.stringify(message));

      // Optimistically update local state
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Contact List */}
      <ContactList
        contacts={contacts}
        selectedContact={selectedContact || contacts[0]}
        onSelectContact={(contact) => setSelectedContact(contact)}
      />

      {/* Message Thread and Input */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            <MessageThread messages={messages} selectedContact={selectedContact} />
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 bg-gray-900">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
