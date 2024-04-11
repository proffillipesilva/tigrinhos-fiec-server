import { Request, Response } from "express";
import { GameService } from "../services/GameService";

export class GameController {
    gameService : GameService;

    constructor(gameService: GameService){
        this.gameService = gameService;
    }

    createGame = async (req: Request, res: Response) => {
        try{
            const savedGame = await this.gameService.insert(req.body);
            return res.status(201).json(savedGame);
        } catch(err){
            return res.status(500).end("Deu ruim");
        }

    }

    updateGame = async (req: Request, res: Response) => {
        try{
            const id = parseInt(req.params.id);
            await this.gameService.update(req.body, id);
            return res.status(200).send("ok");
        } catch(err){
            return res.status(500).end("Deu ruim");
        }

    }

    readById = async (req: Request, res: Response) => {
        try{
            const id = parseInt(req.params.id);
            const game = await this.gameService.readById(id);
            if (game) return res.status(200).send("ok");
            return res.status(404).end("Not found")
        } catch(err){
            return res.status(500).end("Deu ruim");
        }
    }

    deleteById = async (req: Request, res: Response) => {
        try{
            const id = parseInt(req.params.id);
            await this.gameService.deleteById(id);
            return res.status(200).end("ok")
        } catch(err){
            return res.status(500).end("Deu ruim");
        }
    }

    readAll = async (req: Request, res: Response) => {
        try{
            
            const games = await this.gameService.readAll();
            return res.status(200).json(games)
        } catch(err){
            return res.status(500).end("Deu ruim");
        }
    }
}