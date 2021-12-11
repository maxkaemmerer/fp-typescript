import { Just, mapMaybe, Nothing } from "../src/maybe";
import { compose, curry2, flip } from "../src/utils"

describe('utils', () => {
    describe(compose, () => {
        it('should create a function that pipes output of f2 to f1 and returns the result', () => {
            const quadrouple = compose((v: number) => v * 2, (v: number) => v * 2);
            expect(quadrouple(2.5)).toEqual(10);


            const appendWorldExclamationMark = compose((v: string) => v + '!', (v: string) => v + ' World');
            expect(appendWorldExclamationMark('Hello')).toEqual('Hello World!');
        })
    })

    describe(curry2, () => {
        it('should allow passing arguments to curried function separately', () => {
            const curriedAdd = curry2((a: number, b: number) => a + b);
            const add3 = curriedAdd(3);
            expect(curriedAdd(3)(4)).toEqual(7);
            expect(add3(4)).toEqual(7);
        })
    })

    describe(flip, () => {
        it('should flip function arguments', () => {
            const subtract = (a: number, b: number) => a - b;
            const flippedSubtract = flip(subtract);
            expect(subtract(3, 4)).toEqual(-1);
            expect(flippedSubtract(3, 4)).toEqual(1);
        })
    })
})