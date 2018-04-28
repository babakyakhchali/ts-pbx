import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Role extends BaseEntity {
    
    @Column()
    name: string;

    @ManyToMany(type => User, user => user.roles)    
    users: User[];

}