import { BaseEntity, Column, PrimaryColumn } from "typeorm";

export abstract class BaseTypeorm extends BaseEntity {
    @PrimaryColumn()
    id: string

    @Column()
    createdAt: Date

    @Column()
    updateAt: Date
}