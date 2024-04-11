import express, { Request, Response } from 'express';
import cors from 'cors'
import morgan from 'morgan'
import usuarioRouter from '../routes/usuarioRouter';
import gameRouter from '../routes/gameRouter';



const app = express();

app.use(cors());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'))
app.use(express.json())
app.use('/usuarios', usuarioRouter);
app.use('/games', gameRouter);


export default app;