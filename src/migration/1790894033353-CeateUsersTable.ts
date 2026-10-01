import type { MigrationInterface, QueryRunner } from "typeorm";
import { Table, TableForeignKey} from "typeorm";

export class CeateUsersTable1790894033353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
                    name: "users",
                    columns: [
                       {
                            name: "id",
                            type: "int",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "increment"
                        },
                        {
                            name: "name",
                            type: "varchar",
                        },
                        {
                            name: "email",
                            type: "varchar",
                            isUnique: true
                        },
                        {
                            name: "situation_id",
                            type: "int",
                        },
                        {
                            name: "createdAt",
                            type: "timestamp",
                            default:  "CURRENT_TIMESTAMP"
                        },
                        {
                            name: "updatedAt",
                            type: "timestamp",
                            default:  "CURRENT_TIMESTAMP",
                            onUpdate: "CURRENT_TIMESTAMP"
                        }
                    ]
                }));
                
                //Criar chave estrangeira

                await queryRunner.createForeignKey("users", new TableForeignKey({
                    columnNames: ["situation_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "situations",
                    onDelete: "CASCADE"
                }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users");
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.includes("situation_id"));
        if (foreignKey) {
            await queryRunner.dropForeignKey("users", foreignKey);
        }
        await queryRunner.dropTable("users");
    }

}
