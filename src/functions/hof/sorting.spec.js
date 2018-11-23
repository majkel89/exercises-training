import db from '../../../data/data'

// database is defined in `db/employees.json` file
const employees = db.getEmployees();

fdescribe('Data Sorting', () => {

	const asc = fx => fx;
	const desc = fx => (...parameters) => -fx(...parameters);

    const getSalary = (e1, e2) => e1.salary - e2.salary;
    const getAge = (e1, e2) => new Date(e1.personalInfo.dateOfBirth) - new Date(e2.personalInfo.dateOfBirth);
    const getSkillsCount = (e1, e2) => e1.skills.length - e2.skills.length;

    const composeCompare = (...comparators) =>
		(e1, e2) => {
    		const comparator = comparators.find(comparator => comparator(e1, e2) !== 0);
    		return comparator ? comparator(e1, e2) : 0;
        };

	fit('can sort simple numbers asc', () => {
		const lexical = (a, b) => a - b;

		const numbers = ['2', '5', '10', '14', '22', '12', '4', '21', '23', '24', '1', '15', '20', '13', '3', '11', '25'];
		const sorted = [ ...numbers ].sort(asc(lexical));

		expect(sorted).toEqual(['1', '2', '3', '4', '5', '10', '11', '12', '13', '14', '15', '20', '21', '22', '23', '24', '25']);
	});

	fit('can sort by salary asc', () => {
		// sort all employees by salary desc
		const sorted = [ ...employees ].sort(asc(getSalary));

		expect(sorted.length).toEqual(1311);
		expect(sorted[0].salary).toEqual(1009);
		expect(sorted[10].salary).toEqual(1085);
		expect(sorted[20].salary).toEqual(1142);
		expect(sorted[30].salary).toEqual(1188);
		expect(sorted[40].salary).toEqual(1250);
	});

	fit('can sort by salary desc', () => {
		// sort all employees by salary desc
		const sorted = [ ...employees ].sort(desc(getSalary));

		expect(sorted.length).toEqual(1311);
		expect(sorted[0].salary).toEqual(10001);
		expect(sorted[10].salary).toEqual(9962);
		expect(sorted[20].salary).toEqual(9931);
		expect(sorted[30].salary).toEqual(9841);
		expect(sorted[40].salary).toEqual(9767);
	});

	fit('can sort by age asc', () => {
		// sort all employees by age desc
		const sorted = [ ...employees ].sort(desc(getAge));

		expect(sorted.length).toEqual(1311);
		expect(sorted[0].personalInfo.dateOfBirth).toEqual("1995-12-30");
		expect(sorted[10].personalInfo.dateOfBirth).toEqual("1995-09-10");
		expect(sorted[20].personalInfo.dateOfBirth).toEqual("1995-06-03");
		expect(sorted[30].personalInfo.dateOfBirth).toEqual("1995-01-18");
		expect(sorted[40].personalInfo.dateOfBirth).toEqual("1994-09-16");
	});

	fit('can sort by age desc', () => {
		// sort all employees by age asc
		const sorted = [ ...employees ].sort(asc(getAge));

		expect(sorted.length).toEqual(1311);
		expect(sorted[0].personalInfo.dateOfBirth).toEqual("1953-01-17");
		expect(sorted[10].personalInfo.dateOfBirth).toEqual("1953-05-14");
		expect(sorted[20].personalInfo.dateOfBirth).toEqual("1953-11-17");
		expect(sorted[30].personalInfo.dateOfBirth).toEqual("1954-04-03");
		expect(sorted[40].personalInfo.dateOfBirth).toEqual("1954-06-17");
	});

	fit('can sort by number of skills asc', () => {
		// sort all employees by number of skills desc
		const sorted = [ ...employees ].sort(asc(getSkillsCount));

		expect(sorted.length).toEqual(1311);
		expect(sorted[0].skills.length).toEqual(1);
		expect(sorted[100].skills.length).toEqual(4);
		expect(sorted[200].skills.length).toEqual(6);
		expect(sorted[300].skills.length).toEqual(8);
		expect(sorted[400].skills.length).toEqual(9);
	});

	fit('can sort by number of skills desc', () => {
		// sort all employees by number of skills asc
        const sorted = [ ...employees ].sort(desc(getSkillsCount));

		expect(sorted.length).toEqual(1311);
		expect(sorted[0].skills.length).toEqual(22);
		expect(sorted[100].skills.length).toEqual(17);
		expect(sorted[200].skills.length).toEqual(15);
		expect(sorted[300].skills.length).toEqual(14);
		expect(sorted[400].skills.length).toEqual(13);
	});

	fit('[combined] can sort by number of skills asc - then by age desc', () => {
		// sort all employees by number of skills desc
		// if same value then sort by age asc
		const sorted = [ ...employees ].sort(composeCompare(
			asc(getSkillsCount),
			asc(getAge),
		));

		expect(sorted.length).toEqual(1311);
		expect(sorted[0].personalInfo.dateOfBirth).toEqual("1956-01-15");
		expect(sorted[100].personalInfo.dateOfBirth).toEqual("1988-07-11");
		expect(sorted[200].personalInfo.dateOfBirth).toEqual("1981-04-15");
		expect(sorted[300].personalInfo.dateOfBirth).toEqual("1957-08-15");
		expect(sorted[400].personalInfo.dateOfBirth).toEqual("1969-04-21");
	});

	it('[mapped] can sort by larger office asc (number of employees working for that office)', () => {
		// sort all employees by larger office desc
		const sorted = employees;
		let officeSizeOfEmployee;

		expect(sorted.length).toEqual(1311);
		expect(officeSizeOfEmployee(sorted[0])).toEqual(10);
		expect(officeSizeOfEmployee(sorted[100])).toEqual(20);
		expect(officeSizeOfEmployee(sorted[200])).toEqual(28);
		expect(officeSizeOfEmployee(sorted[300])).toEqual(33);
		expect(officeSizeOfEmployee(sorted[400])).toEqual(39);
	});

	it('[combined] can sort by larger office desc - then by number of skills asc - then by salary asc', () => {
		// sort all employees by larger office asc
		// if same value then sort by number of skills desc
		// if same value then sort by salary desc
		const sorted = employees;

		expect(sorted.length).toEqual(1311);
		expect(sorted[0].salary).toEqual(2733);
		expect(sorted[100].salary).toEqual(4930);
		expect(sorted[200].salary).toEqual(2691);
		expect(sorted[300].salary).toEqual(7098);
		expect(sorted[400].salary).toEqual(6133);
	});
});
