const express = require('express')
const { getUsers, createUser, register, login, getDetailUser } = require('../controllers/UserController')
const { getAllUserInfos } = require('../controllers/UserInforController')
const router = express.Router()

router.get('/getListUser', getUsers)
router.post('/createUser', createUser)
router.post('/register', register)
router.post('/login', login)
router.post('/getDetailUser', getDetailUser)
router.get('/getAllUserInfos', getAllUserInfos)
module.exports = router