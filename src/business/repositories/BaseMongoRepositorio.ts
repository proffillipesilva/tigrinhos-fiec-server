import { BaseEntity, Repository } from "typeorm";
import { AppDataSource } from "../../config/data-source";
import { Repositorio } from "./Repositorio";
import { BaseTypeorm } from "../entities/BaseTypeOrm";
import { v4 } from "uuid";
import { BaseMongo } from "../entities/BaseMongo";
import { Model, ObjectId } from "mongoose";


export class BaseMongoRepositorio<T extends BaseMongo> implements Repositorio<T, ObjectId> {

    repo: Model<T>

    constructor(repo: Model<T>) {
        this.repo = repo;
    }

    async find(): Promise<T[]> {
        return this.repo.find();
    }
    async findById(id: any): Promise<T | undefined> {
        const obj = await this.repo.findById({ _id: id });
        console.log(obj)
        if (obj) return Promise.resolve(obj);
        return Promise.resolve(undefined)
    }
    async removeById(id: any): Promise<void> {
        await this.repo.deleteOne({ id });
        return Promise.resolve();
    }
    async save(t: T): Promise<T> {
        const currentTime = new Date();
        t.updatedAt = currentTime;
        let obj;
        try {
            if (!t._id) {
                t.createdAt = currentTime;
                obj = await this.repo.create(t);
            } else {
                const updateObj: any = {};
                Object.keys(t.schema.obj).map((e: any) => updateObj[e] = t.get(e));
                console.log(updateObj);
                await this.repo.updateOne({ _id: t._id, updateObj })
                obj = t;
            }
            if (obj)
                return Promise.resolve(obj);
        } catch (err) {
            console.log(err);
        }
        return Promise.reject();

    }

}