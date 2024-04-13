import { AppDataSource } from "../../config/data-source";
import { Game } from "../entities/Game";
import { BaseTypeOrmRepositorio } from "./BaseTypeOrmRepositorio";

export class GameRepositorio extends BaseTypeOrmRepositorio<Game> {
   constructor(){
        super(AppDataSource.getRepository(Game))
   }
    
}