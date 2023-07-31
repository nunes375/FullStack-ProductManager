import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProductTable from './components/Table'
import AddProduct from './components/AddProduct'
import SearchBar from './components/SearchBar'

const App = () => {
    // State variables to store the products
    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])

    const handleAddProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct])
    }

    const fetchProducts = () => {
        // Make a GET request to fetch products from the server
        fetch('http://localhost:5000/api/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data)
                setAllProducts(data)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between">
                <h1>Product Catalog</h1>
                <AddProduct
                    handleAddProduct={handleAddProduct}
                    fetchProducts={fetchProducts}
                />
                <SearchBar
                    products={products}
                    setProducts={setProducts}
                    allProducts={allProducts}
                />
                <h5>Smartex Technical Test - Rui Nunes</h5>
            </div>
            <ProductTable
                products={products}
                setProducts={setProducts}
                setAllProducts={setAllProducts}
                fetchProducts={fetchProducts}
            />
        </div>
    )
}

export default App
