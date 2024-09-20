const { response } = require("express")
const Product = require("../models/Products")

const getAllProduct = (req, res, next) => {
    Product.find()
        .sort({ createdAt: -1 })
        .then(response => {
            res.json({
                data: response,
                status: true
            })
        })
        .catch(error => {
            res.json({
                message: "An error Occured!",
                status: false
            })
        })
}

const getDetailProduct = (req, res, next) => {
    const _id = req.body._id

    Product.findById(_id)
        .then(response => {
            res.json({
                data: response,
                status: true,
                message: 'Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: "An error Occured!"
            })
        })
}

const addNewProduct = (req, res, next) => {
    const infos = req.body
    let product = new Product({
        ...infos
    })

    if (req.file) {
        product.image = req.file.firebaseUrl
    }
    product.save()
        .then(response => {
            res.json({
                message: "Add Successfully!",
                status: true,
                data: response
            })
        })
        .catch(error => {
            console.log(error);
            res.json({
                message: "An error Occured!",
                status: false
            })
        })
}

const updateProduct = (req, res, next) => {
    const infos = req.body
    let updateData = {
        ...infos
    }

    if (req.file) {
        updateData.image = req.file.firebaseUrl
    }
    Product.findByIdAndUpdate(infos._id, { $set: updateData })
        .then(response => {
            res.json({
                message: "Updated Successfully!",
                status: true
            })
        })
        .catch(error => {
            console.log(error);
            res.json({
                message: "An error Occured!",
                status: false
            })
        })
}

const deleteProduct = (req, res, next) => {
    const infos = req.body
    Product.findByIdAndDelete(infos._id)
        .then(response => {
            res.json({
                status: true,
                message: "Deleted Successfully!"
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: "An error Occured!"
            })
        })
}


module.exports = {
    getAllProduct,
    getDetailProduct,
    addNewProduct,
    updateProduct,
    deleteProduct,
}