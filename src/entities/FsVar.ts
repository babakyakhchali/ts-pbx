import { ValueTransformer } from "typeorm/decorator/options/ValueTransformer";

export class FsVarArrayTransformer implements ValueTransformer {

    to (value: FsVar[]): string {
        return JSON.stringify(value);
    }

    from (value: string): FsVar[] {
        return JSON.parse(value) as FsVar[];
    }

}
export class FsVar{
    name:string;
    value:string;
}