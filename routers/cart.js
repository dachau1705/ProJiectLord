const express = require('express')
const router = express.Router()
const { getCartList, addToCart, checkout } = require('../controllers/CartController')

router.post('/getCartList', getCartList)
router.post('/addToCart', addToCart)
router.post('/checkout', checkout)

module.exports = router