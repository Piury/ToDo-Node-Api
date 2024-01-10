

import "reflect-metadata";
import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";

let connectionOptions: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "todoappuser",
    password: "6501937F16",
    database: "ToDoApp",
    synchronize: false,
    logging: true,
    logger: "file",
    entities: ["src/**/*.entity{.ts,.js}"], // where our entities reside
    migrations: ["src/db/migrations/*{.ts,.js}"], // where our migrations reside
};

export default new DataSource({
    ...connectionOptions,
});



// export const AppDataSource = new DataSource({
//     type: "mysql",//"postgres", "mssql","oracledb","pg"
//     host: "localhost",
//     port: 3306,
//     username: "todoappuser",
//     password: "6501937F16",
//     database: "ToDoApp",
//     synchronize: true,

//     entities: [User, Task, Project /*, TodoList*/],    // entities: ["./entitys/*.js"],
//     migrationsRun: false,

// });
