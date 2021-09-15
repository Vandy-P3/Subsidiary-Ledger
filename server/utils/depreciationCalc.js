const depExpCalc = (usefulLife, method, bookValue) => {
    switch(method) {
        case 'Straight Line': 
            return straightLineDep(usefulLife, bookValue); 
    }
}

const straightLineDep = (usefulLife, bookValue) => {
    const yearlyDep = bookValue / usefulLife;

    const monthlyDep = yearlyDep / 12;

    return Math.round(monthlyDep);
}

module.exports = depExpCalc;