import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Permission } from "../../permission/models/permission.entity";

@Entity('roles')
export class Role {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @ManyToMany(() => Permission, { cascade: true })
    @JoinTable({
        name: "role_permission",
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: {name:'permission_id', referencedColumnName:'id'}
    })
    permissions: Permission[] 
}