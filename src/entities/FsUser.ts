import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, Index } from 'typeorm';
import { FsVar } from './FsVar';
import { FsDomain } from './FsDomain';
import { SecAttrib } from './SecAttrib';
import { BaseEntity } from './BaseEntity';
import { FsVarCollection, FsVarCollectionTransformer } from './FsVarCollection';
@Entity()
@Index("fsuser_domain_unique", ['uid','domain.id'], { unique: true })
export class FsUser extends BaseEntity{
   
    @Column()
    uid:string;

    @Column()
    password:string;

    @Column({ nullable:true,type: String, transformer: new FsVarCollectionTransformer })
    params: FsVarCollection;

    @Column({ nullable:true,type: String, transformer: new FsVarCollectionTransformer })
    vars: FsVarCollection;

    @ManyToOne(type=>FsDomain,fsDomain=>fsDomain.users,{onDelete:"CASCADE"})
    domain:FsDomain;

    @OneToOne(type=>SecAttrib)
    @JoinColumn()
    sec:SecAttrib;
}