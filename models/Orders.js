const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Credit Card', 'PayPal', 'Cash on Delivery', 'Bank Transfer'], // Example options
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Canceled'], // Example statuses
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    vat: {
        type: Number,
        default: 0,
    },
    voucher: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
