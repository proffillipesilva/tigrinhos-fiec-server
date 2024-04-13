import { v4 } from "uuid";
import { MyDB } from "../../db/MyDB";
import { Usuario } from "../entities/Usuario";
import { Repositorio } from "./Repositorio";
import { BaseRepositorio } from "./BaseRepositorio";
import { AppDataSource } from "../../config/data-source";
import { BaseTypeOrmRepositorio } from "./BaseTypeOrmRepositorio";

/*
export class UsuarioRepositorio extends BaseRepositorio<Usuario> {
    
    constructor(){
        super(MyDB.usuarios)
    }

}*/

export class UsuarioRepositorio extends BaseTypeOrmRepositorio<Usuario> {
    constructor(){
         super(AppDataSource.getRepository(Usuario))
    }
     
 }
