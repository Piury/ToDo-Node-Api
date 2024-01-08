import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
// import { TodoList } from "./todoList.entity";

@Entity({ name: 'tasks', schema: 'public' })
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @Column()
  priority: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  duration: number;

  @Column()
  completed: boolean;

  @Column()
  completedOn: Date;

  @ManyToOne(type => Project, project => project.task)
  project: Project;
  // @ManyToOne(type => TodoList, todoList => todoList.tasks)
  // todoList: TodoList;
}