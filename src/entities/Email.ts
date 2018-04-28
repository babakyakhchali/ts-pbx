import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Email extends BaseEntity{

    @Column({unique:true})
    email: string;

    @ManyToOne(type=>User,user=>user.emails)    
    user:User;
}