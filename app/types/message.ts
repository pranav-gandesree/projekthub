export type Message = {
    id: string;
    content: string;
    timestamp: string;
    senderId: string;
    recipientId: string;
  };
  
  export type Contact = {
    id: string;
    name: string;
    avatar: string;
    lastMessage: Message;
    isActive: boolean;
  };

  export type LastMessage = {
    content: string;
    timestamp: string; // ISO string or formatted date
  };