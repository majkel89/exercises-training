export default (reducerFn, accumulator) =>
    collection => {
        let i = 0;
        if (accumulator === undefined && collection.length > 0) {
            accumulator = collection[0];
            i = 1;
        }
        for (; i < collection.length; ++i) {
            accumulator = reducerFn(accumulator, collection[i], i, collection);
        }
        return accumulator;
    };
