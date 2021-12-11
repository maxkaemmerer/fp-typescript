type OneParamFunction<A, B> = (value: A) => B

export function compose<A, B, C>(f1: OneParamFunction<B, C>, f2: OneParamFunction<A, B>): OneParamFunction<A, C> {
    return (a: A) => f1(f2(a));
}