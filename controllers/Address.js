const axios = require('axios');

// Base URL for the API
const BASE_URL = 'https://provinces.open-api.vn/api/';

// Controller to get all provinces
const getProvinces = async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}?depth=1`);
        let provinces = response.data
        let data = []
        for (const p of provinces) {
            data.push(p.name)
        }
        res.status(200).json({ data: data, status: true });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching provinces', error });
    }
};

// Controller to get all districts by province ID
const getDistrictsByProvince = async (req, res) => {
    const { name } = req.body;
    try {
        const response = await axios.get(`${BASE_URL}?depth=2`);
        const provinces = response.data
        const province = provinces.find(p => p.name === name)
        const districts = province.districts
        let data = []
        for (const p of districts) {
            data.push(p.name)
        }
        res.status(200).json({ data: data, status: true });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching districts', error });
    }
};

// Controller to get all wards by district ID
const getWardsByDistrict = async (req, res) => {
    const { name } = req.body;
    try {
        const districts = await axios.get(`${BASE_URL}d?depth=2`);
        const district = districts.data.find(d => d.name === name)
        console.log(district);
        const response = await axios.get(`${BASE_URL}d/${district.code}?depth=2`);
        const wards = response.data.wards
        let data = []
        for (const p of wards) {
            data.push(p.name)
        }
        res.status(200).json({ data: data, status: true });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wards', error });
    }
};

module.exports = {
    getProvinces,
    getDistrictsByProvince,
    getWardsByDistrict,
};
