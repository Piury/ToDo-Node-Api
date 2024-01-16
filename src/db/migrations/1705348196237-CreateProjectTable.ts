import { MigrationInterface, QueryRunner, Table } from "typeorm";

const nameTable = "Project";

export class CreateProjectTable1654554754825 implements MigrationInterface {
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
                        name: "startDate",
                        type: "timestamp",
                    },
                    {
                        name: "endDate",
                        type: "timestamp",
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

        // Insertar datos iniciales
        // const now = Date.now();
        // const date = new Date(now).toISOString();
        // const insertQuery = `
        // INSERT INTO ${nameTable} (
        //     id, 
        //     name, 
        //     description, 
        //     startDate, 
        //     endDate) 
        // VALUES (
        //     UUID(), 
        //     ?, 
        //     ?, 
        //     CONVERT_TZ(?, 'UTC', @@session.time_zone),
        //     CONVERT_TZ(?, 'UTC', @@session.time_zone))`;

        // await queryRunner.query(insertQuery, [
        //     'Proyecto 1',
        //     'Descripción del proyecto 1',
        //     date,
        //     date
        // ]);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(nameTable);
    }
}
