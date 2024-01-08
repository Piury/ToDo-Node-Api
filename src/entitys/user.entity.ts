import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'user', schema: 'public' })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}