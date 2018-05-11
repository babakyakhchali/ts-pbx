import { FsVar } from './FsVar';
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';
export class FsVarCollectionTransformer implements ValueTransformer {

    to (value: FsVarCollection): string {
        return JSON.stringify(value.items);
    }

    from (value: string): FsVarCollection {
        return new FsVarCollection(JSON.parse(value) as FsVar[]);
    }

}
export class FsVarCollection{
    items:FsVar[];
    constructor(vars?:FsVar[]){
        if(vars){
            this.items = vars;
        }else{
            this.items = [];
        }       
    }

    findItem(name:string){
        return this.items.find(t=>t.name == name);
    }

    getItemValue(name,d?:string){
        d = d || null;
        let v = this.findItem(name);
        return v?v.value:d;
    }
    setItemValue(name,value){
        let i = this.findItem(name);
        if(i){
            i.value = value;
        }else{
            this.items.push({name:name,value:value});
        }
    }

}