const express = require('express')
const { getAllProduct, getDetailProduct, addNewProduct, updateProduct, deleteProduct } = require('../controllers/ProductController')
const router = express.Router()

router.get('/getListProduct', getAllProduct)
router.post('/getDetailProduct', getDetailProduct)
router.post('/addNewProduct', addNewProduct)
router.post('/updateProduct', updateProduct)
router.post('/deleteProduct', deleteProduct)

module.exports = router