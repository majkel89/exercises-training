// implement fundamental operators in functional style:
// reduce, map, filter, forEach

describe('Functional Programming Fundamentals', () => {

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
			const map = cb =>
				data => reduce((accumulator, v, i, arr) => {
					accumulator[i] = cb(v, i, arr);
					return accumulator;
				}, [...data])(data);

			const prettierMap = cb => reduce((acc, v, i, arr) => [...acc, cb(v, i, arr)], []);
			const optimizedPrettierMap = cb => reduce((acc, v, i, arr) => {
				acc.push(cb(v, i, arr));
				return acc;
			}, []);

			expect(map(a => a*2)([1, 2, 3, 4, 5])).toEqual([2, 4, 6, 8, 10]);
			expect(map(a => `${a}`)([1, 2, 3, 4, 5])).toEqual(['1', '2', '3', '4', '5']);

			expect(prettierMap(a => a*2)([1, 2, 3, 4, 5])).toEqual([2, 4, 6, 8, 10]);
			expect(prettierMap(a => `${a}`)([1, 2, 3, 4, 5])).toEqual(['1', '2', '3', '4', '5']);

			expect(optimizedPrettierMap(a => a*2)([1, 2, 3, 4, 5])).toEqual([2, 4, 6, 8, 10]);
			expect(optimizedPrettierMap(a => `${a}`)([1, 2, 3, 4, 5])).toEqual(['1', '2', '3', '4', '5']);
		});
	});

	describe('filter', () => {
		it('works according to specs', () => {
			const filter = cb =>
				reduce((acc, v, i) => {
					if (cb(v, i, acc)) {
						acc.push(v);
					}
					return acc;
				}, []);

			expect(filter(a => a % 2 === 0)([1, 2, 3, 4, 5])).toEqual([2, 4]);

			expect(filter(a => a <= 3)([1, 2, 3, 4, 5])).toEqual([1, 2, 3]);
		});
	});

	describe('forEach', () => {
		it('works according to specs', () => {
			const forEach = cb =>
				reduce((_, v, i, arr) => { cb(v, i, arr) }, null);

			const spy1 = jasmine.createSpy();

			forEach(spy1)(['a', 'b', 'c', 'd']);
			expect(spy1).toHaveBeenCalledTimes(4);
			expect(spy1).toHaveBeenCalledWith('a', 0, ['a', 'b', 'c', 'd']);
			expect(spy1).toHaveBeenCalledWith('b', 1, ['a', 'b', 'c', 'd']);
			expect(spy1).toHaveBeenCalledWith('c', 2, ['a', 'b', 'c', 'd']);
			expect(spy1).toHaveBeenCalledWith('d', 3, ['a', 'b', 'c', 'd']);
		});
	});
});
