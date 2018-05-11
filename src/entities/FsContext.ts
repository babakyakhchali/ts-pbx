import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { FsContextExtention } from './FsContextExtension';
@Entity()
export class FsContext extends BaseEntity{

    @Column({unique:true})
    name:string;

    @Column({default:true})
    enabled:boolean;

    @OneToMany(type=>FsContextExtention,e=>e.context)
    extensions:FsContextExtention[]
}