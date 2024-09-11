const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    items: [
        {
            productId: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1, // Minimum of 1 item required
            },
            price: {
                type: Number,
                required: true,
                min: 0, // Price must be a positive number
            },
            total_price: {
                type: Number,
                required: true,
                min: 0, // Calculated as quantity * price
            },
        },
    ],
    totalItems: {
        type: Number,
        required: true,
        default: 0, // The total number of items in the cart
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0, // The total price of all items in the cart
    },
}, { timestamps: true });

cartSchema.pre('save', function (next) {
    // Calculate total_items and total_price before saving
    this.total_items = this.items.reduce((total, item) => total + item.quantity, 0);
    this.total_price = this.items.reduce((total, item) => total + item.total_price, 0);
    this.updated_at = Date.now(); // Update the timestamp
    next();
});

module.exports = mongoose.model('Cart', cartSchema);
