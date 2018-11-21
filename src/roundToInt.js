const roundToInt = prec =>
    value =>
        Math.floor(value * 10 ** prec) | 0;

export default roundToInt;
