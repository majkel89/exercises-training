// advanced

import { reverse } from './functions/fp-fundamentals'
import { getEmployeeCountByCity } from './groups'
import { getCity } from './employee'

// no generics in JavaScript anyway (as compared to TypeScript)

export const salaryAscComparator = (e1, e2) => e1.salary - e2.salary

export const skillsNumberAscComparator = (e1, e2) => e1.skills.length - e2.skills.length

// OLDER - naive (includes year only):
// export const ageAscComparator: EmployeeComparator = (e1, e2) => e1.personalInfo.age - e2.personalInfo.age
// OLDER - includes days
const toTimestamp = (timeStr) => new Date(timeStr).getTime()
export const dateAscComparator = (e1, e2) => toTimestamp(e1.personalInfo.dateOfBirth) - toTimestamp(e2.personalInfo.dateOfBirth)
// following is a `reverse`, because: 01-01-1990 is later than 01-01-1973 BUT... a person born in 1990 is younger than 1973 - so it's a reversed order:
export const ageAscComparator = reverse(dateAscComparator)


// a dataset-relative comparators (directly depends on another collection; can't work without the other collection)
export const createEmployeeComparator = {
    officeSizeAscComparator(employees){
        const groupedByCity = getEmployeeCountByCity(employees)
        return {
            officeSizeOfEmployee: e => groupedByCity[getCity(e)],
            ascComparator: (e1, e2) => groupedByCity[getCity(e1)] - groupedByCity[getCity(e2)]
        }
    }
}

