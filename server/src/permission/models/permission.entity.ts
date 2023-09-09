import { InjectRepository } from "@nestjs/typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('permission')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}