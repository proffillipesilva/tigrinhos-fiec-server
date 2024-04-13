import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { BaseTypeorm } from "./BaseTypeOrm"

@Entity()
export class Game extends BaseTypeorm {

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    type: string
}