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

@Entity()
export class Usuario extends BaseTypeorm {


    @Column({unique: true})
    email: string

    @Column()
    password: string

    

    
}