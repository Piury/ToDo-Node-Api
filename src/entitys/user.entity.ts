import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TodoList } from "./todoList.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => TodoList, todoList => todoList.user)
    todoLists: TodoList[];
}