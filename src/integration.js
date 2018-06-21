import { unique } from './util'

// need to get the number of employees per office upfront
// in this case, the whole collection was analysed and
// (simple scenario; a more problematic scenario would be when the whole collection of employees
// is either unavailable at a time or too difficult to process for any reason)
import { getEmployeeCountByCity, getBenefitsByEmployeeEmail } from './groups'

import { array2dict } from './util'

// attaches number of employees working in an office (`employeesCount`) onto the office object
export const officesWithEmployeesCount = (offices, employees) => {
  const groupedByCity = getEmployeeCountByCity(employees)
  return offices.map(o => ({
    ...o,
    employeesCount: groupedByCity[o.city]
  }))
}


// attaches total monthly cost of a project (`monthlyCost`) onto the project object
// monthly cost equals sum of salaries of all team members and the manager
export const getProjectsWithMembers = (projects, employees) => {
  const array2dictById = array2dict('id')
  const employeesIdMap = array2dictById(employees)
  return projects.map(p => {
    const manager = employeesIdMap[p.manager]
    const team = p.team.map(e => employeesIdMap[e.id])
    return Object.assign({}, p, { manager, team })
  })
}

// attaches list of benefit (`benefits`) objects onto an employee object
export const employeesWithBenefits = (employees, benefits) => {
  const groupedByEmail = getBenefitsByEmployeeEmail(benefits)
  return employees.map(e => ({
    ...e, benefits:
    groupedByEmail[e.email] ? groupedByEmail[e.email] : []
  }))
}

// this one is a slightly different approach to the problem
// instead of composing relative data, it returns filtering functions that can be used to filter collections
export const getAssignedToProjectFilters = (projects) => {
  const managersIds = unique(projects.map(p => p.manager))
  const teamMembersIds = unique(projects.map(p => p.team.map(e => e.id)).reduce((list, sublist) => [...list, ...sublist]))
  const assignedEmployeesIds = [...managersIds, ...teamMembersIds]
  return {
    isAssignedToAProject(e){
      return assignedEmployeesIds.includes(e.id) 
    },
    isNotAssignedToAProject(e){
      return !assignedEmployeesIds.includes(e.id) 
    }
  }
}
