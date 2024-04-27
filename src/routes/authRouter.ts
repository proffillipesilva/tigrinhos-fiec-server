import { Router } from "express";
import { AuthServiceImpl } from "../services/impl/AuthServiceImpl";
import { AuthController } from "../controllers/AuthController";
import { UsuarioRepositorio } from "../business/repositories/UsuarioRepositorio";

const authRouter = Router();

const usuarioRepositorio = new UsuarioRepositorio();
const authService = new AuthServiceImpl(usuarioRepositorio);
const authController = new AuthController(authService);

authRouter.post('/login', authController.login);


export default authRouter;