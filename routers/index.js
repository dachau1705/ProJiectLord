const ProductRouter = require('./products')
const UserRouter = require('./users')
const router = (app) => {
    app.use("/products", ProductRouter);
    app.use("/users", UserRouter);
};

module.exports = router