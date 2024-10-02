const ProductRouter = require('./products')
const UserRouter = require('./users')
const AddressRouter = require('./address')
const CartRouter = require('./cart')
const OrderRouter = require('./order')
const MessageRouter = require('./message')

const router = (app) => {
    app.use("/products", ProductRouter);
    app.use("/users", UserRouter);
    app.use("/address", AddressRouter);
    app.use("/cart", CartRouter);
    app.use("/order", OrderRouter);
    app.use("/message", MessageRouter);
};

module.exports = router