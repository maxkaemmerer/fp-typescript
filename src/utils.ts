type OneParamFunction<T, T2> = (value: T) => T2
type TwoParamFunction<T, T2, T3> = (a: T, b: T2) => T3

export function compose<T, T2, T3>(f1: OneParamFunction<T2, T3>, f2: OneParamFunction<T, T2>): OneParamFunction<T, T3> {
    return (a: T) => f1(f2(a));
}

export function curry2<T, T2, T3>(f: TwoParamFunction<T, T2, T3>): (a: T) => (b: T2) => T3 {
    return (a: T) => (b: T2) => f(a, b);
}

export function flip<T, T2, T3>(f: TwoParamFunction<T, T2, T3>): (b: T2, a: T) => T3 {
    return (b: T2, a: T) => f(a, b);
}