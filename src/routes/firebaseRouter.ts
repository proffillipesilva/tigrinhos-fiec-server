import { Router } from "express";
import { FirebaseController } from "../controllers/FirebaseController";

const firebaseRouter = Router();

const firebaseController = new FirebaseController();
firebaseRouter.get('/', firebaseController.firebaseCheck, firebaseController.getDB);
firebaseRouter.post('/', firebaseController.firebaseCheck, firebaseController.postDB);
firebaseRouter.post('/users', firebaseController.createUser);
firebaseRouter.post('/login', firebaseController.login);

export default firebaseRouter;
