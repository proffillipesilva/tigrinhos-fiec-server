import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { BaseTypeorm } from "./BaseTypeOrm"
import { BaseMongoose } from "./BaseMongoose"
import { Schema } from "mongoose"
/*
@Entity()
export class Game extends BaseTypeorm {

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    type: string
}
*/

export class Game extends BaseMongoose {
    
    title: string
    
    description: string

    type: string
    
}

export const GameSchema = new Schema<Game>({
    title: String,
    description: String,
    type: String,
    createdAt: Date,
    updateAt: Date
})