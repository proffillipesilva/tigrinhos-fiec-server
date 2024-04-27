import { Router } from "express";
import { UsuarioServiceImpl } from "../services/impl/UsuarioServiceImpl";
import { UsuarioController } from "../controllers/UsuarioController";
import { UsuarioRepositorio } from "../business/repositories/UsuarioRepositorio";
import upload from "../config/storage";



const usuarioRouter = Router();

const userRepo = new UsuarioRepositorio();
const userService = new UsuarioServiceImpl(userRepo);
const usuarioController = new UsuarioController(userService);
usuarioRouter.get('/', usuarioController.listaUsuarios);
usuarioRouter.get('/:id', usuarioController.pegaUsuario);
usuarioRouter.post('/', usuarioController.criaUsuario);
usuarioRouter.put('/:id/photo', upload.single('foto'), usuarioController.updateUsuario);
usuarioRouter.delete('/:id', usuarioController.deletaUsuario);


export default usuarioRouter;