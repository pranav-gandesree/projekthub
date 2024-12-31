import { useEffect, useRef, useCallback, useState } from 'react';
import { Message } from '@/app/types/message';

export function useWebSocket(url: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    // ws.onmessage = (event) => {
    //   const message = JSON.parse(event.data) as Message;
    //   setMessages((prev) => [...prev, message]);
    // };


    ws.onmessage = async (event) => {
      const data = event.data instanceof Blob 
        ? await event.data.text() 
        : event.data;
    
      try {
        const message = JSON.parse(data) as Message;
        setMessages((prev) => [...prev, message]);
      } catch (error) {
        console.error('Failed to parse message:', error, data);
      }
    };
    

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  // const sendMessage = useCallback(
  //   (message: any) => {
  //     if (socket?.readyState === WebSocket.OPEN) {
  //       socket.send(JSON.stringify(message));
  //     }
  //   },
  //   [socket]
  // );


  return { messages, sendMessage };
}