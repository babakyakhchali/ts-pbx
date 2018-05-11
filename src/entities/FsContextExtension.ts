import { BaseEntity } from './BaseEntity';
import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { FsContext } from './FsContext';
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';

class FsExtAction{
    app:string;
    data:string;
    inline:boolean;    
}

class FsExtCondition{
    field:string;
    expression:string;
    regex:string;   //mathcin type: or,xor,all
    regexes:FsExtRegex[];
    conditions:FsExtCondition[]; //nested conditions
    break:string;
    requireNested:boolean; //by default is implicitly true
    actions:FsExtAction[];
    antiActions:FsExtAction[];
}
class FsExtRegex{
    field:string;
    expression:string;
}

class FsExtConditionTransformer implements ValueTransformer {

    to (value: FsExtCondition[]): string {
        return JSON.stringify(value);
    }

    from (value: string): FsExtCondition[] {
        return JSON.parse(value) as FsExtCondition[];
    }

}

@Entity()
@Index("fs_extension_context_unique", ['name','context.id'], { unique: true })
export class FsContextExtention extends BaseEntity{

    @Column()
    name:string;

    @ManyToOne(type=>FsContext,c=>c.extensions,{onDelete:"CASCADE"})
    context:FsContext;
    
    @Column({type:String,transformer:new FsExtConditionTransformer})
    conditions:FsExtCondition[];
}