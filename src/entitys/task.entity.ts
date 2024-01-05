import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TodoList } from "./todoList.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
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

  @ManyToOne(type => TodoList, todoList => todoList.tasks)
  todoList: TodoList;
}