import db from '../../data/data';

const employees = db.getEmployees();

describe('Functional Programming', () => {

	describe('always function', () => {
		it('returns the same value no matter the arguments', () => {
			const always = (value) =>
				() => value;

			const always5 = always(5);
			expect(always5()).toEqual(5);
			expect(always5(3)).toEqual(5);
			expect(always5(1, 2, 3)).toEqual(5);

			const alwaysJack = always({name: "Jack"});
			expect(alwaysJack()).toEqual({name: "Jack"});
			expect(alwaysJack(false)).toEqual({name: "Jack"});
			expect(alwaysJack({name: "Ben"})).toEqual({name: "Jack"});
		});
	});

	describe('unary function', () => {
		it('can override arguments passed down to a function', () => {
			const unary = (fn) =>
				(arg) => fn.call(null, arg);

			const unaryParseInt = unary(parseInt);
			expect(parseInt('10', 2)).toEqual(2);
			expect(unaryParseInt('10', 2)).toEqual(10);
			expect(['1', '2', '3'].map(parseInt)).toEqual([1, NaN, NaN]);
			expect(['1', '2', '3'].map(unaryParseInt)).toEqual([1, 2, 3]);
			expect(['10', '10', '10', '10'].map(parseInt)).toEqual([10, NaN, 2, 3]);
			expect(['10', '10', '10', '10'].map(unaryParseInt)).toEqual([10, 10, 10, 10]);
		});
	});

	describe('negate function', () => {
		it('can negate the result of a Boolean function', () => {
			const negate = (fn) =>
				(...args) => !fn(...args);

			const isPolish = e => e.nationality === 'PL';
			const isntPolish = negate(isPolish);

			const knowsJavaScript = e => e.skills.includes('JavaScript');
			const doesntKnowJavaScript = negate(knowsJavaScript);

			expect(employees.filter(isPolish).length + employees.filter(isntPolish).length)
				.toEqual(employees.length);
			expect(employees.filter(knowsJavaScript).length + employees.filter(doesntKnowJavaScript).length)
				.toEqual(employees.length);
		});
	});

	describe('once function', () => {
		it('ensure that the wrapped function is executed at most once (or none)', () => {
			const once = (fn) => {
				let hasBeenCalled = false
				return (...args) => {
					if (!hasBeenCalled) {
						hasBeenCalled = true
						return fn(...args)
					}
				}
			}

			const spy1 = jasmine.createSpy()
			const onceSpy1 = once(spy1)
			onceSpy1()
			expect(spy1).toHaveBeenCalledTimes(1);

			const spy2 = jasmine.createSpy()
			const onceSpy2 = once(spy2)
			onceSpy2(); onceSpy2(); onceSpy2(); onceSpy2(); onceSpy2();
			expect(spy2).toHaveBeenCalledTimes(1);

			const spy3 = jasmine.createSpy()
			const onceSpy3 = once(spy3)
			// no calls
			expect(spy3).toHaveBeenCalledTimes(0);
		});
	});

	describe('method function', () => {
		const dog = {
			name: "Fluffy",
			hello(){
				return "bark, bark, " + this.name;
			}
		};

		const john = {
			name: "John Lennon",
			hello(){
				return "Hi, I'm " + this.name;
			}
		};

		const machine = {
			name: "ZX Spectrum",
			hello(){
				return 'PRINT "' + this.name + ' here"';
			}
		};

		it('can invoke a certain method on whatever object you pass', () => {
			function method(name){
				return function(object){
					return object[name]();
				};
			}

			const hello = method("hello");
			expect(hello(dog)).toEqual("bark, bark, Fluffy");
			expect(hello(john)).toEqual("Hi, I'm John Lennon");
			expect(hello(machine)).toEqual('PRINT "ZX Spectrum here"');
		});
	});

	describe('compose function', () => {
		it('can execute sequence of 2 operations as a new reusable function', () => {
			const compose = (f, g) =>
				(x) => g(f(x));

			const roundedSquareRoot = compose(Math.sqrt, Math.round);
			expect(roundedSquareRoot(4)).toEqual(2);
			expect(roundedSquareRoot(12.5)).toEqual(4);
			expect(roundedSquareRoot(197.25)).toEqual(14);
			expect(roundedSquareRoot(1852.5)).toEqual(43);
			expect(roundedSquareRoot(-1852.8)).toBeNaN();

			const toStr = n => n + '';
			const roundedSquareRootStr = compose(roundedSquareRoot, toStr);
			expect(roundedSquareRootStr(12.5)).toEqual('4');
		});

		function compose(...fns) {
			return (value) => fns.reduce((res, fn) => fn(res), value);
		}

		it('can execute sequence of N operations as a new reusable function', () => {
			const appendMr = (str) => "Mr. " + str;
			const appendJr = (str) => str + " Jr";
			const appendThird = (str) => str + " III";
			const appendTheMad = (str) => str + " the Mad";
			const appendDukeOfEscobar = (str) => str + ", Duke of Escobar";

			const thirdTheMadDukeOfEscobar = compose(appendThird, appendTheMad, appendDukeOfEscobar);
			expect(thirdTheMadDukeOfEscobar("John Lennon")).toEqual("John Lennon III the Mad, Duke of Escobar");
			expect(thirdTheMadDukeOfEscobar("Paul McCartney")).toEqual("Paul McCartney III the Mad, Duke of Escobar");

			const mrJrTheThird = compose(appendJr, appendThird, appendMr);
			expect(mrJrTheThird("John Lennon")).toEqual("Mr. John Lennon Jr III");
			expect(mrJrTheThird("Paul McCartney")).toEqual("Mr. Paul McCartney Jr III");
		});

		it('can be used for complex data processing', () => {
			function sum(numbers){
				return numbers.reduce(function(aggr, el){
					return aggr + el;
				}, 0);
			}

			expect(sum([1,2,3,4])).toEqual(10);
			expect(sum([1,2,3,4,5])).toEqual(15);

			const getEmployeesByNationality = nationality =>
				employees => employees.filter(e => e.nationality === nationality);

			expect(typeof getEmployeesByNationality).toEqual("function");
			expect(getEmployeesByNationality.length).toEqual(1);

			const getDEEmployees = getEmployeesByNationality('DE');
			expect(typeof getDEEmployees).toEqual("function");
			expect(getDEEmployees.length).toEqual(1);
			expect(getDEEmployees(employees).length).toEqual(155);

			const getUKEmployees = getEmployeesByNationality('UK');
			expect(typeof getUKEmployees).toEqual("function");
			expect(getUKEmployees.length).toEqual(1);
			expect(getUKEmployees(employees).length).toEqual(170);

			const half = n => n/2;

			expect(half(10)).toEqual(5);
			expect(half(1234)).toEqual(617);

			const getSalaries = employees =>
				employees.map(e => e.salary);

			expect(getSalaries([{salary: 125}, {salary: 345}])).toEqual([125, 345]);

			// use function composition to: get (1) half of (2) the sum of (3) all salaries of (4) only DE employees
			const halfDESalary = compose(
				getDEEmployees, // filter(isGerman)
				getSalaries, // map(getSalary)
				sum, // reduce(sumReducer)
				half
			);
			expect(halfDESalary(employees)).toEqual(438104);

			// use function composition to: get (1) the sum of (2) all salaries of (3) only UK employees
			const fullUKSalary = compose(
				getUKEmployees, // filter(isBritish)
				getSalaries, // map(getSalary)
				sum // reduce(sumReducer)
			);
			expect(fullUKSalary(employees)).toEqual(913138);
		});
	});
});
