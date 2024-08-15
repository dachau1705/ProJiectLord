const { response } = require("express")
const Product = require("../models/Products")

const getAllProduct = (req, res, next) => {
    Product.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: "An error Occured!"
            })
        })
}

const getDetailProduct = (req, res, next) => {
    const productID = req.body.productID
    Product.findById(productID)
        .then(response => {
            res.json({
                response
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
        name: infos.name,
        desc: infos.desc,
        price: infos.price,
        image: infos.image
    })

    product.save()
        .then(response => {
            res.json({
                message: "Add Successfully!"
            })
        })
        .catch(error => {
            res.json({
                message: "An error Occured!"
            })
        })
}

const updateProduct = (req, res, next) => {
    const infos = req.body
    let updateData = {
        name: infos.name,
        desc: infos.desc,
        price: infos.price,
        image: infos.image
    }
    Product.findByIdAndUpdate(infos.productID, { $set: updateData })
        .then(response => {
            res.json({
                message: "Updated Successfully!"
            })
        })
        .catch(error => {
            res.json({
                message: "An error Occured!"
            })
        })
}

const deleteProduct = (req, res, next) => {
    const infos = req.body
    Product.findByIdAndDelete(infos.productID)
        .then(response => {
            res.json({
                message: "Deleted Successfully!"
            })
        })
        .catch(error => {
            res.json({
                message: "An error Occured!"
            })
        })
}

module.exports = {
    getAllProduct, getDetailProduct, addNewProduct, updateProduct, deleteProduct
}