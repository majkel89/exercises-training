export const hasSkill = skill =>
    employer => employer.skills.includes(skill);

export const knowsJs = hasSkill('JavaScript');

export const hasNationality = nationality =>
    employer => employer.nationality === nationality;

export const isAmerican = hasNationality('US');
export const isPolish = hasNationality('PL');

export const isEuropean = employer => !isAmerican(employer);
