const mongoose = require('mongoose');
const { Schema } = mongoose;

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
            enum: [3,5]
        },
        depreciationMethod: {
            type: String,
            required: true,
            enum: ['Straight Line'],
            default: 'Straight Line'
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
)


const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;