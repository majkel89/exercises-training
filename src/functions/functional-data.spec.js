import db from '../../data/data';

import { roundTo2 } from '../math';

// database is defined in `db/employees.json` file
const employees = db.getEmployees();

describe('Functional programming', () => {

	describe('Processing data simple scenario', () => {

		it('is possible using for loop, yet inconvenient', () => {
			// calculate total amount of bonus
			// given to all employees with nationality equal "DE"
			// whose salary is below 5000
			// where bonus equals 20% of the salary

			// use FOR loops
			let totalBonus = 0;
			for (let i = 0; i < employees.length; i++){
				let employee = employees[i];
				if (employee.nationality === 'DE' && employee.salary < 5000){
					totalBonus += employee.salary * 0.2;
				}
			}
			totalBonus = roundTo2(totalBonus);

			expect(totalBonus).toEqual(42499);
		});

		it('is more readable and more convenient using functional programming', () => {
			// calculate total amount of bonus
			// given to all employees with nationality equal "DE"
			// whose salary is below 5000
			// where bonus equals 20% of the salary

			// use functional programming
			let totalBonus = employees
				.filter(function(employee){
					return employee.nationality === 'DE';
				}).filter(function(employee){
					return employee.salary < 5000;
				}).map(function(employee){
					return employee.salary * 0.2;
				}).reduce(function(aggr, bonus){
					return aggr + bonus;
				}, 0);
			totalBonus = roundTo2(totalBonus);

			expect(totalBonus).toEqual(42499);
		});

	});

	it('makes it easy to filter data by condition', () => {
		// fetch the employee with ID 651065
		let employee651065 = employees.find(function(employee){
			return employee.id === 651065;
		});

		expect(employee651065.id).toEqual(651065);
		expect(employee651065.firstName).toEqual("Marta");
		expect(employee651065.personalInfo.address.city).toEqual("Calista furt");
		expect(employee651065.personalInfo.phone).toEqual("(134) 899-1656");

		// fetch a employee with nationality US
		let USEmployee = employees.find(function(employee){
			return employee.nationality === "US";
		});

		expect(USEmployee.nationality).toEqual("US");
	});

	it('makes it easy to filter data by condition', () => {
		// fetch all employees with nationality DE only
		let DEEmployees = employees.filter(function(employee){
			return employee.nationality === 'DE';
		})

		expect(DEEmployees.length).toEqual(155);
		expect(DEEmployees[0].lastName).toEqual("Biesenbach");
		expect(DEEmployees[10].lastName).toEqual("Verniest");
		expect(DEEmployees[20].lastName).toEqual("Steding");

		// fetch all employees with gmail.com _personal_ email domain only
		function check(email, domain){
			return email.substr(email.length - domain.length, email.length) === domain;
		}
		let GmailEmployees = employees.filter(function(employee){
			return check(employee.personalInfo.email, "gmail.com");
		})

		expect(GmailEmployees.length).toEqual(439);
		expect(GmailEmployees[0].lastName).toEqual("Kruszewski");
		expect(GmailEmployees[10].lastName).toEqual("Radecki");
		expect(GmailEmployees[20].lastName).toEqual("Benedetti");
	});

	it('makes it easy to search for single objects', () => {
		// fetch the phone to the richest employee who is American
		// or (gives the same result in this case)
		// fetch the phone to the richest American
		let maxSalary = Math.max.apply(null, employees.map(function(employee){
			return employee.salary;
		}));
		let RichestUSEmployeePhone = employees
			.find(function(employee){
				return employee.salary === maxSalary && employee.nationality === "US";
			}).personalInfo.phone;

		expect(RichestUSEmployeePhone).toEqual("623-711-7686 x7328");
	});

});
