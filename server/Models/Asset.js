const mongoose = require('mongoose');
const { Schema } = mongoose;
const depExpCalc = require('../utils/depreciationCalc');
const accDep = require('../utils/accDepCalc');


const assetSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        bookValue: {
            type: Number,
            required: true
        },
        monthPurchased: {
            type: Date,
            required: true
        },
        usefulLife: {
            type: Number,
            required: true,
            trim: true
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

assetSchema.virtual('monthlyDepreciationExpense').get(function() {
    return depExpCalc(this.usefulLife, this.bookValue);
});

assetSchema.virtual('accumulatedDepreciation').get(function() {
    return accDep(this.monthPurchased, this.usefulLife,  this.bookValue);
});


module.exports = assetSchema;