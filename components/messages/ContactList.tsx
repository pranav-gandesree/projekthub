import React from 'react';
import { Contact } from '@/app/types/message';

type ContactListProps = {
  contacts: Contact[];
  selectedContact: Contact;
  onSelectContact: (contact: Contact) => void;
};

export default function ContactList({ contacts, selectedContact, onSelectContact }: ContactListProps) {
  return (
    <div className="w-1/3 border-r border-gray-700 bg-gray-900">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-purple-400">Messages</h2>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-73px)]">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={`flex items-center p-4 cursor-pointer hover:bg-gray-800 ${
              selectedContact.id === contact.id ? 'bg-gray-800' : ''
            }`}
          >
            {/* <img
              src={contact.avatar}
              alt={contact.name}
              className="w-12 h-12 rounded-full object-cover"
            /> */}
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-purple-300">{contact.name}</h3>
                <span className="text-xs text-gray-400">{contact.lastMessage.timestamp}</span>
              </div>
              <p className="text-sm text-gray-400 truncate">{contact.lastMessage.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}













