import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

const nameTable = "Task";

export class CreateTaskTable1654554754825 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: nameTable,
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
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "dueDate",
                        type: "timestamp",
                    },
                    {
                        name: "priority",
                        type: "int",
                    },
                    {
                        name: "startTime",
                        type: "timestamp",
                    },
                    {
                        name: "endTime",
                        type: "timestamp",
                    },
                    {
                        name: "duration",
                        type: "int",
                    },
                    {
                        name: "completed",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "completedOn",
                        type: "timestamp",
                    },
                    {
                        name: "projectId",
                        type: "varchar(36)",
                        isNullable: true, // Allow null for tasks without a project
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
            nameTable,
            new TableIndex({
                name: "IDX_TASK_PROJECT_ID",
                columnNames: ["projectId"],
            }),
        );

        await queryRunner.createForeignKey(
            nameTable,
            new TableForeignKey({
                name: "FK_TASK_PROJECT_ID",
                columnNames: ["projectId"],
                referencedTableName: "Project",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE", // Ensure consistency when a project is deleted
            }),
        );

        // Insertar datos iniciales
        //     const now = Date.now();
        //     const date = new Date(now).toISOString();
        //     const insertQuery = `
        //     INSERT INTO ${nameTable} (
        //         id,
        //         name,
        //         description,
        //         dueDate,
        //         priority,
        //         startTime,
        //         endTime,
        //         duration,
        //         completed,
        //         completedOn,
        //         projectId
        //     ) VALUES (
        //         UUID(),
        //         'Tarea 1',
        //         'Descripción de la tarea 1',
        //         CONVERT_TZ('${date}', 'UTC', @@session.time_zone),
        //         1,
        //         CONVERT_TZ('${date}', 'UTC', @@session.time_zone),
        //         CONVERT_TZ('${date}', 'UTC', @@session.time_zone),
        //         1,
        //         false,
        //         null,
        //         null
        //     )
        // `.replace('\n', '');
        //     await queryRunner.query(insertQuery);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(nameTable, "FK_TASK_PROJECT_ID");
        await queryRunner.dropIndex(nameTable, "IDX_TASK_PROJECT_ID");
        await queryRunner.dropTable(nameTable);
    }
}
