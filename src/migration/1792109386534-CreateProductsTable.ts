import type { MigrationInterface, QueryRunner } from "typeorm";
import { Table, TableForeignKey } from "typeorm";

export class CreateProductsTable1792109386534 implements MigrationInterface {
public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "productSituationId",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "productCategoryId",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            })
        );

        // Criando Chave Estrangeira para product_situations
        await queryRunner.createForeignKey(
            "products",
            new TableForeignKey({
                columnNames: ["productSituationId"],
                referencedColumnNames: ["id"],
                referencedTableName: "product_situations",
                onDelete: "CASCADE",
            })
        );

        // Criando Chave Estrangeira para product_categories
        await queryRunner.createForeignKey(
            "products",
            new TableForeignKey({
                columnNames: ["productCategoryId"],
                referencedColumnNames: ["id"],
                referencedTableName: "product_categories",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("products");
        const foreignKeyCategory = table?.foreignKeys.find(fk => fk.columnNames.indexOf("productCategoryId") !== -1);
        const foreignKeySituation = table?.foreignKeys.find(fk => fk.columnNames.indexOf("productSituationId") !== -1);

        if (foreignKeyCategory) await queryRunner.dropForeignKey("products", foreignKeyCategory);
        if (foreignKeySituation) await queryRunner.dropForeignKey("products", foreignKeySituation);

        await queryRunner.dropTable("products");
    }
}