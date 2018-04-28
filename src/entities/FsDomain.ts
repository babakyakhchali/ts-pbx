import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FsVar, FsVarArrayTransformer } from './FsVar';
import { FsUser } from './FsUser';
import { BaseEntity } from './BaseEntity';
@Entity()
export class FsDomain extends BaseEntity {
    
    @Column({unique:true})
    name: string;

    @Column({nullable:true, type: String, transformer: new FsVarArrayTransformer })
    params: FsVar[];

    @Column({nullable:true, type: String, transformer: new FsVarArrayTransformer })
    vars: FsVar[];

    @OneToMany(type=>FsUser,fsUser=>fsUser.domain)
    users:FsUser[];
}