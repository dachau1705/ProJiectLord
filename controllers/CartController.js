const Cart = require("../models/Cart")

const getCartList = (req, res, next) => {
    const { userId } = req.body

    Cart.findOne({ userId: userId })
        .populate({
            path: 'items.productId',
            model: 'Product', // Ensure this matches your Product model name
        })
        .then(response => {
            const cartList = response.items
            res.json({
                status: true,
                message: "Get Cart List Successfully!",
                data: cartList
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: "An error Occured!",
                error: error
            })
        })
}

const addToCart = async (req, res, next) => {
    const params = req.body
    try {
        const item = {
            productId: params._id,
            quantity: 1,
            price: params.priceSale ? params.priceSale : params.price,
            total_price: params.priceSale ? params.priceSale : params.price
        }
        const existedCart = await Cart.findOne({ userId: params.userId })
        if (existedCart) {
            const existedItems = existedCart.items
            let newItems = []

            const existedItem = existedItems.find(i => (i.productId).toString() === item.productId)
            if (existedItem && existedItem?.productId) {
                const items = existedItems.filter(i => (i.productId).toString() !== item.productId)
                newItems = [...items, {
                    productId: params._id,
                    quantity: (existedItem.quantity + 1),
                    price: params.priceSale ? params.priceSale : params.price,
                    total_price: (params.priceSale ? params.priceSale : params.price) * (existedItem.quantity + 1)
                }]
            } else {
                newItems = [...existedItems, item]
            }
            Cart.findOneAndUpdate({ userId: params.userId }, { items: newItems })
                .then((response) => {
                    res.json({
                        status: true,
                        message: "Add To Cart Successfully!"
                    })
                }).catch(error => {
                    console.log(error);

                    res.json({
                        status: false,
                        message: "An error Occured!",
                        error: error
                    })
                })
        } else {
            const newData = {
                userId: params.userId,
                items: [
                    item
                ]
            }
            let cart = new Cart({
                ...newData
            })

            cart.save()
                .then((response) => {
                    res.json({
                        status: true,
                        message: "Add To Cart Successfully!"
                    })
                }).catch(error => {
                    console.log(error);

                    res.json({
                        status: false,
                        message: "An error Occured!",
                        error: error
                    })
                })
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: "An 123 error Occured!",
            error: error
        })
    }
}

const checkout = (req, res, next) => {
    const newItems = req.body.items
    let items = []
    for (const i of newItems) {
        items.push({
            productId: i.productId,
            price: i.price,
            quantity: i.quantity,
            total_price: i.totalPrice
        })
    }
    const info = JSON.parse(req.headers['info'])
    try {
        Cart.findOneAndUpdate({ userId: info.userId }, { items: items })
            .then((response) => {
                res.json({
                    status: true,
                    message: "Update Cart Successfully!"
                })
            }).catch(error => {
                res.json({
                    status: false,
                    message: "An error Occured!",
                    error: error
                })
            })
    } catch (error) {
        res.json({
            status: false,
            message: "An error Occured!",
            error: error
        })
    }
}

module.exports = {
    getCartList,
    addToCart,
    checkout
}