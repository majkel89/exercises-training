import API from '../../data/api';
import { async } from '../../data/async';

import { Employee, Money, Nationality } from '../../data/data';
import { getSalarySum, KeyValueMap, zipPairs } from "../employee";

describe('coroutines', () => {

	// consider examples from promises/api.spec.js file
	// (!) fetch appropriate employees by their IDs: 8569129, 254808831, 58197, 651065

	// define EmployeeListCoroutine datatype here
	// note, that a coroutine is a function, that returns a promise of a given type

	// RxJS

	type EmployeeId = Employee['id'];

	type EmployeeListCoroutine = () => Promise<Employee[]>;
	type EmployeeListByIdsCoroutine = (...ids: EmployeeId[]) => Promise<Employee[]>;

	fit('should perform asynchronous calls sequentially', () => {
		// write a coroutine which will request data of 4 employees SEQUENTIALLY (when one finished,
		// request another one) and return list of these 4 employees to make `expect` calls pass
		// find appropriate employees in src/data.js file

		function* fetchEmployees() {
			let e1;
			try {
				e1 = yield API.getEmployee(8569129); // ~ try from cache
			} catch {
				e1 = yield API.getEmployee(8569129); // ~ try from service
			}
			const e2 = yield API.getEmployee(254808831);
			const e3 = yield API.getEmployee(58197);
			const e4 = yield API.getEmployee(651065);
			return [e1, e2, e3, e4];
		}

		const fetchEmployeesCoroutine: EmployeeListCoroutine = async(fetchEmployees);
		return fetchEmployeesCoroutine()
			.then(([e1, e2, e3, e4]) => {
				expect(e1.salary).toBe(7191);
				expect(e2.salary).toBe(5941);
				expect(e3.salary).toBe(4157);
				expect(e4.salary).toBe(8146);
			});
	});

	fit('should perform asynchronous calls sequentially using for..of loop', () => {
		function * fetchEmployees(...ids: EmployeeId[]) {
			const result = [];
			for (const id of ids) {
				result.push(yield API.getEmployee(id));
			}
			return result;
		}

		const fetchEmployeesCoroutine: EmployeeListByIdsCoroutine = async(fetchEmployees);
		return fetchEmployeesCoroutine(8569129, 254808831, 58197, 651065)
			.then(([e1, e2, e3, e4]) => {
				expect(e1.salary).toBe(7191);
				expect(e2.salary).toBe(5941);
				expect(e3.salary).toBe(4157);
				expect(e4.salary).toBe(8146);
			});
	});

	fit('should perform asynchronous calls simultaneously', () => {
		// write a coroutine which will request data of 4 employees SIMULTANEOUSLY (all at the same time)
		// and return list of these 4 employees to make `expect` calls pass
		// the data expectations are the same as in previous exercise

		function* fetchEmployees(){
			const e1Request = API.getEmployee(8569129);
			const e2Request = API.getEmployee(254808831);
			const e3Request = API.getEmployee(58197);
			const e4Request = API.getEmployee(651065);
			return [yield e1Request, yield e2Request, yield e3Request, yield e4Request]; // ~ Promise.all / fail here
		}

		// $.get('url) // -> salient fail
		// Promise.resolve($.get('url)) // -> loud fail

		const fetchEmployeesCoroutine: EmployeeListCoroutine = async(fetchEmployees);
		return fetchEmployeesCoroutine()
			.then(([e1, e2, e3, e4]) => {
				expect(e1.salary).toBe(7191);
				expect(e2.salary).toBe(5941);
				expect(e3.salary).toBe(4157);
				expect(e4.salary).toBe(8146);
			});
	});

	// define NationalSalaryCoroutine datatype here

	fit('should perform a simple business domain scenario', () => {
		// write a coroutine which will calculate and return total salaries of employees filtered by nationality

		type NationalSalaryCoroutine = (nationality: Nationality) => Promise<Money>;

		function* getTotalNationalSalary(nationality: Nationality) {
			return getSalarySum(yield API.getEmployeesByNationality(nationality));
		}

		const getNationalSalaryCoroutine: NationalSalaryCoroutine = async(getTotalNationalSalary);
		return Promise.all([
			getNationalSalaryCoroutine('UK'),
			getNationalSalaryCoroutine('US'),
			getNationalSalaryCoroutine('FR'),
			getNationalSalaryCoroutine('DE')
		]).then(salaries => {
			const [UK, US, FR, DE] = salaries;
			expect(UK).toBe(913138);
			expect(US).toBe(1401960);
			expect(FR).toBe(411725);
			expect(DE).toBe(876208);
		});
	});

	// define CountrySalariesCoroutine datatype here

	fit('should perform a complex business domain scenario', () => {
		// similarly to the previous exercise write a coroutine which will
		// calculate and return total salaries of employees of all nationalities
		// available in the system
		// the response should be a map: { UK: amount, US: amount, ...}

		type CountrySalariesCoroutine = () => Promise<KeyValueMap<Nationality, Money>>;

		function* getTotalSalariesByNationality() {
			const nationalities = yield API.getNationalities();
			const employeesList = yield Promise.all(nationalities.map(API.getEmployeesByNationality));
			return zipPairs(nationalities, employeesList.map(getSalarySum));
		}

		const getTotalSalariesByNationalityCoroutine: CountrySalariesCoroutine = async(getTotalSalariesByNationality);
		return getTotalSalariesByNationalityCoroutine().then(salaries => {
			let { US, UK, DE, FR } = salaries;
			expect(UK).toBe(913138);
			expect(US).toBe(1401960);
			expect(FR).toBe(411725);
			expect(DE).toBe(876208);
		});
	})
});
