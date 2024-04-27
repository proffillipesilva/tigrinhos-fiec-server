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
import { BaseTypeorm } from "./BaseTypeOrm"
import { UserType } from "./enum/UserType"

@Entity()
export class Usuario extends BaseTypeorm {

    @Column({unique: true})
    cpf: string

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column({nullable: true})
    idade: number

    @Column({nullable: false})
    type: UserType

    @Column({nullable: true})
    photo: string
    
}