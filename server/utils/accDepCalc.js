const depExpCalc = require('./depreciationCalc');


const accDep = (monthPurchased, usefulLife, bookValue) => {
    const currentMonth = new Date();
    
    const monthsPast = monthPurchased.getMonth() - currentMonth.getMonth() + 
    (12 * (monthPurchased.getFullYear() - currentMonth.getFullYear()))

    const monthlyDep = depExpCalc(usefulLife, bookValue);

    

    
    return Math.round(monthlyDep * Math.abs(monthsPast));

}


module.exports = accDep;