import { Maybe, Just, Nothing } from '../src/Maybe'

describe(Maybe, () => {
    describe(Just, () => {
        test.each([
            [5, 10],
            [20, 40],
        ])('should apply function to just value', (input: number, expectedOutput: number) => {
            const just = Just.create(input);

            const fiveTimesTwo = just.fmap((a) => a * 2);

            expect(fiveTimesTwo.eq(expectedOutput)).toEqual(true);
        })

        test.each([
            [5]
            ['5'],
            [undefined],
            [null],
            [{}],
            [[]],
        ])('should eq correctly', (value: any) => {
            expect(Just.create(value).eq(value)).toEqual(true);
        });
        
        test.each([
            [5]
            ['5'],
            [undefined],
            [null],
            [{}],
            [[]],
        ])('should eq maybe correctly', (value: any) => {
            expect(Just.create(value).eqMaybe(Just.create(value))).toEqual(true);
        });
        
        it('should not eq maybe nothing', () => {
            expect(Just.create(5).eqMaybe(Nothing.create())).toEqual(false);
        });
    });

    describe(Nothing, () => {
        it('should map nothing to nothing', () => {
            const nothing = Nothing.create();

            const nothingTimesTwo = nothing.fmap((a: number) => a * 2);

            expect(nothingTimesTwo === nothing).toEqual(true);
        })

        it('should not equal anything', () => {
            const nothing = Nothing.create();

            expect(nothing.eq(1)).toEqual(false);
            expect(nothing.eq(null)).toEqual(false);
            expect(nothing.eq('abd')).toEqual(false);
            expect(nothing.eq([])).toEqual(false);
            expect(nothing.eq(undefined)).toEqual(false);
            expect(nothing.eq({})).toEqual(false);
        })

        it('should eq maybe correctly', () => {
            expect(Nothing.create().eqMaybe(Nothing.create())).toEqual(true);
            expect(Nothing.create().eqMaybe(Just.create(5))).toEqual(false);
        });
    });
});