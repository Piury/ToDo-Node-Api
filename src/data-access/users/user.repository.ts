import { Repository, FindOneOptions, DeleteResult } from "typeorm";
import { User } from "../../entitys/user.entity";
import { IUserRepository } from "./user.interface";



export class UserRepository extends Repository<User> implements IUserRepository {
    public async GetUser(id: number): Promise<User | null> {
        const findOneOptions: FindOneOptions<User> = {
            where: { id: id },
        };
        const _user = this.findOne(findOneOptions);
        if (!_user) {
            return Promise.resolve(null);// Devuelve null si la entidad no se encuentra
            // throw new Error('User not found');
        }
        return _user;
    }
    public async GetUserbyemail(email: string): Promise<User | null> {
        const findOneOptions: FindOneOptions<User> = {
            where: { email: email },
        };
        const _user = this.findOne(findOneOptions);
        if (!_user) {
            return Promise.resolve(null);// Devuelve null si la entidad no se encuentra
            // throw new Error('User not found');
        }
        return _user;
    }
    public async GetUserbyname(name: string): Promise<User | null> {
        const findOneOptions: FindOneOptions<User> = {
            where: { name: name },
        };
        const _user = this.findOne(findOneOptions);
        if (!_user) {
            return Promise.resolve(null);// Devuelve null si la entidad no se encuentra
            // throw new Error('User not found');
        }
        return _user;
    }
    public async GetUsers(): Promise<User[] | null> {
        const _user = this.find();
        console.log(_user);
        if (!_user) {
            return Promise.resolve(null);// Devuelve null si la entidad no se encuentra
        }
        return _user;
    }
    public async SaveUser(user: User): Promise<User | null> {
        this.save(user);
        // Verifica si guardo
        const findOneOptions: FindOneOptions<User> = {
            where: { id: user.id },
        };
        const _user = this.findOne(findOneOptions);
        if (!_user) {
            return Promise.resolve(null);// Devuelve null si la entidad no se encuentra
        }
        return _user;
    }
    public async DeleteUser(id: number): Promise<DeleteResult> {
        return this.delete(id);
    }
}

