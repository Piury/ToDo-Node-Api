import { Repository, DeleteResult } from "typeorm";
import { User } from "../entitys/user.entity";

export interface IUserRepository extends Repository<User> {
    GetUser(id: number): Promise<User | null>;
    GetUserbyemail(email: string): Promise<User | null>;
    GetUserbyname(name: string): Promise<User | null>;
    GetUsers(): Promise<User[] | null>;
    SaveUser(user: User): Promise<User | null>;
    DeleteUser(id: number): Promise<DeleteResult>;
}