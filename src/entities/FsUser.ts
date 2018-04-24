import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { FsVarArrayTransformer, FsVar } from './FsVar';
import { FsDomain } from './FsDomain';
import { SecAttrib } from './SecAttrib';
@Entity()
export class FsUser{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    uid:string;

    @Column()
    password:string;

    @Column({ nullable:true,type: String, transformer: new FsVarArrayTransformer })
    params: FsVar[];

    @Column({ nullable:true,type: String, transformer: new FsVarArrayTransformer })
    vars: FsVar[];

    @ManyToOne(type=>FsDomain,fsDomain=>fsDomain.users)
    domain:FsDomain;

    @OneToOne(type=>SecAttrib)
    @JoinColumn()
    sec:SecAttrib;
}