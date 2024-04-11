import { Game } from "../business/entities/Game";

export interface GameService {
    insert(game: any) : Promise<Game>;
    update(game: any, id: number) : Promise<void>;
    readAll() : Promise<Game[]>;
    readById(id: number) : Promise<Game | undefined>;
    deleteById(id: number) : Promise<void>;
}