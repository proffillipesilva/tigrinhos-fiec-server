import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    type: string
}