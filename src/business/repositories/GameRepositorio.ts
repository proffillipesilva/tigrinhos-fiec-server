import { AppDataSource } from "../../config/data-source";
import { Game } from "../entities/Game";
import { Repositorio } from "./Repositorio";

//const GameRepositorio = AppDataSource.getRepository(Game);
//export default GameRepositorio;
export class GameRepositorio implements Repositorio<Game, number> {
    find(): Promise<Game[]> {
        return AppDataSource.getRepository(Game).find();
    }
    async findById(id: number): Promise<Game | undefined> {
        const game = await AppDataSource.getRepository(Game).findOneBy({id});
        if(game) return Promise.resolve(game);
        return Promise.resolve(undefined)
    }
    async removeById(id: number): Promise<void> {
        await AppDataSource.getRepository(Game).delete({id});
        return Promise.resolve();
    }
    async save(t: Game): Promise<Game> {
        const game = await AppDataSource.getRepository(Game).save(t);
        return Promise.resolve(game);

    }
    
}