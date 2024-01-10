import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ModelBaseEntity {
    @Column({ type: "timestamp", default: "now()", nullable: false }) // Definir tipo y valor predeterminado para createdAt
    createdAt: Date;

    @Column({ type: "timestamp", default: "now()", onUpdate: "CURRENT_TIMESTAMP", nullable: false }) // Definir tipo, valor predeterminado y actualización automática para updatedAt
    updatedAt: Date;

    @Column()
    updatedBy: string;
}