import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm"
import { Situations } from "./Situations.js";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column({ unique: true })
    email!: string

    @ManyToOne(() => Situations, (situation) => situation.users)
    @JoinColumn({ name: "situation_id" })
    situation!: Situations;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: string;
}