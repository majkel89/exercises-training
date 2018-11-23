import API from '../../data/api';

describe('async functions', () => {

	// consider examples from promises/api.spec.js file
	// (!) fetch appropriate employees by their IDs: 8569129, 254808831, 58197, 651065

	it('should perform asynchronous calls sequentially', (done) => {
		// write an async function which will request data of 4 employees SEQUENTIALLY (when one finished,
		// request another one) and return list of these 4 employees to make `expect` calls pass

		async function fetchEmployees(){
			// async function body
		}

		fetchEmployees()
			.then(([e1, e2, e3, e4]) => {
				expect(e1.salary).toBe(7191)
				expect(e2.salary).toBe(5941)
				expect(e3.salary).toBe(4157)
				expect(e4.salary).toBe(8146)
				done();
			});
	})

	it('should perform asynchronous calls sequentially using for..of loop', (done) => {
		async function fetchEmployees(...ids){
			// async function body
		}

		fetchEmployees(id1, id2, id3, id4 /* put IDs here */)
			.then(([e1, e2, e3, e4]) => {
				expect(e1.salary).toBe(7191)
				expect(e2.salary).toBe(5941)
				expect(e3.salary).toBe(4157)
				expect(e4.salary).toBe(8146)
				done();
			});
	})

	it('should perform asynchronous calls simultaneously', (done) => {
		// write an async function which will request data of 4 employees SIMULTANEOUSLY (all at the same time)
		// and return list of these 4 employees to make `expect` calls pass
		// the data expectations are the same as in previous exercise

		async function fetchEmployees(){
			// async function body
		}

		fetchEmployees()
			.then(([e1, e2, e3, e4]) => {
				expect(e1.salary).toBe(7191)
				expect(e2.salary).toBe(5941)
				expect(e3.salary).toBe(4157)
				expect(e4.salary).toBe(8146)
				done();
			});
	})

	it('get total salaries by nationality - as an array of total salaries', (done) => {
		// write an async function which will calculate and return total salaries of employees filtered by nationality

		async function getTotalNationalSalary(nationality){
			// async function body
		}

		Promise.all([
			getTotalNationalSalary("UK"),
			getTotalNationalSalary("US"),
			getTotalNationalSalary("FR"),
			getTotalNationalSalary("DE")
		]).then(salaries => {
			let [UK, US, FR, DE] = salaries
			expect(UK).toBe(913138)
			expect(US).toBe(1401960)
			expect(FR).toBe(411725)
			expect(DE).toBe(876208)
			done();
		});
	})

	it('get total salaries by nationality - as a map (country code -> total salary)', (done) => {
		// similarly to the previous exercise write an async function which will
		// calculate and return total salaries of employees of all nationalities
		// available in the system
		// the response should be a map: { UK: amount, US: amount, ...}

		async function getTotalSalariesByNationality(){
			// async function body
		}

		getTotalSalariesByNationality()
			.then(salaries => {
				let { US, UK, DE, FR } = salaries
				expect(UK).toBe(913138)
				expect(US).toBe(1401960)
				expect(FR).toBe(411725)
				expect(DE).toBe(876208)
				done();
			});
	})

	it('get total project costs of projects given by id', (done) => {
		// write an async function which will calculate total monthly cost of a project
		// where the monthly cost is the sum of salaries of all team members + the manager
		//
		// consider writing an auxiliary `getProjectWithMembers` function

		async function getProjectCost(projectId){
			// async function body
		}

		Promise.all([
			getProjectCost("1b05249e-1f6a-4bc2-bc1d-136c6adeb686")
			.then(cost => expect(cost).toBe(65385)),
			getProjectCost("5d379fe7-52d9-4831-8b66-be54d9aab25c")
			.then(cost => expect(cost).toBe(105674)),
			getProjectCost("6eb66b37-1996-4a2a-a110-be6a299bc541")
			.then(cost => expect(cost).toBe(101438)),
		]).then(done)
	})

	it('get office stats for a country (number of FE, BE, FS devs for each country - as a map)', (done) => {
		// write an async function that, for a given country name (full name, not ISO code)
		// will iterate over all its offices and related employees
		// and count the number of frontend, backend and fullstack developers
		//
		// use filtering functions:
		// isFrontendDev, isBackendDev, isFullStack

		async function getOfficeStats(country){
			// async function body
		}

		Promise.all([
			getOfficeStats('Poland')
				.then(stats => expect(stats).toEqual({
					"Warszawa": { "frontend": 20, "backend": 31, "fullstack": 13 },
					"Radom": { "frontend": 15, "backend": 22, "fullstack": 8 },
					"Łódź": { "frontend": 86, "backend": 139, "fullstack": 56 },
					"Wrocław": { "frontend": 19, "backend": 34, "fullstack": 16 },
					"Lublin": { "frontend": 43, "backend": 74, "fullstack": 33 },
					"Gdańsk": { "frontend": 24, "backend": 41, "fullstack": 15 }
				})),
			getOfficeStats('Spain')
				.then(stats => expect(stats).toEqual({
					"Madrid": { "frontend": 19, "backend": 28, "fullstack": 14 },
					"Granada": { frontend: 7, backend: 8, fullstack: 4 }
				})),
		]).then(done)
	})
})
