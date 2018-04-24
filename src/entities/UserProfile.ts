import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class UserProfile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    family: string;
    
    @OneToOne(type=>User,user=>user.profile)
    @JoinColumn()
    user:User;  

}