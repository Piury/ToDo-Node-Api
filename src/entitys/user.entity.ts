import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ModelBaseEntity } from "../ModelBase/ModelBaseEntity";

@Entity({ name: "User", schema: 'public' })
export class User extends ModelBaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}