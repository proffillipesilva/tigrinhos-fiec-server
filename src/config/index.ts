import express, { Request, Response } from 'express';
import cors from 'cors'
import morgan from 'morgan'
import usuarioRouter from '../routes/usuarioRouter';
import gameRouter from '../routes/gameRouter';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptionsWithRequest } from 'passport-jwt';
import passport from 'passport';
import jwt from 'jsonwebtoken'


const app = express();

app.use(cors());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'))
app.use(express.json())

const jwtSecret = process.env.JWT_SECRET || 'secret'

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey:  jwtSecret,
    passReqToCallback: true
  } ;

  passport.use(new JwtStrategy(jwtOptions as StrategyOptionsWithRequest, async ( req: Request, jwtPayload, done) => {
    const url = req.method + ' ' + req.baseUrl + req.url
    console.log("user: ", jwtPayload.sub, " - url: - ", url )
    if (jwtPayload.type === 0) {
      done(null, { id: 'user123' });  // error first pattern
    } else {
      done(null, false);
    }
  }));


  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (username === 'user123' && password === 'password123') {
      const token = jwt.sign({ sub: 'john@mail.com', type: 0 },  jwtSecret,
      {
        expiresIn: '10m'
      });
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });



app.use('/usuarios', passport.authenticate('jwt', { session: false }), usuarioRouter);


app.use('/games', gameRouter);


export default app;