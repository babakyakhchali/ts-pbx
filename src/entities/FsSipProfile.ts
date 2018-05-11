import { FsVar } from './FsVar';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { FsVarCollectionTransformer, FsVarCollection } from './FsVarCollection';
import { FsGateway } from './FsGateway';
@Entity()
export class FsSipProfile extends BaseEntity{
    @Column()
    name:string;

    @Column({nullable:true, type: String, transformer: new FsVarCollectionTransformer })
    settings:FsVarCollection;

    @Column({nullable:true, type: String, transformer: new FsVarCollectionTransformer })
    aliases:string[];

    @OneToMany(type=>FsGateway,gateway=>gateway.sipProfile,{cascadeInsert:true,cascadeUpdate:true})
    gateways:FsGateway[];

    set sipPort(v:string){
        this.settings.setItemValue('sip-port',v);
    }
    get sipPort(){
       return this.settings.getItemValue('sip-port','');
    }
    constructor(){
        super();
        this.settings = new FsVarCollection();
        this.gateways = [];
    }    
}