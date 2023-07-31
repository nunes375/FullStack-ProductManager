const { Router } = require('express')

// Importing functions from the productController module
const {
    getProducts,
    postProducts,
    getProductByTitle,
    getProductByCategory,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController')

const router = Router()

// GET route to fetch all products
router.get('/products', getProducts)

// GET route to fetch products by category
router.get('/products/category/:category', getProductByCategory)

// GET route to fetch products by title
router.get('/products/title/:title', getProductByTitle)

// POST route to create a new product
router.post('/addproducts', postProducts)

// PUT route to update a product by ID
router.put('/updateproducts/:id', updateProduct)

// DELETE route to delete a product by ID
router.delete('/deleteproducts/:id', deleteProduct)

module.exports = router
