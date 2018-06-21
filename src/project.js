import { ProjectMembers } from './integration'

export const projectCost = (project) =>
    project.team.reduce((sum, e) => sum + e.salary, 0) + project.manager.salary
