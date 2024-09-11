const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: [1, 'Amount must be at least 1'],
    },
    price: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
        validate: {
            validator: function () {
                return this.total_price === this.price * this.amount;
            },
            message: 'Total price must be equal to price multiplied by amount',
        },
    },
    orderId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
