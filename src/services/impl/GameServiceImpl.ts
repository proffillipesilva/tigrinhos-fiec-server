import { Game } from "../../business/entities/Game";
import { GameRepositorio } from "../../business/repositories/GameRepositorio";
import { GameService } from "../GameService";

export class GameServiceImpl implements GameService {

    gameRepositorio: GameRepositorio

    constructor(gameRepositorio: GameRepositorio){
        this.gameRepositorio = gameRepositorio;
    }

    async insert(game: any): Promise<Game> {
        return await this.gameRepositorio.save(game);
    }
    async update(game: any, id: number): Promise<void> {
        const gameAtual  = await this.gameRepositorio.findById(id);
        if(gameAtual != null){
            gameAtual.title = game.title;
            gameAtual.description = game.description;
            gameAtual.type = game.type;
            await this.gameRepositorio.save(gameAtual);
        }
    }
    async readAll(): Promise<Game[]> {
        return await this.gameRepositorio.find();
    }
    async readById(id: number): Promise<Game | undefined> {
        return await this.gameRepositorio.findById(id);
    }
    async deleteById(id: number): Promise<void> {
        await this.gameRepositorio.removeById(id);
    }
    
}