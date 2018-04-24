import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FsVar, FsVarArrayTransformer } from './FsVar';
import { FsUser } from './FsUser';
@Entity()
export class FsDomain {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    name: string;

    @Column({nullable:true, type: String, transformer: new FsVarArrayTransformer })
    params: FsVar[];

    @Column({nullable:true, type: String, transformer: new FsVarArrayTransformer })
    vars: FsVar[];

    @OneToMany(type=>FsUser,fsUser=>fsUser.domain)
    users:FsUser[];
}