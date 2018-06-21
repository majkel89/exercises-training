import { ProjectWithMembers } from './integration'
import { projectCost } from './project'

export const isMoreExpensiveComparator =
  (p1, p2) => projectCost(p2) - projectCost(p1)
