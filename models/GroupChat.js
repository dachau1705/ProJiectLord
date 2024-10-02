const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupName: {
        type: String,
        default: null,
    },
    members: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    type: {
        type: String,
        enum: ['single', 'multiple'],
        default: 'single',
    },
    avatarGroup: {
        type: String,
        default: null,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const GroupChat = mongoose.model('GroupChat', groupSchema);
module.exports = GroupChat;