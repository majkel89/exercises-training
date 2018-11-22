const getItemTotalPrice = item => Math.round(item.price * item.qty * 100) / 100;

export const byKey = k => object => object[k];
export const byType = byKey('type');

export const group = (grouper, aggregator) =>
    collection => collection.reduce((result, item) => {
        const group = grouper(item);
        result[group] = aggregator(result[group], item);
        return result;
    }, {});

export const pickAll = (current, item) => {
    current = current || [];
    current.push(item);
    return current;
};

export const pickTotalPrice = (current, item) => {
    return (current || 0) + getItemTotalPrice(item);
};

export const pickMaxTotalPrice = (current, item) => {
    return Math.max((current || 0), getItemTotalPrice(item));
};
