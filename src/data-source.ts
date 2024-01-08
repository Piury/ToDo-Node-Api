import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entitys/user.entity";
import { Task } from "./entitys/task.entity";
// import { TodoList } from "./entitys/todoList.entity";
import { Project } from "./entitys/project.entity";


export const AppDataSource = new DataSource({
    type: "mysql",//"postgres", "mssql","oracledb","pg"
    host: "localhost",
    port: 3306,
    username: "todoappuser",
    password: "6501937F16",
    database: "ToDoApp",
    synchronize: true,
    logging: true,
    logger: "file",
    entities: [User, Task, Project /*, TodoList*/],    // entities: ["./entitys/*.js"],
    migrationsRun: false,
});
