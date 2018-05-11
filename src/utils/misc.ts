
export function findAndRemove<T>(arr:Array<T>, f: (value: T, index: number, obj: T[]) => boolean) {
    const i = arr.findIndex(f);
    if (i >= 0) {
        arr.splice(i, 1);
        return true;
    } else {
        return false;
    }
}