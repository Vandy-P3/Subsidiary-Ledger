const depExpCalc = (usefulLife, method, bookValue) => {
    switch(method) {
        case 'Straight Line': 
            straightLineDep(usefulLife, bookValue);
            break;  
    }
}

const straightLineDep = (usefulLife, bookValue) => {
    const yearlyDep = bookValue / usefulLife;

    const monthlyDep = yearlyDep / 12;

    return monthlyDep;
}

module.exports = depExpCalc;