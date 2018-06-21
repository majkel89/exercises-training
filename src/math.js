// number -> number
export const roundTo = (prec) =>
    (v) => {
        let power = 10 ** prec
        return Math.round(power * v) / power
    }

export const roundTo2 = roundTo(2)
export const roundTo4 = roundTo(4)
