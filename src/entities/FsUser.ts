import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, Index } from 'typeorm';
import { FsVarArrayTransformer, FsVar } from './FsVar';
import { FsDomain } from './FsDomain';
import { SecAttrib } from './SecAttrib';
@Entity()
@Index("fsuser_domain_unique", ['uid','domain.id'], { unique: true })
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