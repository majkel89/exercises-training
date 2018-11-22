import reduce from "../../reduce";

export const hasSkill = skill =>
    employer => employer.skills.includes(skill);

export const knowsJs = hasSkill('JavaScript');

export const hasNationality = nationality =>
    employer => employer.nationality === nationality;

export const not = predicateFunction =>
    (...parameters) => !predicateFunction(...parameters);

// export const and = (...conditions) =>
//     (...values) => conditions.reduce((condMet, fx) => condMet && fx(...values), true);
export const and = (...conditions) =>
    (...parameters) => !conditions.find(condition => !condition(...parameters));
export const or = (...conditions) =>
    (...parameters) => !!conditions.find(condition => condition(...parameters));

export const isAmerican = hasNationality('US');
export const isNotAmerican = not(isAmerican);
export const isFrench = hasNationality('FR');
export const isPolish = hasNationality('PL');
export const isEuropean = employer => isNotAmerican(employer);

export const hasContractType = contractType =>
    employer => employer.contractType === contractType;

export const isPermanent = hasContractType('permanent');
export const isContractor = hasContractType('contract');

export const isFullStack = and(
    and(knowsJs, hasSkill('HTML')),
    or(hasSkill('Java'), hasSkill('.net'))
);
