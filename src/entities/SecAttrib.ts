import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Group } from './Group';
import { BaseEntity } from './BaseEntity';

/**
 * this works like linux file system security
 */
@Entity()
export class SecAttrib extends BaseEntity{

    @OneToOne(type=>User)
    @JoinColumn()
    owner:User;

    @OneToOne(type=>Group)
    @JoinColumn()
    group:Group;


    @Column()
    permission:number;  //777 like linux file system

    

}