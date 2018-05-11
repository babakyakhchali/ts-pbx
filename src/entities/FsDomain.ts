import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FsVar } from './FsVar';
import { FsUser } from './FsUser';
import { BaseEntity } from './BaseEntity';
import { FsVarCollection, FsVarCollectionTransformer } from './FsVarCollection';
@Entity()
export class FsDomain extends BaseEntity {
    
    @Column({unique:true})
    name: string;

    @Column({nullable:true, type: String, transformer: new FsVarCollectionTransformer })
    params: FsVarCollection

    @Column({nullable:true, type: String, transformer: new FsVarCollectionTransformer })
    vars: FsVarCollection;

    @OneToMany(type=>FsUser,fsUser=>fsUser.domain)
    users:FsUser[];
}