import db from '../../data/data';
import { shoppingData, shoppingDataDictionary } from '../../data/shopping';

const employees = db.getEmployees();

describe('Collection restructuring', () => {
	// in these exercises you'll be given two data structures:
	// - shopping items list (small one)
	// - employee list (big one)
	// all items have their own `id` attributes.
	// your task will be to write functions that:
	// - turn a list into a dictionary
	// - turn a dictionary into a list

	it('array2dict can turn an array into a dictionary (with `id` key)', () => {
		const array2dict = arrayWithIds =>
			arrayWithIds.reduce((dict, el) => ({
				...dict,
				[el.id]: el
			}), {});

		let employeeDictionary = array2dict(employees);

		expect(employees.length).toEqual(1311);
		expect(Object.keys(employeeDictionary).length).toEqual(1311);
		expect(employeeDictionary[651065].salary).toEqual(8146);

		let shoppingDictionary = array2dict(shoppingData);

		expect(shoppingData.length).toEqual(10);
		expect(Object.keys(shoppingDictionary).length).toEqual(10);
		expect(shoppingDictionary[611830716982].name).toEqual('Beer');
	})

	it('dict2array can turn a dictionary (with `id` key) into an array', () => {
		const dict2array = (dict) => Object.entries(dict)
			.reduce((arr, [key, value]) => [...arr, { id: key, ...value }], [])

		let shoppingData = dict2array(shoppingDataDictionary);

		expect(Object.keys(shoppingDataDictionary).length).toEqual(10);
		expect(shoppingData.length).toEqual(10);
		expect(shoppingData.find(e => e.id == 611830716982).name).toEqual('Beer');
	})
})
