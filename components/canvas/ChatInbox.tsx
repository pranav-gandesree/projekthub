'use client'

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
// import io from 'socket.io-client';
import axios from 'axios';

let socket;

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
}

// const ChatInbox = ({ closeChat }: any) => {
const ChatInbox = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const [currentReceiverId, setCurrentReceiverId] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);

//   useEffect(() => {
//     const initializeSocket = async () => {
//       // Connect to the socket
//       await fetch('/api/socket'); // Initialize Socket.IO
//       socket = io();

//       // Fetch session and join room
//       const session = await getSession();
//       setSession(session);

//       if (session) {
//         socket.emit('joinRoom', session.user.id);

//         // Fetch previous messages from the API
//         const response = await axios.get(`/api/messages?receiverId=${session.user.id}`);
//         setMessages(response.data);

//         // Listen for incoming messages
//         socket.on('receiveMessage', (newMessage) => {
//           setMessages((prevMessages) => [...prevMessages, newMessage]);
//         });
//       }
//     };

//     initializeSocket();

//     return () => {
//       if (socket) socket.disconnect();
//     };
//   }, []);

const [isChatOpen, setIsChatOpen] = useState(false);

const closeChat = () =>{

      setIsChatOpen((prev) => !prev);

}


//   const sendMessage = async () => {
//     if (!messageContent || !currentReceiverId) return;

//     const message = {
//       senderId: session.user.id,
//       receiverId: currentReceiverId,
//       content: messageContent,
//     };

//     // Emit message to Socket.IO server
//     socket.emit('sendMessage', message);

//     // Optionally store the message in the database (via API)
//     await axios.post('/api/messages', message);

//     // Update UI with sent message
//     setMessages((prevMessages) => [...prevMessages, message]);
//     setMessageContent('');
//   };

  return (
    <div className="fixed bottom-0 right-0 bg-white shadow-lg w-96 h-96 p-4 border border-gray-300">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Chat Inbox</h3>
        <button onClick={closeChat}>✖️ Close</button>

      </div>
      <div className="overflow-y-auto h-64 my-2">
        {/* Display chat messages */}
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="p-2 border-b border-gray-200">
              <p><strong>{msg.senderId === session.user.id ? 'You' : 'Sender'}:</strong> {msg.content}</p>
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>

      <div className="mt-2">
        <input
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-2 border rounded"
        />
        <button  className="bg-blue-500 text-white p-2 mt-2 rounded w-full">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInbox;
