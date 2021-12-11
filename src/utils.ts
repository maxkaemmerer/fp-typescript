type OneParamFunction<A, B> = (value: A) => B

export function compose<A, B, C>(f1: OneParamFunction<B, C>, f2: OneParamFunction<A, B>): OneParamFunction<A, C> {
    return (a: A) => f1(f2(a));
}

export function curry2<T,T2,T3>(f: (a: T, b: T2) => T3): (a: T) => (b: T2) => T3{
    return (a: T) => (b: T2) => f(a, b);
}

export function flip<T,T2,T3>(f: (a: T, b: T2) => T3): (b: T2, a: T) => T3 {
    return (b: T2, a: T) => f(a, b);
}