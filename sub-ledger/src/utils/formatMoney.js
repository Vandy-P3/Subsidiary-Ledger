import accounting from 'accounting'

export const formatPositive = (number) => {
    const options = {
        precision: 0
    }

    return accounting.formatMoney(number, options)
}

export const formatNegative = (number) => {
    const options = {
        precision: 0,
        format: "%s(%v)",
    }

    return accounting.formatMoney(number, options)
}

