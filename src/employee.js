export const getEmployeesSalary = (employees) =>
    employees.reduce((sum, e) => sum + e.salary, 0);

export const getSalary = e => e.salary;
export const getCity = e => e.office[0]
export const getCountry = e => e.office[1]
