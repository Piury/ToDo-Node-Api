import { Project } from "../../entitys/project.entity";
import { AppDataSource } from "../../data-source";
import { ProjectRepository } from "./project.repository";

export class ProjectUnitOfWork {
    projectRepository: ProjectRepository;

    public static async create(): Promise<ProjectUnitOfWork> {
        const instance = new ProjectUnitOfWork();
        await instance.initializeConnection();
        return instance;
    }

    async save(project: Project): Promise<Project> {
        return await this.projectRepository.SaveProject(project).then((_project) => {
            if (!_project)
                return new Project();
            return _project;
        });
    }

    async find(id: number): Promise<Project> {
        return await this.projectRepository.GetProject(id).then((project) => {
            if (!project)
                return new Project();
            return project;
        });
    }

    async findAll(): Promise<Project[]> {
        return await this.projectRepository.GetProjects().then((project) => {
            if (!project)
                return [];
            return project;
        });
    }

    async delete(id: number): Promise<void> {
        await this.projectRepository.DeleteProject(id);
    }

    private async initializeConnection(): Promise<void> {
        try {
            const connection = await AppDataSource.initialize();
            const entityManager = connection.manager;
            this.projectRepository = await new ProjectRepository(Project, entityManager);
        } catch (error) {
            console.error("Error during connection initialization:", error);
        }
    }
    dispose(): void {
        AppDataSource.destroy();
    }
}