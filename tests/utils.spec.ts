import { Just, mapMaybe, Nothing } from "../src/maybe";
import { compose } from "../src/utils"

describe('utils', () => {
    describe(compose, () => {
        it('should create a function that pipes output of f2 to f1 and returns the result', () => {
            const quadrouple = compose((v: number) => v * 2, (v: number) => v * 2);
            expect(quadrouple(2.5)).toEqual(10);


            const appendWorldExclamationMark = compose((v: string) => v + '!', (v: string) => v + ' World');
            expect(appendWorldExclamationMark('Hello')).toEqual('Hello World!');
        })
    })

    describe(mapMaybe, () => {
        it('should apply function to all values in list and return those that result in Just', () => {
            const makeHelloJust = (val: string) => val === 'Hello' ? Just.create(val): Nothing.create(); 

            const mappedList = mapMaybe(makeHelloJust, ['Hello', 'Hello!', 'World?']);

            expect(mappedList).toEqual(['Hello']);

        });
    })
})