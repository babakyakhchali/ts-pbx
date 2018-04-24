import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Email {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    email: string;

    @ManyToOne(type=>User,user=>user.emails)    
    user:User;
}