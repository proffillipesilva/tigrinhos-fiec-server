import { BaseEntity, Repository } from "typeorm";
import { AppDataSource } from "../../config/data-source";
import { Repositorio } from "./Repositorio";
import { BaseTypeorm } from "../entities/BaseTypeOrm";
import { v4 } from "uuid";


export class BaseTypeOrmRepositorio<T extends BaseTypeorm> implements Repositorio<T, string> {

    repo: Repository<T>;

    constructor(repo: Repository<T>){
        this.repo = repo;
    }

    async find(): Promise<T[]> {
        return this.repo.find();
    }
    async findOneQuery(obj: any): Promise<T|null> {
        return this.repo.findOneBy(obj);
    }
    async findQuery(obj: any): Promise<T[]> {
        return this.repo.find(obj);
    }
    async findById(id: any): Promise<T | undefined> {
        const obj = await this.repo.findOneBy({id});
        console.log(obj)
        if(obj) return Promise.resolve(obj);
        return Promise.resolve(undefined)
    }
    async removeById(id: any): Promise<void> {
        await this.repo.delete({id});
        return Promise.resolve();
    }
    async save(t: T): Promise<T> {
        const currentTime = new Date();
        if(!t.id){
            t.id = v4();
            t.createdAt = currentTime;
        }
        t.updateAt = currentTime;
        const obj = await this.repo.save(t);
        return Promise.resolve(obj);

    }
    
}