import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./Entitys/user.entity"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "todoappuser",
    password: "6501937F16",
    database: "ToDoApp",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
