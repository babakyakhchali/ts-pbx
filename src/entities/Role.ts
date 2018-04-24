import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from './User';

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => User, user => user.roles)    
    users: User[];

}