import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const AddProduct = ({ handleAddProduct, fetchProducts }) => {
    // State variables for the modal and product data
    const [showModal, setShowModal] = useState(false)
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        price: '',
        category: [],
    })

    // Function to open the modal
    const handleOpenModal = () => {
        setShowModal(true)
    }

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        if (name === 'category') {
            // Splitting category values into an array
            const categoryArray = value
                .split(',')
                .map((category) => category.trim())
            setProductData({ ...productData, [name]: categoryArray })
        } else {
            setProductData({ ...productData, [name]: value })
        }
    }

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault()
        addProduct(productData)
        setProductData({
            title: '',
            description: '',
            price: '',
            category: [],
        })
        handleCloseModal()
    }

    const addProduct = (newProduct) => {
        // Make a POST request to the server to insert the new product
        fetch('http://localhost:5000/api/addproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data if needed
                console.log('Product added:', data)
                handleAddProduct(data) // Add the new product
                fetchProducts() // Update the products state after adding a product
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    return (
        <div>
            <Button variant="primary" onClick={handleOpenModal}>
                Add Product
            </Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="title">Title:</label>
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    name="title"
                                    value={productData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="description">
                                    Description:
                                </label>
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    name="description"
                                    value={productData.description}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="price">Price:</label>
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="number"
                                    name="price"
                                    value={productData.price}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="category">Category:</label>
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    name="category"
                                    value={productData.category}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                                <small className="form-text">
                                    Enter categories separated by commas (e.g.,
                                    category1, category2)
                                </small>
                            </div>
                        </div>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddProduct
