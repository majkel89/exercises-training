import db from '../../../data/data';

import { and, or, negate, atLeast } from '../../filters'
import {
	knowsJavaScript, hasSkill,
	isEuropean, isFrench, isPolish,
	isPermanent, isContractor,
	isFullStack,
	fromOffice,
	salaryBetween, dateBetween
} from '../../employee-filters'

import { array2dict } from '../../util'
import { officesWithEmployeesCount, employeesWithBenefits, getAssignedToProjectFilters } from '../../integration'
import { getCity } from '../../employee';

// database is defined in `db/employees.json` file
const employees = db.getEmployees();
const offices = db.getOffices();
const projects = db.getProjects();

describe('Data Filtering', () => {
	it('can filter employees who know JavaScript', () => {
		const JSDevs = employees.filter(knowsJavaScript)

		expect(JSDevs.length).toEqual(633);
	});

	it('can filter European employees', () => {
		const Europeans = employees.filter(isEuropean)

		expect(Europeans.length).toEqual(1059);
	});

	it('can filter French permanent employees', () => {
		const isFrenchPermanent = and(isFrench, isPermanent)
		const FrenchPermanents = employees.filter(isFrenchPermanent)

		expect(FrenchPermanents.length).toEqual(37);
	});

	it('can filter Polish contractor employees', () => {
		const isPolishContractor = and(isPolish, isContractor)
		const PolishContractors = employees.filter(isPolishContractor)

		expect(PolishContractors.length).toEqual(221);
	});

	it('can filter FullStack developer employees', () => {
		const FullStackDevs = employees.filter(isFullStack)

		expect(FullStackDevs.length).toEqual(442);
	});

	it('can filter FullStack developers with pretty small (3000-5000) salary', () => {
		const isFullStackWithPrettySmallSalary = and(isFullStack, salaryBetween(3000, 5000))
		const theseGuys = employees.filter(isFullStackWithPrettySmallSalary)

		expect(theseGuys.length).toEqual(97);
	});

	it('can filter employees having at least n skills', () => {
		// redux, react, Angular, AngularJS, rxjs
		const knows3ModernFrameworks = atLeast(3, hasSkill('redux'), hasSkill('react'), hasSkill('Angular'), hasSkill('AngularJS'), hasSkill('rxjs'))
		const FPDevs = employees.filter(knows3ModernFrameworks)

		expect(FPDevs.length).toEqual(93);
	});

	it('can filter employees having at least n skills from location', () => {
		// redux, react, Angular, AngularJS, rxjs
		// office: Warszawa
		const fromWarszawa = fromOffice('Warszawa')
		const knows3ModernFrameworks = atLeast(3, hasSkill('redux'), hasSkill('react'), hasSkill('Angular'), hasSkill('AngularJS'), hasSkill('rxjs'))
		const FPDevsFromWarszawa = employees.filter(and(knows3ModernFrameworks, fromWarszawa))

		expect(FPDevsFromWarszawa.length).toEqual(1);
	});

	it('can filter employees whose account expires in a particular period of time', () => {
		let theseGuys;

		const period1Start = '2018-12-01', period1End = '2018-12-31';
		theseGuys = employees.filter(dateBetween(period1Start, period1End))
		expect(theseGuys.length).toEqual(43);

		const period2Start = new Date('2019-01-01'), period2End = new Date('2019-01-31');
		theseGuys = employees.filter(dateBetween(period2Start, period2End))
		expect(theseGuys.length).toEqual(34);
	});

	it('can filter FullStack developers with a specified range of salary', () => {
		let theseGuys;

		const isFullStackWithSalary3000OrAbove = and(isFullStack, salaryBetween(3000, undefined))
		theseGuys = employees.filter(isFullStackWithSalary3000OrAbove)
		expect(theseGuys.length).toEqual(340);

		const isFullStackWithSalary5000OrLess = and(isFullStack, salaryBetween(undefined, 5000))
		theseGuys = employees.filter(isFullStackWithSalary5000OrLess)
		expect(theseGuys.length).toEqual(199);

		const isFullStackWithSalary3000to5000 = and(isFullStack, salaryBetween(3000, 5000))
		theseGuys = employees.filter(isFullStackWithSalary3000to5000)
		expect(theseGuys.length).toEqual(97);

		const isFullStackWithAnySalary = and(isFullStack, salaryBetween(undefined, undefined))
		theseGuys = employees.filter(isFullStackWithAnySalary)
		expect(theseGuys.length).toEqual(employees.filter(isFullStack).length);
	});

	it('can filter employees who work in small offices (at most 50 people in an office)', () => {
		const officesWithCount = officesWithEmployeesCount(offices, employees)
		const officesWithCountMap = array2dict('city')(officesWithCount)

		const worksInASmallOffice = (e) =>
			officesWithCountMap[getCity(e)].employeesCount < 50

		const worksInABigOffice = (e) =>
			officesWithCountMap[getCity(e)].employeesCount >= 50

		const GuysWorkingInSmallOffices = employees.filter(worksInASmallOffice)
		expect(GuysWorkingInSmallOffices.length).toEqual(557);

		const GuysWorkingInBigOffices = employees.filter(worksInABigOffice)
		expect(GuysWorkingInBigOffices.length).toEqual(754);
	});

	it('can filter employees who have (or) have no benefits', () => {
		const benefits = [...db.getBenefits()].reduce((allItems, chunk) => allItems.concat(chunk));
		const employeesWithBenefitsCollection = employeesWithBenefits(employees, benefits)

		const hasBenefits = e => e.benefits.length > 0
		const employeesWithAnyBenefits = employeesWithBenefitsCollection.filter(hasBenefits)
		const employeesWithoutAnyBenefits = employeesWithBenefitsCollection.filter(negate(hasBenefits))

		expect(employeesWithAnyBenefits.length).toEqual(396);
		expect(employeesWithoutAnyBenefits.length).toEqual(915);
	});

	it('can find employees assigned (or) unassigned to any projects', () => {
		const { isAssignedToAProject, isNotAssignedToAProject } = getAssignedToProjectFilters(projects)
		const all = employees
		const assigned = employees.filter(isAssignedToAProject)
		const unassigned = employees.filter(isNotAssignedToAProject)

		expect(all.length).toBe(1311)
		expect(assigned.length).toBe(792)
		expect(unassigned.length).toBe(519)
	});
});
