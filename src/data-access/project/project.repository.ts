import { Repository, FindOneOptions, DeleteResult } from "typeorm";
import { Project } from "../../entitys/project.entity";
import { IProjectRepository } from "./project.interface";

export class ProjectRepository extends Repository<Project> implements IProjectRepository {
    public async GetProject(id: string): Promise<Project | null> {
        const findOneOptions: FindOneOptions<Project> = {
            where: { id: id },
        };
        const _Project = this.findOne(findOneOptions);
        if (!_Project) {
            return Promise.resolve(null);// Devuelve null si la entidad no se encuentra
            // throw new Error('Project not found');
        }
        return _Project;
    }
    public async GetProjects(): Promise<Project[] | null> {
        const _Project = this.find();
        console.log(_Project);
        if (!_Project) {
            return Promise.resolve(null);// Devuelve null si la entidad no se encuentra
        }
        return _Project;
    }
    public async SaveProject(Project: Project): Promise<Project | null> {

        // Check that the startDate field is not null
        if (!Project.startDate) {
            throw new Error("The startDate field is required");
        }


        // Check that the startDate endDate is not null
        if (!Project.endDate) {
            throw new Error("The endDate field is required");
        }

        this.save(Project);
        // Verifica si guardo
        const findOneOptions: FindOneOptions<Project> = {
            where: { id: Project.id },
        };
        const _Project = this.findOne(findOneOptions);
        if (!_Project) {
            return Promise.resolve(null);// Devuelve null si la entidad no se encuentra
        }
        return _Project;
    }
    public async DeleteProject(id: string): Promise<DeleteResult> {
        return this.delete(id);
    }
}

