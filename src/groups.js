import { groupReducer, groupBy } from './functions/hof/group-by'
import { getCity } from './employee'
import { countReducer, mutableListReducer } from './util'

const countByCityGrouper = groupReducer(countReducer, () => 0, getCity)
export const getEmployeeCountByCity = (employees) =>
  groupBy(countByCityGrouper, employees)

const sublistsByEmailGrouper = groupReducer(mutableListReducer, () => [], b => b.beneficiary.email)
export const getBenefitsByEmployeeEmail = (benefits) =>
  groupBy(sublistsByEmailGrouper, benefits)
