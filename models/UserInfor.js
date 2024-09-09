const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    userId: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    dob: {
        type: Date,
    },
    avatar: {
        type: String,
    },
    desc: {
        type: String,
    },
    address: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        postalCode: {
            type: String,
        },
        country: {
            type: String,
        }
    }
}, { timestamps: true });

// Tạo model từ schema và export
const UserInfo = mongoose.model('UserInfo', userInfoSchema);
module.exports = UserInfo;
