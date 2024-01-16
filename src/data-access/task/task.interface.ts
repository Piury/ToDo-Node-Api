import { Repository, DeleteResult } from "typeorm";
import { Task } from "../../entitys/task.entity";

export interface ITaskRepository extends Repository<Task> {
    GetTask(id: string): Promise<Task | null>;
    GetTasks(): Promise<Task[] | null>;
    SaveTask(Task: Task): Promise<Task | null>;
    DeleteTask(id: string): Promise<DeleteResult>;
}