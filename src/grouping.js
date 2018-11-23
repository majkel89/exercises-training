const getItemTotalPrice = item => Math.round(item.price * item.qty * 100) / 100;

export const byKey = k => object => object[k];
export const byType = byKey('type');

export const group = (grouper, aggregator) =>
    collection => collection.reduce((result, item) => {
        const group = grouper(item);
        result[group] = aggregator(result[group], item);
        return result;
    }, {});

export const pickAll = (current = [], item) => {
    current.push(item);
    return current;
};

export const pickCount = (current = 0) => current + 1;

export const pickTotalPrice = (current = 0, item) => {
    return current + getItemTotalPrice(item);
};

export const pickMaxTotalPrice = (current = 0, item) => {
    return Math.max(current, getItemTotalPrice(item));
};
