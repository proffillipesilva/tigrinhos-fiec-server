import { Base } from "./Base"

/*
export class Usuario extends Base {
    cpf: string
    name: string
    email: string
    idade: number
    createdAt: Date
    updateAt: Date
}*/

import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToMany, OneToMany } from "typeorm"
import { BaseTypeorm } from "./BaseTypeOrm"
import { Usuario } from "./Usuario"
import { Game } from "./Game"
import { Score } from "./Score"

@Entity()
export class Account extends BaseTypeorm {

    @Column({unique: true})
    cpf: string

    @Column()
    name: string

    @Column({nullable: true})
    idade: number

    @OneToOne(() => Usuario)
    @JoinColumn()
    user: Usuario

    @ManyToMany(
        () => Game,
        game => game.accounts,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
      )
      games?: Game[];

      @OneToMany(() => Score, (score) => score)
      score: Score[]
    
}