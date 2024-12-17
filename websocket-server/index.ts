import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('User connected');
  
  ws.on('message', (message) => {
    console.log('Received message:', message);
    // Broadcast the message to other connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => {
  console.log('WebSocket server listening on port 4000');
});
