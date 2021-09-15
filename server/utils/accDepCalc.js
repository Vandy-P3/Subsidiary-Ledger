const depExpCalc = require('./depreciationCalc');


const accDep = (monthPurchased, usefulLife, method, bookValue) => {
    const currentMonth = new Date();
    
    const monthsPast = (monthPurchased.getMonth() - currentMonth.getMonth() + 
    (12 * (monthPurchased.getFullYear() - currentMonth.getFullYear()))) - 1

    const monthlyDep = depExpCalc(usefulLife, method, bookValue);

    return monthlyDep * monthsPast;

}


module.exports = accDep;