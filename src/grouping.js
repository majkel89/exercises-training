const getItemTotalPrice = item => Math.round(item.price * item.qty * 100) / 100;

export const byKey = k => object => object[k];
export const byType = byKey('type');
export const byContractType = byKey('contractType');

export const groupReducer = (grouper, reducer) =>
    (result, item, ...rest) => {
        const group = grouper(item);
        result[group] = reducer(result[group], item, ...rest);
        return result;
    };

export const group = (grouper, reducer) =>
    collection => collection.reduce(groupReducer(grouper, reducer), {});

export const groupBy = (grupperFn, collection) =>
    collection.reduce(grupperFn, {});

export const pushReducer = (current = [], item) => {
    current.push(item);
    return current;
};

export const countReducer = (current = 0) => current + 1;

export const totalPriceReducer = (current = 0, item) =>
    current + getItemTotalPrice(item);

export const maxTotalPriceReducer = (current = 0, item) =>
    Math.max(current, getItemTotalPrice(item));
