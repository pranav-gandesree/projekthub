export type Message = {
    id: string;
    content: string;
    timestamp: string;
  };
  
  export type Contact = {
    id: string;
    name: string;
    avatar: string;
    lastMessage: Message;
    isActive: boolean;
  };