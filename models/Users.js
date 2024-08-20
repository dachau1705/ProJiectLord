const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    userInfo: {
        type: Schema.Types.ObjectId,
        ref: 'UserInfo'
    }
}, { timestamps: true });

// Tạo model từ schema và export
const User = mongoose.model('User', userSchema);
module.exports = User;
