import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class UserProfile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    name: string;

    @Column({nullable:true})
    family: string;
    
    @OneToOne(type=>User,user=>user.profile)
    @JoinColumn()
    user:User;  

}