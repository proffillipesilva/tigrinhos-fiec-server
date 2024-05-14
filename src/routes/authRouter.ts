import { Router } from "express";
import { AuthServiceImpl } from "../services/impl/AuthServiceImpl";
import { AuthController } from "../controllers/AuthController";
import { UsuarioRepositorio } from "../business/repositories/UsuarioRepositorio";
import { UsuarioServiceImpl } from "../services/impl/UsuarioServiceImpl";

const authRouter = Router();

const usuarioRepositorio = new UsuarioRepositorio();
const userService = new UsuarioServiceImpl(usuarioRepositorio);
const authService = new AuthServiceImpl(usuarioRepositorio);
const authController = new AuthController(authService, userService);

authRouter.post('/login', authController.login);
authRouter.post('/login/google', authController.loginWithGoogle);



export default authRouter;