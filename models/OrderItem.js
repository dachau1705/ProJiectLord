const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
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
        default: 0,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
});
orderItemSchema.pre('save', function (next) {
    // Calculate total_items and total_price before saving
    this.totalPrice = this.price * this.amount;
    this.updatedAt = Date.now(); // Update the timestamp
    next();
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
