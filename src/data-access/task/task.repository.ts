import { Repository, FindOneOptions, DeleteResult } from "typeorm";
import { Task } from "../../entitys/task.entity";
import { ITaskRepository } from "./task.interface";

export class TaskRepository extends Repository<Task> implements ITaskRepository {
    public async GetTask(id: string): Promise<Task | null> {
        const findOneOptions: FindOneOptions<Task> = {
            where: { id: id },
        };
        const _Task = this.findOne(findOneOptions);
        if (!_Task) {
            return Promise.resolve(null);// Devuelve null si la entidad no se encuentra
            // throw new Error('Task not found');
        }
        return _Task;
    }
    public async GetTasks(): Promise<Task[] | null> {
        const _Task = this.find();
        console.log(_Task);
        if (!_Task) {
            return Promise.resolve(null);// Devuelve null si la entidad no se encuentra
        }
        return _Task;
    }
    public async SaveTask(Task: Task): Promise<Task | null> {

        // Check that the startDate field is not null
        if (!Task.startTime) {
            throw new Error("The startDate field is required");
        }


        // Check that the startDate endDate is not null
        if (!Task.endTime) {
            throw new Error("The endDate field is required");
        }

        this.save(Task);
        // Verifica si guardo
        const findOneOptions: FindOneOptions<Task> = {
            where: { id: Task.id },
        };
        const _Task = this.findOne(findOneOptions);
        if (!_Task) {
            return Promise.resolve(null);// Devuelve null si la entidad no se encuentra
        }
        return _Task;
    }
    public async DeleteTask(id: string): Promise<DeleteResult> {
        return this.delete(id);
    }
}

