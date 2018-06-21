export const alwaysTrue = () => true

export const negate = (boolFn) =>
  (item, idx, arr) => !boolFn(item, idx, arr)

// 3 alternative implementations of `and`

export const and = (...conditionFns) =>
  (item, idx, arr) => conditionFns.every(cfn => cfn(item, idx, arr))

export const _and = (...conditionFns) =>
  (item, idx, arr) => !conditionFns.find(cfn => !cfn(item, idx, arr))

export const __and = (...conditionFns) =>
  (item, idx, arr) => conditionFns.reduce((isMet, conditionFn) =>
    isMet && conditionFn(item, idx, arr), true)

// 3 alternative implementations of `or`

export const or = (...conditionFns) =>
  (item, idx, arr) => !!conditionFns.find(cfn => cfn(item, idx, arr))

export const _or = (...conditionFns) =>
  (item, idx, arr) => conditionFns.some(cfn => cfn(item, idx, arr))
  
export const __or = (...conditionFns) =>
  (item, idx, arr) => conditionFns.reduce((isMet, conditionFn) =>
    isMet || conditionFn(item, idx, arr), false)


export const atLeast = (n, ...predicateFns) =>
  (item, idx, arr) => predicateFns
    .map(fn => fn(item, idx, arr))
    .filter(b => b)
    .length >= n
