const express = require('express')
const { getUsers, createUser, register, login, getDetailUser, verifyEmail, updateUser, forgotPassword, sendMail, getListMailLogByUser } = require('../controllers/UserController')
const { getAllUserInfos } = require('../controllers/UserInforController')
const router = express.Router()
const { upload, uploadFileToFirebase } = require('../middleware/uploadFileV2')

router.get('/getListUser', getUsers)
router.post('/createUser', upload.single('image'), uploadFileToFirebase, createUser)
router.post('/register', register)
router.post('/login', login)
router.post('/getDetailUser', getDetailUser)
router.get('/getAllUserInfos', getAllUserInfos)
router.post('/verify-email', verifyEmail)
router.post('/updateUser', upload.single('image'), uploadFileToFirebase, updateUser)
router.post('/forgot_password', forgotPassword)
router.post('/sendMail', sendMail)
router.post('/getListMailLogByUser', getListMailLogByUser)

module.exports = router