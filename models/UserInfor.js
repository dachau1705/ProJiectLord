const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        trim: true
    },
    dob: {
        type: Date,
    },
    avatar: {
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
