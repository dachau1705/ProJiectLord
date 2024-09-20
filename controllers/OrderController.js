const Orders = require("../models/Orders");
const OrderItem = require("../models/OrderItem");
const Cart = require("../models/Cart");

const placeOrder = async (req, res, next) => {
    const props = req.body
    const errors = [];
    console.log(props);

    if (!props._id) {
        errors.push('Customer ID is required!');
    }
    if (!props.address) {
        errors.push('Address is required!');
    }
    if (!props.totalPrice || props.totalPrice <= 0) {
        errors.push('Total price must be greater than 0!');
    }
    if (!props.phoneNumber) {
        errors.push('Phone number is required!');
    }
    if (!props.email || !/\S+@\S+\.\S+/.test(props.email)) {
        errors.push('A valid email is required!');
    }
    if (!props.items || !Array.isArray(props.items) || props.items.length === 0) {
        errors.push('At least one item is required in the order!');
    } else {
        // Validate items individually
        props.items.forEach((item, index) => {
            if (!item.productId) {
                errors.push(`Product ID is required for item ${index + 1}!`);
            }
            if (!item.quantity || item.quantity <= 0) {
                errors.push(`Quantity must be greater than 0 for item ${index + 1}!`);
            }
            if (!item.price || item.price <= 0) {
                errors.push(`Price must be greater than 0 for item ${index + 1}!`);
            }
        });
    }
    if (errors.length > 0) {
        return res.json({
            status: false,
            message: errors[0],
            errors: errors
        });
    }
    const items = props.items
    const newOrder = new Orders({
        customerId: props._id,
        date: new Date(),
        address: props.address,
        paymentMethod: 'Cash on Delivery',
        status: 'Pending',
        totalPrice: props.totalPrice,
        phone: props.phoneNumber,
        email: props.email,
        street: props.street,
        city: props.city,
        state: props.state,
        company: props.company,
        country: props.country,
    })
    newOrder.save()
        .then((response) => {
            const orderId = (response._id).toString()
            if (orderId) {
                try {
                    for (const i of items) {
                        const newOrderItem = new OrderItem({
                            productId: i.productId,
                            amount: i.quantity,
                            price: i.price,
                            orderId: orderId
                        })
                        newOrderItem.save()
                            .then((response) => {
                                console.log("Item has been added to order!");
                            }).catch((error) => {
                                console.log(error);
                            })
                    }
                    Cart.findOneAndUpdate({ userId: props._id }, { items: [] })
                        .then(result => {
                            res.json({
                                status: true,
                                message: "Order successful!!"
                            })
                        })
                } catch (error) {
                    console.log(error);
                    res.json({
                        status: false,
                        message: "An error Occured!",
                    })
                }
            } else {
                res.json({
                    status: false,
                    message: "An error Occured!",
                })
            }
        }).catch(error => {
            console.log(error);
            res.json({
                status: false,
                message: "An error Occured!",
                error: error
            })
        })
}

const getListOrderByUser = async (req, res, next) => {
    const { userId } = req.body
    Orders.find({ customerId: userId })
        .then(response => {
            res.json({
                status: true,
                data: response
            })
        })
        .catch(error => {
            console.log(error);
            res.json({
                status: false,
                message: "An error Occured!",
                error: error
            })
        })
}

module.exports = {
    placeOrder, getListOrderByUser
};