describe('time tracker helpers', function () {
    describe('pad', function () {
        it('should pad a string to a specified length with 0', function () {
            expect(pad('0', 2)).toEqual('00');
            expect(pad('0', 3)).toEqual('000');
            expect(pad('12', 5)).toEqual('00012');
        });

        it('should not pad a string to a specified length lower than the initial length', function () {
            expect(pad('12', 1)).toEqual('12');
            expect(pad('1000', 2)).toEqual('1000');
        });

        it('should pad a string with something other than 0', function () {
            expect(pad('0', 2, 'a')).toEqual('a0');
            expect(pad('123', 5, 'b')).toEqual('bb123');
        });
    });
});