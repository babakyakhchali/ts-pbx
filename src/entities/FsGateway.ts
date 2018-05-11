import { BaseEntity } from './BaseEntity';
import { FsVarCollection, FsVarCollectionTransformer } from './FsVarCollection';
import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';
import { FsSipProfile } from './FsSipProfile';

@Entity()
@Index("fsgw_sipprofile_unique", ['name','sipProfile.id'], { unique: true })
export class FsGateway extends BaseEntity{

    @Column()
    name:string;

    @Column({default:true})
    enabled:boolean;

    @Column({nullable:true,type:String,transformer:new FsVarCollectionTransformer})
    params:FsVarCollection;

    @ManyToOne(type=>FsSipProfile,sipProfile=>sipProfile.gateways)
    sipProfile:FsSipProfile;
}