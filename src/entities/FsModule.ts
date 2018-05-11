import { Entity, Column } from 'typeorm';
import { FsVarCollection, FsVarCollectionTransformer } from './FsVarCollection';
import { BaseEntity } from './BaseEntity';
@Entity()
export class FsModule extends BaseEntity
{
    constructor(){
        super();
        this.settings = new FsVarCollection();
    }
    @Column({unique:true})
    name:string;

    @Column()
    enabled:boolean;

    @Column({nullable:true, type: String, transformer: new FsVarCollectionTransformer })
    settings:FsVarCollection;
}