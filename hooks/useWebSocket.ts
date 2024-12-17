import { useEffect, useRef } from 'react';

const useWebSocket = (url: string, onMessage: (data: any) => void) => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => console.log("WebSocket connected");
    ws.current.onmessage = (event) => onMessage(JSON.parse(event.data));
    ws.current.onclose = () => console.log("WebSocket disconnected");

    return () => ws.current?.close();
  }, [url, onMessage]);

  const sendMessage = (message: any) => {
    ws.current?.send(JSON.stringify(message));
  };

  return { sendMessage };
};

export default useWebSocket;
