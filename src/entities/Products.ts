import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { ProductCategories } from "./ProductCategories.js";
import { ProductSituations } from "./ProductSituations.js";

@Entity("products")
export class Products {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    // ADICIONE { type: "int" } AQUI:
    @Column({ type: "int" })
    productSituationId!: number;

    // ADICIONE { type: "int" } AQUI:
    @Column({ type: "int" })
    productCategoryId!: number;

    @ManyToOne(() => ProductSituations, (situation) => situation.products, { onDelete: "CASCADE" })
    @JoinColumn({ name: "productSituationId" })
    situation!: ProductSituations;

    @ManyToOne(() => ProductCategories, (category) => category.products, { onDelete: "CASCADE" })
    @JoinColumn({ name: "productCategoryId" })
    category!: ProductCategories;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}