import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TodoList } from "./todoList.entity";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @OneToMany(type => TodoList, todoList => todoList.project)
    todoLists: TodoList[];
}