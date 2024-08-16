const express = require('express')
const { getAllProduct, getDetailProduct, addNewProduct, updateProduct, deleteProduct } = require('../controllers/ProductController')
const router = express.Router()
const { upload, uploadFileToFirebase } = require('../middleware/uploadFileV2')

router.get('/getListProduct', getAllProduct)
router.post('/getDetailProduct', getDetailProduct)
router.post('/addNewProduct', upload.single('image'), uploadFileToFirebase, addNewProduct)
router.post('/updateProduct', upload.single('image'), uploadFileToFirebase, updateProduct)
router.post('/deleteProduct', deleteProduct)

module.exports = router