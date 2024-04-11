import { DataSource } from "typeorm";
import { Game } from "../business/entities/Game";
import { Usuario } from "../business/entities/Usuario";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "tigrinhos",
    synchronize: true,
    logging: true,
    entities: [Game, Usuario],
    subscribers: [],
    migrations: [],
})