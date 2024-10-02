const Message = require("../models/Message");

const getListMessage = async (req, res, next) => {
    const params = req.body
    console.log(params);
    
    Message.find({ room_id: params.room_id })
        .then(response => {
            res.json({
                status: true,
                message: "Get Message List Successfully!",
                data: response
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