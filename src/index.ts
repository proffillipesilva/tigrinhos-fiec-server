import dotenv from 'dotenv'
import http from 'http';
import app from './config';
import { AppDataSource } from './config/data-source';
import connectDB from './config/mongo-source';

const nomeApp = ["Tigrinhos Fiec 2024"]

let x = '5';

//dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
dotenv.config({ path: `.env.local` })

console.log(`${nomeApp} vai rodar na porta ${process.env.PORT}`);

const server = http.createServer(app);


AppDataSource.initialize().then(() => {
    server.listen(process.env.PORT, () => "Servidor Inicializado");
})
/*
connectDB().then( ()=> {
    server.listen(process.env.PORT, () => "Servidor Inicializado");
}) */

