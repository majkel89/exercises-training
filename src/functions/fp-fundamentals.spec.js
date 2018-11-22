// implement fundamental operators in functional style:
// reduce, map, filter, forEach

fdescribe('Functional Programming Fundamentals', () => {

    const reduce = (reducerFn, accumulator) =>
        collection => {
            let i = 0;
            if (accumulator === undefined && collection.length > 0) {
                accumulator = collection[0];
                i = 1;
            }
            for (; i < collection.length; ++i) {
                accumulator = reducerFn(accumulator, collection[i], i, collection);
            }
            return accumulator;
        };

	describe('reduce', () => {
		it('works according to specs', () => {
			const data = [1, 2, 3, 4, 5];

			const sumReducer = (a, b) => a + b;
			const concatReducer = (a, b) => `${a} ${b}`;

			// implement `sumReducer`
			const sum = reduce(sumReducer);
			let sumResult = sum(data);
			expect(sumResult).toEqual(15);

			// implement `concatReducer`
			const concat = reduce(concatReducer);
			let concatResult = concat(data);
			expect(concatResult).toEqual('1 2 3 4 5');
		});
	});

	describe('map', () => {
		it('works according to specs', () => {
			// implement `map`

			expect(map(a => a*2)([1, 2, 3, 4, 5])).toEqual([2, 4, 6, 8, 10]);

			expect(map(a => '' + a)([1, 2, 3, 4, 5])).toEqual(['1', '2', '3', '4', '5']);
		});
	});

	describe('filter', () => {
		it('works according to specs', () => {
			// implement `filter`

			expect(filter(a => a % 2 === 0)([1, 2, 3, 4, 5])).toEqual([2, 4]);

			expect(filter(a => a <= 3)([1, 2, 3, 4, 5])).toEqual([1, 2, 3]);
		});
	});

	fdescribe('forEach', () => {
		fit('works according to specs', () => {
			const forEach = (cb) => data => {
				reduce((mamGoWDupie, e) => { cb(e) }, null)(data);
			};

			const spy1 = jasmine.createSpy();

			forEach(spy1)(['a', 'b', 'c', 'd']);
			expect(spy1).toHaveBeenCalledTimes(4);
			expect(spy1).toHaveBeenCalledWith('a', ['a', 'b', 'c', 'd']);
			expect(spy1).toHaveBeenCalledWith('b', ['a', 'b', 'c', 'd']);
			expect(spy1).toHaveBeenCalledWith('c', ['a', 'b', 'c', 'd']);
			expect(spy1).toHaveBeenCalledWith('d', ['a', 'b', 'c', 'd']);
		});
	});
});
