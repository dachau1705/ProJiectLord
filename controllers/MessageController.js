const Message = require("../models/Message");

const getCartList = (req, res, next) => {
    const { userId } = req.body

    Cart.findOne({ userId: userId })
        .populate({
            path: 'items.productId',
            model: 'Product', // Ensure this matches your Product model name
        })
        .then(response => {
            const cartList = response.items.map(item => ({
                ...item.toObject(), // Chuyển đổi item sang đối tượng để dễ thao tác
                image: item.productId.image, // Giả sử trường bạn muốn lấy là price
                name: item.productId.name, // Giả sử trường bạn muốn lấy là price
            }));

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

const getListMessage = async (req, res, next) => {
    const params = req.body
    Message.find({ room_id: params.room_id })
        .then(response => {
            res.json({
                status: true,
                message: "Get Message List Successfully!",
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

module.exports = { getListMessage }