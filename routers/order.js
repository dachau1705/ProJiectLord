const express = require('express')
const router = express.Router()
const { placeOrder, getListOrderByUser } = require('../controllers/OrderController')

router.post('/placeOrder', placeOrder)
router.post('/getListOrder', getListOrderByUser)

module.exports = router