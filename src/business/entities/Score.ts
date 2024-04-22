import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm"
import { BaseTypeorm } from "./BaseTypeOrm"
import { Account } from "./Account"
import { Game } from "./Game"

@Entity({name: 'score'})
export class Score extends BaseTypeorm {

    @Column()
    status: string

    @Column()
    obs: string   

    @ManyToOne(() => Account, (account) => account)
    account: Account[]

    
}