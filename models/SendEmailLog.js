const mongoose = require('mongoose');

const sendEmailLogSchema = new mongoose.Schema({
    to: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'sent', 'failed'],
        default: 'pending',
    },
    type: {
        type: String
    },
    errorMessage: {
        type: String,
        default: null,
    },
    sentAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

const SendEmailLog = mongoose.model('SendEmailLog', sendEmailLogSchema);

module.exports = SendEmailLog;
