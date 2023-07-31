const productModel = require('../models/productModel')

//post a single product
module.exports.postProducts = async (req, res) => {
    try {
        const product = await productModel.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

//get all products
module.exports.getProducts = async (req, res) => {
    try {
        const product = await productModel.find()
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get one product by title
module.exports.getProductByTitle = async (req, res) => {
    try {
        const { title } = req.params
        const product = await productModel.find({ title: title })
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get one product by category
module.exports.getProductByCategory = async (req, res) => {
    try {
        const { category } = req.params
        const product = await productModel.find({ category: category })
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//update a product data
module.exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await productModel.findByIdAndUpdate(id, req.body)
        //verification on product update
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.status(200).json({ message: 'Product updated successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//delete a product
module.exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await productModel.findByIdAndDelete(id)
        //verification on product delete
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
