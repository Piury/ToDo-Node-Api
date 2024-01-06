import { Repository, FindOneOptions, DeleteResult } from "typeorm";
import { Project } from "../../entitys/project.entity";
import { IProjectRepository } from "./project.interface";



export class ProjectRepository extends Repository<Project> implements IProjectRepository {
    public async GetProject(id: number): Promise<Project | null> {
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
    public async DeleteProject(id: number): Promise<DeleteResult> {
        return this.delete(id);
    }
}

