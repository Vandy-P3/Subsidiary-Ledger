const mongoose = require('mongoose');
const { Schema } = mongoose;
const depExpCalc = require('../utils/depreciationCalc');
const accDep = require('../utils/accDepCalc');


const assetSchema = new Schema(
    {
        description: {
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
        },
        depreciationMethod: {
            type: String,
            required: true,
            enum: ['Straight Line'],
            default: 'Straight Line'
        },
        userId: {
            type: String,
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
    return depExpCalc(this.usefulLife, this.depreciationMethod, this.bookValue);
});

assetSchema.virtual('accumulatedDepreciation').get(function() {
    return accDep(this.monthPurchased, this.usefulLife, this.depreciationMethod, this.bookValue);
});


const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;