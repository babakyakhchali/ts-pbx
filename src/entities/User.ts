import {Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, OneToMany, JoinTable} from "typeorm";
import { UserProfile } from "./UserProfile";
import { Role } from "./Role";
import { Email } from "./Email";
import { Group } from "./Group";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
    
    @OneToOne(type=>UserProfile,userProfile=>userProfile.user)    
    profile: UserProfile

    @ManyToMany(type=>Role,role=>role.users)
    @JoinTable()
    roles:Role[];

    @OneToMany(type=>Email,email=>email.user)    
    emails:Email[];

    @ManyToMany(type=>Group,group=>group.users)
    @JoinTable()
    groups:Group[];

}