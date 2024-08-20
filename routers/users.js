const express = require('express')
const { getUsers, createUser, register, login } = require('../controllers/UserController')
const router = express.Router()

router.get('/getListUser', getUsers)
router.post('/createUser', createUser)
router.post('/register', register)
router.post('/login', login)

module.exports = router