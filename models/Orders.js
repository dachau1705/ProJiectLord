const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Customer ID is required'],
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'Date is required'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required'],
        enum: {
            values: ['Credit Card', 'PayPal', 'Cash on Delivery', 'Bank Transfer'],
            message: 'Payment method must be one of Credit Card, PayPal, Cash on Delivery, or Bank Transfer',
        },
    },
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    company: {
        type: String,
    },
    country: {
        type: String,
    },
    status: {
        type: String,
        required: [true, 'Order status is required'],
        enum: {
            values: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Canceled'],
            message: 'Order status must be one of Pending, Confirmed, Shipped, Delivered, or Canceled',
        },
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
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
        required: [true, 'Email is required'],
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
