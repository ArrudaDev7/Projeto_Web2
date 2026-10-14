import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Users } from "./Users.js"

@Entity("situations")
export class Situations {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type : "varchar", unique: true })
    nameSituation!: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: string;

     @OneToMany(() => Users, (user:Users) => user.situation)
    users!: Users[]
}