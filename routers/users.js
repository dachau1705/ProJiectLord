const express = require('express')
const { getUsers, createUser, register, login, getDetailUser } = require('../controllers/UserController')
const router = express.Router()

router.get('/getListUser', getUsers)
router.post('/createUser', createUser)
router.post('/register', register)
router.post('/login', login)
router.post('/getDetailUser', getDetailUser)

module.exports = router