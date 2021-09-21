const depExpCalc = (usefulLife, bookValue) => {
    const yearlyDep = bookValue / usefulLife;

    const monthlyDep = yearlyDep / 12;

    return Math.round(monthlyDep);
}

module.exports = depExpCalc;