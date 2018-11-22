import db from '../../../data/data';

// database is defined in `db/employees.json` file
const employees = db.getEmployees();
const offices = db.getOffices();
const projects = db.getProjects();

import {
    knowsJs,
    isEuropean,
    and,
    isFrench,
    isPermanent,
    isPolish,
    isContractor,
    isFullStack,
    hasSalaryAbove,
    hasSalaryBelow,
    hasSalaryBetween,
    knows,
    atLeast,
    isInOffice,
    isExpiringBetween, isIn, lt, gteq,
} from "../../filters";
import {group, pickCount} from "../../grouping";

fdescribe('Data Filtering', () => {
	it('can filter employees who know JavaScript', () => {
		// find all employees who have 'JavaScript' skill
		let JSDevs = employees.filter(knowsJs);

		expect(JSDevs.length).toEqual(633);
	});

	it('can filter European employees', () => {
		// find all European employees (non-US)
		let Europeans = employees.filter(isEuropean);

		expect(Europeans.length).toEqual(1059);
	});

	it('can filter French permanent employees', () => {
		// find all French permanent employees
		let FrenchPermanents = employees.filter(
			and(
				isFrench,
				isPermanent
			)
		);

		expect(FrenchPermanents.length).toEqual(37);
	});

	it('can filter Polish contractor employees', () => {
		// find all Polish contractor employees
		let PolishContractors = employees.filter(and(isPolish, isContractor));

		expect(PolishContractors.length).toEqual(221);
	});

	it('can filter FullStack developer employees', () => {
		// find all fullstack developer employees
		// fullstack developer is a Frontend (JS _AND_ HTML) & (Java _OR_ .net)
		let FullStackDevs = employees.filter(isFullStack);

		expect(FullStackDevs.length).toEqual(442);
	});

	it('can filter FullStack developers with pretty small (3000-5000) salary', () => {
		// find all fullstack developers with pretty small (3000-5000) salary
		let theseGuys = employees.filter(and(isFullStack, hasSalaryBetween(3000, 5000)));

		expect(theseGuys.length).toEqual(97);
	});

	it('can filter employees having at least n skills', () => {
		// find all employees who have at least 3 skills from the following list:
		// redux, react, Angular, AngularJS, rxjs
		const skills = ['redux', 'react', 'Angular', 'AngularJS', 'rxjs'];

		let FPDevs = employees.filter(atLeast(3, ...skills.map(knows)));

		expect(FPDevs.length).toEqual(93);
	});

	it('can filter employees having at least n skills from location', () => {
		// find all employees who have at least 3 skills from the following list:
		// redux, react, Angular, AngularJS, rxjs
		// and are located in
		// office: Warszawa
        const skills = ['redux', 'react', 'Angular', 'AngularJS', 'rxjs'];

        let FPDevsFromWarszawa = employees.filter(and(
            atLeast(3, ...skills.map(knows)),
			isInOffice('Warszawa')
	    ));

		expect(FPDevsFromWarszawa.length).toEqual(1);
	});

	fit('can filter employees whose account expires in a particular period of time', () => {
		// find employees byaccount expiration date range
		let theseGuys;

		const period1Start = '2018-12-01', period1End = '2018-12-31';
        theseGuys = employees.filter(isExpiringBetween(period1Start, period1End));
		expect(theseGuys.length).toEqual(43);

		const period2Start = new Date('2019-01-01'), period2End = new Date('2019-01-31');
        theseGuys = employees.filter(isExpiringBetween(period2Start, period2End));
		expect(theseGuys.length).toEqual(34);
	});

	fit('can filter FullStack developers with a specified range of salary', () => {
		// find employees by salary ranges
		let theseGuys;

		// salary 3000+
        theseGuys = employees.filter(and(isFullStack, hasSalaryAbove(3000)));
		expect(theseGuys.length).toEqual(340);

		// salary 5000-
        theseGuys = employees.filter(and(isFullStack, hasSalaryBelow(5000)));
		expect(theseGuys.length).toEqual(199);

		// salary 3000-5000
        theseGuys = employees.filter(and(isFullStack, hasSalaryBetween(3000, 5000)));
		expect(theseGuys.length).toEqual(97);

		// salary: any
        theseGuys = employees.filter(isFullStack);
		expect(theseGuys.length).toEqual(employees.filter(isFullStack).length);
	});

	fit('can filter employees who work in small offices (at most 50 people in an office)', () => {
		const getOfficeId = item => item.office.join('-');

		const getOfficesByEmployersCount = group(getOfficeId, pickCount);

		const filterAggregate = picker =>
			collection => Object.entries(collection)
				.filter(([key, value]) => picker(value))
                .map(([key]) => key);

		const officesByEmployersCount = getOfficesByEmployersCount(employees);

		const getSmallOfficesList = filterAggregate(lt(50));
		const getBigOfficesList = filterAggregate(gteq(50));

		// find all employees working in small offices (< 50 employees)
		let GuysWorkingInSmallOffices = employees.filter(isIn(getOfficeId, getSmallOfficesList(officesByEmployersCount)));

		// find other employees (working in offices with >= 50 employees)
		let GuysWorkingInBigOffices = employees.filter(isIn(getOfficeId, getBigOfficesList(officesByEmployersCount)));

		expect(GuysWorkingInSmallOffices.length).toEqual(557);

		expect(GuysWorkingInBigOffices.length).toEqual(754);
	});

	it('can filter employees who have (or) have no benefits', () => {
		// find all employees that have (or) have no benefits
		let employeesWithAnyBenefits, employeesWithoutAnyBenefits;

		expect(employeesWithAnyBenefits.length).toEqual(396);
		expect(employeesWithoutAnyBenefits.length).toEqual(915);
	});

	it('can find employees assigned (or) unassigned to any projects', () => {
		// find all employees assigned (or) unassigned to any projects
		let all, assigned, unassigned;

		expect(all.length).toBe(1311);
		expect(assigned.length).toBe(792);
		expect(unassigned.length).toBe(519);
	});
});
