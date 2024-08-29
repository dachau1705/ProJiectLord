const ProductRouter = require('./products')
const UserRouter = require('./users')
const AddressRouter = require('./address')
const router = (app) => {
    app.use("/products", ProductRouter);
    app.use("/users", UserRouter);
    app.use("/address", AddressRouter);
};

module.exports = router