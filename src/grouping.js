const getItemTotalPrice = item => Math.round(item.price * item.qty * 100) / 100;

export const byKey = k => object => object[k];
export const byType = byKey('type');
export const byContractType = byKey('contractType');
export const byOfficeCountry = employer => employer.office[1];

export const groupReducer = (grouper, reducer, getInitial = () => {}) =>
    (result, item, ...rest) => {
        const group = grouper(item);
        if (result[group] === undefined) {
            result[group] = getInitial();
        }
        result[group] = reducer(result[group], item, ...rest);
        return result;
    };

export const group = (grouper, reducer, getInitial = () => ({})) =>
    collection => collection.reduce(groupReducer(grouper, reducer), getInitial());

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
