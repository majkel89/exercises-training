export const compose = (...fns) =>
  (value) => fns.reduce((res, fn) => fn(res), value)

export const reduce = (reducerFn, seed) =>
  (items) => {
    let aggr = seed
    for (let idx = 0; idx < items.length; idx++){
      aggr = reducerFn(aggr, items[idx], idx, items)
    }
    return aggr
  }

export const lazyReduce = (reducerFn, aggr) =>
  (item) => {
    aggr = reducerFn(aggr, item)
    return aggr
  }

export const map = (mapperFn) =>
  (items) => reduce((list, item, idx, array) => [...list, mapperFn(item, idx, array)], [])(items)

export const filter = (filtererFn) =>
  // IMMUTABLE:
  // (items) => reduce((list, item, idx, array) => [...list, ...(filtererFn(item, idx, array) ? [item] : [])], [])(items)
  // MUTABLE:
  (items) => reduce((list, item, idx, array) => {
    if (filtererFn(item, idx, array)) {
      list.push(item)
    }
    return list
  }, [])(items)

export const forEach = (consumerFn) =>
  (items) => reduce((_, item, idx, array) => {
    consumerFn(item, idx, array)
  }, undefined)(items)

// sort min max

export const reverse = (comparatorFn) =>
    (i1, i2) => -comparatorFn(i1, i2)

export const combinedSort = (...fns) =>
    (i1, i2) => {
        let foundFn = fns.find(sortFn => sortFn(i1, i2) != 0)
        return foundFn ? foundFn(i1, i2) : 0 // if all equal then, well... equal
    }

export const minBy = (comparatorFn, collection) =>
    collection.reduce((min, item) => comparatorFn(min, item) < 0 ? min : item)

export const maxBy = (comparatorFn, collection) =>
    collection.reduce((max, item) => comparatorFn(max, item) > 0 ? max : item)
