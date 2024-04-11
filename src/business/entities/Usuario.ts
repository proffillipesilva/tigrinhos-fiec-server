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

import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Usuario {
    @PrimaryColumn()
    id: string

    @Column({unique: true})
    cpf: string

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column({nullable: true})
    idade: number

    @Column()
    createdAt: Date

    @Column()
    updateAt: Date
}