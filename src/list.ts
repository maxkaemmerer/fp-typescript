
export function append<T>(val: T, list: T[]): T[] {
    return [...list, val];
}


export function prepend<T>(val: T, list: T[]): T[] {
    return [val, ...list];
}