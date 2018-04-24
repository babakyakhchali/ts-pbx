import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, Column } from 'typeorm';
import { User } from './User';

@Entity()
export class Group{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @ManyToMany(type=>User,user=>user.groups)
    users:User[];

    @ManyToMany(type=>Group,group=>group.groups)
    @JoinTable()
    groups:Group[];
}