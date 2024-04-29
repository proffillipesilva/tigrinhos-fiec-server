import dotenv from 'dotenv'
import http from 'http';
import app from './config';
import WebSocket, { Server } from 'ws';
//import { AppDataSource } from './config/data-source';
import connectDB from './config/mongo-source';
import { AppDataSource } from './config/data-source';

const nomeApp = ["Tigrinhos Fiec 2024"]



const environment = (process.env.NODE_ENV || "local").trim();

dotenv.config({ path: `.env.${environment}` })
//dotenv.config({ path: `.env.local` })

console.log(`${nomeApp} vai rodar na porta ${process.env.PORT}`);

const server = http.createServer(app);


const wss = new Server({ server });

wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');
  
    ws.on('message', (message: string) => {
      console.log(`Received message: ${message}`);
      wss.clients.forEach((client) => {
        client.send(`Server received your message: ${message}`);
      });
    });
  
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

AppDataSource.initialize().then(() => {
    server.listen(process.env.PORT, () => "Servidor Inicializado");
})

/*
connectDB().then( ()=> {
    server.listen(process.env.PORT, () => "Servidor Inicializado");
})*/
