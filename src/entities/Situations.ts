import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { User } from "./Users.js"

@Entity("situations")
export class Situations {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: string;

     @OneToMany(() => User, (user) => user.situation)
    users!: User[]
}