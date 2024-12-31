// import React from 'react';
// import { Contact, Message } from '@/app/types/message';

// type MessageThreadProps = {
//   messages: Message[];
//   selectedContact: Contact;
// };

// export default function MessageThread({ messages, selectedContact }: MessageThreadProps) {
//   return (
//     <div className="flex-1 flex flex-col">
//       <div className="p-4 border-b border-gray-700 flex items-center bg-gray-800">
//         <img
//           src={selectedContact.avatar}
//           alt={selectedContact.name}
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         <div className="ml-4">
//           <h2 className="font-semibold text-purple-300">{selectedContact.name}</h2>
//           <span className="text-sm text-gray-400">
//             {selectedContact.isActive ? 'Active now' : 'Offline'}
//           </span>
//         </div>
//       </div>
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${message.id === '2' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`max-w-[70%] p-3 rounded-lg ${
//                 message.id === '2'
//                   ? 'bg-purple-600 text-white'
//                   : 'bg-gray-800 text-gray-100'
//               }`}
//             >
//               <p>{message.content}</p>
//               <span className="text-xs mt-1 block opacity-70">
//                 {message.timestamp}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }













'use client';

import React from 'react';
import { Message, Contact } from '@/app/types/message';
import { useSession } from 'next-auth/react';

interface MessageThreadProps {
  messages: Message[];
  selectedContact: Contact;
}

export default function MessageThread({ messages, selectedContact }: MessageThreadProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-900 p-4">
      <div className="space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === userId;

          return (
            <div
              key={message.id}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  isOwnMessage
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}>
                <p>{message.content}</p>
                <span className="text-xs text-gray-300 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}