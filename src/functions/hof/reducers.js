export const sumReducer = (sum, n) => sum + n
export const sumReducerMapped = (mapperFn = (e) => e) =>
  (sum, n) => sum + mapperFn(n)

export const flattenReducer = (coll, subcoll) => coll.concat(subcoll)

export const concatReducer = (text, phrase) => `${text} ${phrase}`.trim()
export const pushReducer_immutable = (list, item) => [...list, item].sort()
export const pushReducer_mutable = (list, item) => {
  list.push(item);
  return list;
}
export const sortedPushReducer = (list, item) => [...list, item].sort()

export const uniqueReducer = () => {
  const s = new Set()
  return (coll, t) => {
    if (!s.has(t)) {
      s.add(t)
      coll.push(t)
    }
    return coll
  }
}
