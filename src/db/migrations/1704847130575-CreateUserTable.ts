import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
} from "typeorm";

export class CreateUserTable1654554754825 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "varchar(36)",
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_by",
                        type: "varchar(36)",
                    },
                ],
            }),
            true, // If schema: 'public' is needed, add it as a third argument here
        );

        await queryRunner.createIndex(
            "user",
            new TableIndex({
                name: "IDX_USER_EMAIL",
                columnNames: ["email"],
            }),
        );
        // Insertar datos iniciales
        await queryRunner.query(
            "INSERT INTO user (id, name, email, password, updated_by) VALUES (UUID(), 'Admin', 'admin@todoapp.com', 'root', 'root')",
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("user", "IDX_USER_EMAIL");
        await queryRunner.dropTable("user");
    }
}
