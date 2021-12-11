import { Just, Maybe, Nothing } from "./maybe";
import { compose, curry2, flip } from "./utils";

export function append<T>(val: T, list: T[]): T[] {
    return [...list, val];
}


export function prepend<T>(val: T, list: T[]): T[] {
    return [val, ...list];
}

export function tails<T>(list: T[]): (T[])[] {
    return list.reduce((rests, _) =>
        last(rests)
            .fmap(compose(curry2(flip(append))(rests), tail))
            .valWithDefault(rests)
        , [list]);
}

export function tail<T>(list: T[]): T[] {
    return list.slice(1);
}

export function last<T>(list: T[]): Maybe<T> {
    const lastElement = list.slice(-1)[0];
    return lastElement ? Just.create(lastElement) : Nothing.create();
}