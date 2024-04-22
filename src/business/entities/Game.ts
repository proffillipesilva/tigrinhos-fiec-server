import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { BaseTypeorm } from "./BaseTypeOrm"
import { BaseMongo } from "./BaseMongo"
import mongoose from "mongoose"
import { Account } from "./Account"


@Entity()
export class Game extends BaseTypeorm {

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    type: string

    @ManyToMany(
        () => Account, 
        account => account.games, //optional
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
        @JoinTable({
          name: 'pagamentos',
          joinColumn: {
            name: 'game_id',
            referencedColumnName: 'id',
          },
          inverseJoinColumn: {
            name: 'account_id',
            referencedColumnName: 'id',
          },
        })
        accounts?: Account[];
}
/*
export class Game extends BaseMongo {
    title: string
    description: string
    type: string
}


export const GameSchema = new mongoose.Schema<Game>({
    title: String,
    description: String,
    type: String,
    createdAt: Date,
    updatedAt: Date
})
*/
