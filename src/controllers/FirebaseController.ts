import { NextFunction, Request, Response } from "express";
import {firebaseAdmin} from "../config/firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import admin from "firebase-admin"
import { Database } from "firebase-admin/lib/database/database";
import { CreateRequest } from "firebase-admin/lib/auth/auth-config";

export class FirebaseController {
    private service : admin.app.App;
    private dbService: Database;
    constructor(){
        this.service = firebaseAdmin;
        this.dbService = admin.database();
    }

    getDB = async(req: Request, res: Response) => {
        
        const ref =  this.dbService.ref("/");
        console.log(ref)
        const users = await ref.child('users').once('value');
        
        res.json(users.toJSON())
        //const authService = this.service.auth();

    }

    postDB = async(req: Request, res: Response) => {
        
        const ref =  this.dbService.ref("/");
        console.log(ref)
        await ref.child('users').push(req.body);
        
        res.json("ok")
        //const authService = this.service.auth();

    }

    createUser = async(req: Request, res: Response) => {
        const auth = this.service.auth();
        const createRequest : CreateRequest = {
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.name
        };
        
        const userRecord = await auth.createUser(createRequest)
        res.json(userRecord.toJSON())
    }

    login = async(req: Request, res: Response) => {
        const { email, password} = req.body;
        const auth = getAuth();       
        
        const result = await signInWithEmailAndPassword(auth, email, password);
        res.json(result);
    }

    firebaseCheck = async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1] || "" ;
        try {
          const decoded = await firebaseAdmin.auth().verifyIdToken(token, true);
          console.log(decoded);
          req.user = { email: decoded.email}
          next();
        } catch (error) {
          res.status(401).end("Not Authorized");
        }
        
      }

}