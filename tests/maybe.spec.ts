import { Maybe, Just, Nothing, extract, withDefault, mapMaybe, isJust } from '../src/Maybe';

describe(Maybe, () => {
    describe(Just, () => {
        test.each([
            [5, 10],
            [20, 40],
        ])('should apply function to just value', (input: number, expectedOutput: number) => {
            const just = Just.create(input);

            const fiveTimesTwo = just.fmap((a) => a * 2);

            expect(fiveTimesTwo.eq(expectedOutput)).toEqual(true);
        });

        test.each([
            [5],
            ['5'],
            [undefined],
            [null],
            [{}],
            [[]],
        // eslint-disable-next-line
        ])('should eq correctly', (value: any) => {
            expect(Just.create(value).eq(value)).toEqual(true);
        });

        test.each([
            [5],
            ['5'],
            [undefined],
            [null],
            [{}],
            [[]],
        // eslint-disable-next-line
        ])('should eq maybe correctly', (value: any) => {
            expect(Just.create(value).eqMaybe(Just.create(value))).toEqual(true);
        });

        it('should not eq maybe nothing', () => {
            expect(Just.create(5).eqMaybe(Nothing.create())).toEqual(false);
        });

        it('should return value in just when calling withDefault', () => {
            expect(Just.create(5).valWithDefault(10)).toEqual(5);
        });
    });

    describe(Nothing, () => {
        it('should map nothing to nothing', () => {
            const nothing = Nothing.create();

            const nothingTimesTwo = nothing.fmap((a: number) => a * 2);

            expect(nothingTimesTwo instanceof Nothing).toEqual(true);
        });

        it('should not equal anything', () => {
            const nothing = Nothing.create();

            expect(nothing.eq(1)).toEqual(false);
            expect(nothing.eq(null)).toEqual(false);
            expect(nothing.eq('abd')).toEqual(false);
            expect(nothing.eq([])).toEqual(false);
            expect(nothing.eq(undefined)).toEqual(false);
            expect(nothing.eq({})).toEqual(false);
        });

        it('should eq maybe correctly', () => {
            expect(Nothing.create().eqMaybe(Nothing.create())).toEqual(true);
            expect(Nothing.create().eqMaybe(Just.create(5))).toEqual(false);
        });

        it('should return default value when calling withDefault', () => {
            expect(Nothing.create().valWithDefault(10)).toEqual(10);
        });
    });

    describe(extract, () => {
        it('just extract value from just', () => {
            expect(extract(Just.create(3))).toEqual(3);
        });
    });

    describe(withDefault, () => {
        it('should return value in just', () => {
            expect(withDefault(Just.create(3), 5)).toEqual(3);
        });

        it('should return default with nothing', () => {
            expect(withDefault(Nothing.create(), 5)).toEqual(5);
        });
    });

    describe(mapMaybe, () => {
        it('should apply function to all values in list and return those that result in Just', () => {
            const makeHelloJust = (val: string) => val === 'Hello' ? Just.create(val) : Nothing.create();

            const mappedList = mapMaybe(makeHelloJust, ['Hello', 'Hello!', 'World?']);

            expect(mappedList).toEqual(['Hello']);

        });
    });

    describe(isJust, () => {
        it('should return true if value is just', () => {
            expect(isJust(Just.create(3))).toEqual(true);
        });

        it('should return false if value is nothing', () => {
            expect(isJust(Nothing.create())).toEqual(false);
        });
    });
});