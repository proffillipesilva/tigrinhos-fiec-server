import mongoose from "mongoose";
import { AppDataSource } from "../../config/data-source";
import { Game } from "../entities/Game";
//import { Game, GameSchema } from "../entities/Game";
import { BaseMongoRepositorio } from "./BaseMongoRepositorio";
import { BaseTypeOrmRepositorio } from "./BaseTypeOrmRepositorio";


export class GameRepositorio extends BaseTypeOrmRepositorio<Game> {
   constructor(){
        super(AppDataSource.getRepository(Game))
   }
    
}

/*
export class GameRepositorio extends BaseMongoRepositorio<Game> {
   constructor(){
      super(mongoose.model('Game', GameSchema))
   }
} */
