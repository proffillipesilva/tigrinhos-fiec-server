import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'
import morgan from 'morgan'
import usuarioRouter from '../routes/usuarioRouter';
import gameRouter from '../routes/gameRouter';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptionsWithRequest } from 'passport-jwt';
import passport from 'passport';
import jwt from 'jsonwebtoken'
import authRouter from '../routes/authRouter';
import expressWs from 'express-ws';
import firebaseRouter from '../routes/firebaseRouter';
import { firebaseAdmin } from './firebase-config';
import path from 'path';


const app = expressWs(express()).app;

const efemeralData = {}

app.use(cors());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'))
app.use(express.json())

app.use('/', express.static('public'));

const jwtSecret = 'secret';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey:  jwtSecret,
    passReqToCallback: true
  } ;

  passport.use(new JwtStrategy(jwtOptions as StrategyOptionsWithRequest, async ( req: Request, jwtPayload, done) => {
    const url = req.method + ' ' + req.baseUrl + req.url
    console.log("user: ", jwtPayload.sub, " - url: - ", url )
    
    req.user = { id: jwtPayload.id, email: jwtPayload.sub}
    done(null, req.user )
  }));

  

  

app.use('/usuarios', passport.authenticate('jwt', { session: false }), usuarioRouter);

app.use('/auth', authRouter);

app.use('/games', gameRouter);

app.use('/firebase', firebaseRouter);




export default app;