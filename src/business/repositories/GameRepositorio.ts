import mongoose from "mongoose";
import { AppDataSource } from "../../config/data-source";
import { Game, GameSchema } from "../entities/Game";
import { BaseMongooseRepositorio } from "./BaseMongooseRepositorio";
import { BaseTypeOrmRepositorio } from "./BaseTypeOrmRepositorio";


/*
export class GameRepositorio extends BaseTypeOrmRepositorio<Game> {
   constructor(){
        super(AppDataSource.getRepository(Game))
   }
    
}
*/

export class GameRepositorio extends BaseMongooseRepositorio<Game> {
   constructor(){
      super(mongoose.model('Game', GameSchema));
   }
}