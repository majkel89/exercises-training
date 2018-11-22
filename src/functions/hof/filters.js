import reduce from "../../reduce";

export const knows = skill =>
    employer => employer.skills.includes(skill);

export const knowsJs = knows('JavaScript');

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
    and(knowsJs, knows('HTML')),
    or(knows('Java'), knows('.net'))
);

export const hasSalaryBetween = (min, max) =>
    employer => employer.salary >= min && employer.salary <= max;

export const atLeast = (min, ...predicates) =>
    (...values) => predicates.filter(predicate => predicate(...values)).length >= min;

export const isInOffice = office =>
    employer => employer.office.includes(office);
