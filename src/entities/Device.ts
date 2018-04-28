import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from 'typeorm';
import { FsUser } from './FsUser';
import { DeviceLine } from './DeviceLine';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Device extends BaseEntity{

    constructor(){
        super();
        this.lines=[];
    }
    
    @Column()
    mac:string;


    @OneToMany(type=>DeviceLine,line=>line.device,{cascadeInsert:true})
    lines: DeviceLine[];

}