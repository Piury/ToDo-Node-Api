import { Task } from "../../entitys/task.entity";
import * as appDataSource from "../../db/data-source";
import { TaskRepository } from "./task.repository";

export class TaskUnitOfWork {
    projectRepository: TaskRepository;
    AppDataSource = appDataSource.default;
    public static async create(): Promise<TaskUnitOfWork> {
        const instance = new TaskUnitOfWork();
        await instance.initializeConnection();
        return instance;
    }

    async save(project: Task): Promise<Task> {
        return await this.projectRepository.SaveTask(project).then((_project) => {
            if (!_project)
                return new Task();
            return _project;
        });
    }

    async find(id: string): Promise<Task> {
        return await this.projectRepository.GetTask(id).then((project) => {
            if (!project)
                return new Task();
            return project;
        });
    }

    async findAll(): Promise<Task[]> {
        return await this.projectRepository.GetTasks().then((project) => {
            if (!project)
                return [];
            return project;
        });
    }

    async delete(id: string): Promise<void> {
        await this.projectRepository.DeleteTask(id);
    }

    private async initializeConnection(): Promise<void> {
        try {

            if (!this.AppDataSource.isInitialized) {
                const connection = await this.AppDataSource.initialize();
                const entityManager = connection.manager;
                this.projectRepository = await new TaskRepository(Task, entityManager);
            }
        } catch (error) {
            console.error("Error during connection initialization:", error);
        }
    }
    dispose(): void {
        this.AppDataSource.destroy();
    }
}