import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, Column } from 'typeorm';
import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Group extends BaseEntity{
    
    @Column()
    name:string;

    @ManyToMany(type=>User,user=>user.groups)
    users:User[];

    @ManyToMany(type=>Group,group=>group.groups)
    @JoinTable()
    groups:Group[];
}