import { json } from "stream/consumers";
import { User } from "../../entitys/user.entity";
import { AppDataSource } from "../../data-source";
import { UserRepository } from "./user.repository";

export class UserUnitOfWork {
    userRepository: UserRepository;

    public static async create(): Promise<UserUnitOfWork> {
        const instance = new UserUnitOfWork();
        await instance.initializeConnection();
        return instance;
    }

    async save(user: User): Promise<User> {
        return await this.userRepository.SaveUser(user).then((user) => {
            if (!user)
                return new User();
            return user;
        });
    }

    async find(id: number): Promise<User> {
        return await this.userRepository.GetUser(id).then((user) => {
            if (!user)
                return new User();
            return user;
        });
    }

    async findOne(email: string): Promise<User> {
        return await this.userRepository.GetUserbyemail(email).then((user) => {
            if (!user)
                return new User();
            return user;
        });
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.GetUsers().then((user) => {
            if (!user)
                return [new User()];
            return user;
        });
    }
    async delete(id: number): Promise<void> {
        await this.userRepository.DeleteUser(id);
    }
    private async initializeConnection(): Promise<void> {
        try {
            const connection = await AppDataSource.initialize();
            const entityManager = connection.manager;
            this.userRepository = await new UserRepository(User, entityManager);
        } catch (error) {
            console.error("Error during connection initialization:", error);
        }
    }
    dispose(): void {
        AppDataSource.destroy();
    }
}