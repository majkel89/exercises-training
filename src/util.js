export const zip = (keys, values) =>
    keys.reduce((builtObj, key, idx) => {
        builtObj[key] = values[idx];
        return builtObj;
    }, {})

export const zipPairs = (pairs) =>
    pairs.reduce((builtObj, [key, value]) => {
        builtObj[key] = value
        return builtObj
    }, {})



export const identity = (t) => t

export const uniqueFilterer = (mapFn = identity) => {
    const s = new Set()
    return t => {
        const mapped = mapFn(t)
        const found = s.has(mapped)
        return !found && s.add(mapped)
    }
}

export const unique = (items, mapFn = identity) => {
    return items.filter(uniqueFilterer(mapFn))
}



// reducers
export const sumReducer = (sum, num) => sum + num
export const countReducer = (count, _) => count + 1
export const mutableListReducer = (list, t) => {
    list.push(t)
    return list
};
export const immutableListReducer = (list, t) => [...list, t]



export const array2dict = uniqueKey =>
    array =>
        array.reduce((dict, el) => ({
            ...dict,
            // it could be this, but if the value is as object, then `[Object object]` key is reused
            // and values are being overwritten:
            [el[uniqueKey]]: el,
            // the following is more explicit, though still casts objects to strings as [Object object] 
            // [`${el[uniqueKey]}`]: el,
        }), {});
