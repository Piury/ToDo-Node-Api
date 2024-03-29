import "reflect-metadata";
import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
import dotenv from 'dotenv';
import { User } from "../entitys/user.entity";
import { Project } from "../entitys/project.entity";
import { Task } from "../entitys/task.entity";


dotenv.config();

let connectionOptions: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    logger: "file",
    // entities: ["src/entitys/*.entity{.ts,.js}"], // where our entities reside
    // entities: ["../entitys/*.entity{.ts,.js}"], // where our entities reside
    entities: [User, Project, Task], // where our entities reside
    migrations: ["src/db/migrations/*{.ts,.js}"], // where our migrations reside
};

export default new DataSource({
    ...connectionOptions,
});