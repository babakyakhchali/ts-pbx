import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Group } from './Group';

/**
 * this works like linux file system security
 */
@Entity()
export class SecAttrib{

    @PrimaryGeneratedColumn()    
    id:number;

    @OneToOne(type=>User)
    @JoinColumn()
    owner:User;

    @OneToOne(type=>Group)
    @JoinColumn()
    group:Group;


    @Column()
    permission:number;  //777 like linux file system

    

}