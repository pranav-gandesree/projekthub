
import express from "express"
import { WebSocketServer, WebSocket } from "ws";
const app = express();

const server = app.listen(4000, ()=> {
  console.log("Server started at http://localhost:4000");
})


const wss = new WebSocketServer({server})


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
