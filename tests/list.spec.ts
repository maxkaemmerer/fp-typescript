import { append, last, prepend, tail, tails } from "../src/list"
import { Just, Nothing } from "../src/maybe"

describe('list', () => {
    describe(append, () => {
        it('should append value to end of list', () => {
            expect(append(5, [1, 2, 3, 4])).toEqual([1, 2, 3, 4, 5])
        })
    })

    describe(prepend, () => {
        it('should prepend value to front of list', () => {
            expect(prepend(0, [1, 2, 3, 4])).toEqual([0, 1, 2, 3, 4])
        })
    })

    describe(tail, () => {
        it('should return all but first element of list', () => {
            expect(tail([1, 2, 3, 4])).toEqual([2, 3, 4])
        })
    })

    describe(tails, () => {
        it('should return a list of lists where each subsequent list consists of all but the first element of the previous list', () => {
            expect(tails([1, 2, 3, 4])).toEqual([[1, 2, 3, 4], [2, 3, 4], [3, 4], [4], []]);
        })

        it('should return empty list with empty list inside if given list is empty', () => {
            expect(tails([])).toEqual([[]]);
        })
    })
    
    describe(last, () => {
        it('should return just of last value of list if there are elements', () => {
            expect(last([1, 2, 3, 4])).toEqual(Just.create(4));
        })

        it('should return nothing if the list is empty', () => {
            expect(last([])).toEqual(Nothing.create());
        })
    })
})