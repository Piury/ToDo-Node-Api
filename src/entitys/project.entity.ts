import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./task.entity";
import { ModelBaseEntity } from "../ModelBase/ModelBaseEntity";

@Entity({ name: 'Project', schema: 'public' })
export class Project extends ModelBaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @OneToMany(type => Task, task => task.project)
    task: Task[];
}