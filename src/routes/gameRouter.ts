import { Router } from "express";
import { UsuarioServiceImpl } from "../services/impl/UsuarioServiceImpl";
import { UsuarioController } from "../controllers/UsuarioController";
import { UsuarioRepositorio } from "../business/repositories/UsuarioRepositorio";
import { GameServiceImpl } from "../services/impl/GameServiceImpl";
import { GameController } from "../controllers/GameController";
import { GameRepositorio } from "../business/repositories/GameRepositorio";



const gameRouter = Router();

const gameRepositorio = new GameRepositorio();
const gameService = new GameServiceImpl(gameRepositorio);
const gameController = new GameController(gameService);
gameRouter.get('/', gameController.readAll);
gameRouter.get('/:id', gameController.readById);
gameRouter.post('/', gameController.createGame);
gameRouter.delete('/:id', gameController.deleteById);
gameRouter.put('/:id', gameController.updateGame);


export default gameRouter;