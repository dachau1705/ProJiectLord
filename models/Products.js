const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String
    },
    desc: {
        type: String
    },
    price: {
        type: Number
    },
    priceIn: {
        type: Number
    },
    priceSale: {
        type: Number
    },
    amount: {
        type: Number
    },
    image: {
        type: String
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)
module.exports = Product