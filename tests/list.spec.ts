import { append, prepend } from "../src/list"

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
})