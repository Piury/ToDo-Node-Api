import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { ModelBaseEntity } from "../ModelBase/ModelBaseEntity";

@Entity({ name: "Task", schema: 'public' })
export class Task extends ModelBaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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