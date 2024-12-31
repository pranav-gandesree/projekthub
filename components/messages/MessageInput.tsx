// import React from 'react';
// import { MessageSquare } from 'lucide-react';

// export default function MessageInput() {
//   return (
//     <div className="p-4 border-t border-gray-700 bg-gray-800">
//       <div className="flex items-center space-x-2">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:border-purple-500 text-gray-100 placeholder-gray-400"
//         />
//         <button className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
//           <MessageSquare className="w-5 h-5" />
//         </button>
//       </div>
//     </div>
//   );
// }


'use client'

import React, { useState } from 'react';

type MessageInputProps = {
  onSendMessage: (content: string) => void;
};

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [content, setContent] = useState('');

  const handleSend = () => {
    onSendMessage(content);
    setContent('');
  };

  return (
    <div className="p-4 border-t border-gray-700 bg-gray-800 flex flex-row gap-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
        className="w-3/4 p-2 bg-gray-700 text-white rounded-lg"
      />
      <button
        onClick={handleSend}
        className=" w-1/4 mt-2 py-2 bg-purple-600 text-white rounded-lg"
      >
        Send
      </button>
    </div>
  );
}
