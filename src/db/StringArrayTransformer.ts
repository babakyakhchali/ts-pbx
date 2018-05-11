import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';

export class StringArrayTransformer implements ValueTransformer {

    to (value: string[]): string {
        return JSON.stringify(value);
    }

    from (value: string): string[] {
        return JSON.parse(value) as string[];
    }

}