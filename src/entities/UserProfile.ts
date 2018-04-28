import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity()
export class UserProfile extends BaseEntity{

    @Column({nullable:true})
    name: string;

    @Column({nullable:true})
    family: string;
    
    @OneToOne(type=>User,user=>user.profile)
    @JoinColumn()
    user:User;  

}