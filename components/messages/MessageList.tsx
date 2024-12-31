
'use client';

import React, { useEffect, useState } from 'react';
import { Contact } from '@/app/types/message';
import ContactList from './ContactList';
import MessageThread from './MessageThread';
import MessageInput from './MessageInput';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useWebSocket } from '@/hooks/useWebSocket';

export default function MessageList() {
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(undefined);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id!;

  const { messages, sendMessage } = useWebSocket('ws://localhost:4000');

  // Fetch contacts from API
  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(`/api/contacts?userId=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch contacts');
        console.log("response is", { response });

        const data: Contact[] = await response.json();
        setContacts(data);

        if (data.length > 0) {
          setSelectedContact(data[0]);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }
    console.log({ messages, userId, selectedContact });

    if (userId) {
      fetchContacts();
    }
  }, [userId]);

  // Handle sending messages
  const handleSendMessage = (content: string) => {
    if (content.trim() && selectedContact) {
      sendMessage({
        senderId: userId,
        recipientId: selectedContact.id,
        content,
      });
    }
  };

  // Filter messages for selected contact
  const filteredMessages = messages.filter(
    (msg) =>
      (msg.senderId === userId && msg.recipientId === selectedContact?.id) ||
      (msg.senderId === selectedContact?.id && msg.recipientId === userId)
  );

  return (
    <div className="flex h-screen bg-gray-900">
      <ContactList
        contacts={contacts}
        selectedContact={selectedContact || contacts[0]}
        onSelectContact={(contact) => setSelectedContact(contact)}
      />

      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            <MessageThread messages={filteredMessages} selectedContact={selectedContact} />
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