const express = require('express')
const { getUsers, createUser } = require('../controllers/UserController')
const router = express.Router()

router.get('/getListUser', getUsers)
router.post('/createUser', createUser)

module.exports = router