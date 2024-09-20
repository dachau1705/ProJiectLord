const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
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
    this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
    this.totalPrice = this.items.reduce((total, item) => total + item.total_price, 0);
    this.updatedAt = Date.now(); // Update the timestamp
    next();
});
cartSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.items) {
        update.totalItems = update.items.reduce((total, item) => total + item.quantity, 0);
        update.totalPrice = update.items.reduce((total, item) => total + item.total_price, 0);
    }
    update.updatedAt = Date.now();
    next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart
