const express = require('express')
const { getListMessage } = require('../controllers/MessageController')
const { getListGroupChatByUserId } = require('../controllers/GroupChatController')
const router = express.Router()

router.post('/getListMessage', getListMessage)
router.get('/getListGroupChat', getListGroupChatByUserId)

module.exports = router