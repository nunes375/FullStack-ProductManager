const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please enter a product title.'],
        },

        description: {
            type: String,
            required: false,
        },

        price: {
            type: Number,
            required: true,
        },

        category: {
            type: [String],
            required: [true, 'Please enter at least one product category.'],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('product', productSchema)
