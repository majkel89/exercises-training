import API from '../../data/api';
import { Employee, Money, Nationality } from "../../data/types";
import { getSalarySum, KeyValueMap, zipPairs } from "../employee";

describe('REST API promises', () => {

  fit('handles getNationalities call', async () => {
    // imagine, that API.getNationalities executes AJAX call to a REST API
    // that is asynchronously resolved with list of nationalities
    //
    // use API.getNationalities function to fetch data and make the `expect` call pass

    const nationalities = await API.getNationalities();

    expect(nationalities).toEqual(["US", "UK", "DE", "FR", "PL", "IT", "ES"]);
  });

  fit('handles getEmployee call', () => {
		// imagine, that API.getEmployee executes AJAX call to a REST API
		// that is asynchronously resolved with data of the employee, given by id
		// Judd Bogan is id:651065
		//
		// use API.getEmployee function to fetch appropriate employee and make the `expect` call pass

    return API.getEmployee(651065).then((employee: Employee) => {
      expect(employee.firstName).toBe("Marta");
      expect(employee.lastName).toBe("Ziemann");
    });
  });

  fit('handles getEmployeesByNationality call', () => {
    // imagine, that API.getEmployeesByNationality executes AJAX call to a REST API
    // that is asynchronously resolved with list of all employees of a given nationality
    //
    // use API.getEmployeesByNationality function to fetch appropriate employees and make the `expect` call pass
    return Promise.all([
      API.getEmployeesByNationality('UK'),
      API.getEmployeesByNationality('US'),
      API.getEmployeesByNationality('FR'),
      API.getEmployeesByNationality('DE'),
    ]).then(([employeesUK, employeesUS, employeesFR, employeesDE]) => {
      expect(employeesUK.length).toBe(170);
      expect(employeesUS.length).toBe(252);
      expect(employeesFR.length).toBe(75);
      expect(employeesDE.length).toBe(155);
    });

    // order problem? hint:
    // no need to use API.getNationalities
    // use Promise.all to execute done, each promise can have its .then to manage assertion
  });

  fit('should perform a simple business domain scenario', (done) => {
    // write a function which will calculate and return total salaries of employees filtered by nationality

    function getTotalNationalSalary(nationality: Nationality): Promise<Money> {
      return API.getEmployeesByNationality(nationality)
        .then(getSalarySum);
    }

    Promise.all([
      getTotalNationalSalary("UK"),
      getTotalNationalSalary("US"),
      getTotalNationalSalary("FR"),
      getTotalNationalSalary("DE"),
    ]).then(([UK, US, FR, DE]) => {
			expect(UK).toBe(913138);
			expect(US).toBe(1401960);
			expect(FR).toBe(411725);
			expect(DE).toBe(876208);
    })
    .then(done);
  });

  fit('should perform a complex business domain scenario', () => {
    // similarly to the previous exercise write a function which will
    // calculate and return total salaries of employees of all nationalities
    // available in the system
    // the response should be a map: { UK: amount, US: amount, ...}

    type SalaryCountryMap = KeyValueMap<Nationality, Money>;

    const getTotalSalariesByNationality = (): Promise<SalaryCountryMap> =>
      API.getNationalities().then(nationalities =>
        Promise.all(nationalities.map(n => API.getEmployeesByNationality(n)))
          .then(employers => employers.map(getSalarySum))
          .then(salarySums => zipPairs(nationalities, salarySums))
        );

    return getTotalSalariesByNationality()
      .then(({ US, UK, DE, FR }) => {
        expect(UK).toBe(913138);
        expect(US).toBe(1401960);
        expect(FR).toBe(411725);
        expect(DE).toBe(876208);
      });
  })
});
