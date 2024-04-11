import { v4 } from "uuid";
import { MyDB } from "../../db/MyDB";
import { Usuario } from "../entities/Usuario";
import { Repositorio } from "./Repositorio";
import { BaseRepositorio } from "./BaseRepositorio";
import { AppDataSource } from "../../config/data-source";

/*
export class UsuarioRepositorio extends BaseRepositorio<Usuario> {
    
    constructor(){
        super(MyDB.usuarios)
    }

}*/

export class UsuarioRepositorio implements Repositorio<Usuario, string> {
    find(): Promise<Usuario[]> {
        return AppDataSource.getRepository(Usuario).find();
    }
    async findById(id: string): Promise<Usuario | undefined> {
        const game = await AppDataSource.getRepository(Usuario).findOneBy({id});
        if(game) return Promise.resolve(game);
        return Promise.resolve(undefined)
    }
    async removeById(id: string): Promise<void> {
        await AppDataSource.getRepository(Usuario).delete({id});
        return Promise.resolve();
    }
    async save(t: Usuario): Promise<Usuario> {
        const game = await AppDataSource.getRepository(Usuario).save(t);
        return Promise.resolve(game);

    }
    
}
