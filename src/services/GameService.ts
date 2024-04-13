import { Game } from "../business/entities/Game";

export interface GameService {
    insert(game: any) : Promise<Game>;
    update(game: any, id: string) : Promise<void>;
    readAll() : Promise<Game[]>;
    readById(id: string) : Promise<Game | undefined>;
    deleteById(id: string) : Promise<void>;
}