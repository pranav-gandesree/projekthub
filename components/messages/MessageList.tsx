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




























'use client'

import React, { useEffect, useState } from 'react';
import { Contact } from '@/app/types/message';
import ContactList from './ContactList';
import MessageThread from './MessageThread';
import MessageInput from './MessageInput';
import { useRouter } from 'next/router';

export default function MessageList() {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new WebSocket('ws://localhost:4000');
    
    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    setWs(socket);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const handleSendMessage = (content: string) => {
    if (ws && content.trim()) {
      const message = {
        senderId: 'userId1', // Replace with actual user ID
        recipientId: selectedContact.id,
        content,
        timestamp: new Date().toISOString(),
      };

      // Send the message to WebSocket server
      ws.send(JSON.stringify(message));

      // Optionally, add it to local messages for instant feedback
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <ContactList
        contacts={contacts}
        selectedContact={selectedContact}
        onSelectContact={setSelectedContact}
      />
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
