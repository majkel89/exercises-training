import { shoppingData } from '../../data/shopping';
import db from '../../data/data';

const employees = db.getEmployees();

const randomIdx = (size) => Math.floor(Math.random() * size)

describe('Collection Random Access', () => {

	it('can be used to pick random items', () => {
		const randomItemFrom = (collection) =>
			() => collection[randomIdx(collection.length)];

		const randomShoppingItem = randomItemFrom(shoppingData);
		for (let i = 0; i < 50; i++) {
			expect(shoppingData.includes(randomShoppingItem())).toBe(true);
		}

		const randomEmployee = randomItemFrom(employees);
		for (let i = 0; i < 50; i++) {
			expect(employees.includes(randomEmployee())).toBe(true);
		}
	})

	it('can be used to pick random items, each only once', () => {
		const randomItemOnceFrom = (collection) => {
			const leftItems = [...collection];
			return () => {
				if (!leftItems.length) {
					return;
				} else {
					const idx = randomIdx(leftItems.length);
					return leftItems.splice(idx, 1)[0];
				}
			}
		}

		const randomShoppingItem = randomItemOnceFrom(shoppingData);
		let count, item = randomShoppingItem();
		for (count = 0; item !== undefined; count++, item = randomShoppingItem()){
			expect(shoppingData.includes(item)).toBe(true);
		}
		expect(count).toBe(shoppingData.length);
	})

	it('can be used to pick random items, each only once, as a generator', () => {
		function * randomItemFromGenerator(collection){
			const leftItems = [...collection];
			while (leftItems.length) {
				const idx = randomIdx(leftItems.length);
				yield leftItems.splice(idx, 1)[0];
			}
		}

		const randomShoppingItemIterator = randomItemFromGenerator(shoppingData);
		let count = 0;
		for (let item of randomShoppingItemIterator){
			count++;
			expect(shoppingData.includes(item)).toBe(true);
		}
		expect(count).toBe(shoppingData.length);
	})
})
