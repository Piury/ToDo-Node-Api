import { Repository, DeleteResult } from "typeorm";
import { Project } from "../../entitys/project.entity";

export interface IProjectRepository extends Repository<Project> {
    GetProject(id: string): Promise<Project | null>;
    GetProjects(): Promise<Project[] | null>;
    SaveProject(Project: Project): Promise<Project | null>;
    DeleteProject(id: string): Promise<DeleteResult>;
}