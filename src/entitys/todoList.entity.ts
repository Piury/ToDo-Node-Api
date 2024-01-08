// import { Entity, Generated, Column, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
// import { Project } from "./project.entity";
// import { User } from "./user.entity";
// import { Task } from "./task.entity";

// @Entity()
// export class TodoList {
//   @PrimaryColumn()
//   @Generated("uuid")
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   description: string;

//   @ManyToOne(type => Project, project => project.todoLists)
//   project: Project;

//   @ManyToOne(type => User, user => user.todoLists)
//   user: User;

//   @OneToMany(type => Task, task => task.todoList)
//   tasks: Task[];
// }