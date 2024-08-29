const express = require('express')
const { getProvinces, getDistrictsByProvince, getWardsByDistrict } = require('../controllers/Address')
const router = express.Router()

router.get('/getAllProvinces', getProvinces)
router.post('/getDistrictsByProvince', getDistrictsByProvince)
router.post('/getWardsByDistrict', getWardsByDistrict)

module.exports = router