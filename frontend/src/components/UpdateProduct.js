import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const UpdateProduct = ({ product, updateProduct, fetchProducts }) => {
    const [showModal, setShowModal] = useState(false)

    // State variable to store the updated product data
    const [updatedProductData, setUpdatedProductData] = useState({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category.join(', '),
    })

    // Function to handle opening the modal
    const handleOpenModal = () => {
        setShowModal(true)
    }

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setShowModal(false)
    }

    // Function to handle input change in the form fields
    const handleInputChange = (event) => {
        const { name, value } = event.target
        if (name === 'category') {
            const categoryArray = value
                .split(',')
                .map((category) => category.trim())
            setUpdatedProductData({
                ...updatedProductData,
                [name]: categoryArray,
            })
        } else {
            setUpdatedProductData({ ...updatedProductData, [name]: value })
        }
    }

    // Function to handle the update of the product
    const handleUpdate = (event) => {
        event.preventDefault()
        const updatedProduct = {
            ...product,
            title: updatedProductData.title,
            description: updatedProductData.description,
            price: updatedProductData.price,
            category: String(updatedProductData.category)
                .split(',')
                .map((category) => category.trim()),
        }
        updateProduct(updatedProduct)
        handleCloseModal()
    }

    return (
        <div>
            <Button variant="outline-success" onClick={handleOpenModal}>
                Update
            </Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdate}>
                        <div className="row mb-3">
                            <div className="col-md-3">
                                <label htmlFor="title">Title:</label>
                            </div>
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    name="title"
                                    value={updatedProductData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-3">
                                <label htmlFor="description">
                                    Description:
                                </label>
                            </div>
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    name="description"
                                    value={updatedProductData.description}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-3">
                                <label htmlFor="price">Price:</label>
                            </div>
                            <div className="col-md-9">
                                <input
                                    type="number"
                                    name="price"
                                    value={updatedProductData.price}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-3">
                                <label htmlFor="category">Category:</label>
                            </div>
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    name="category"
                                    value={updatedProductData.category}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                                <small className="form-text">
                                    Enter categories separated by commas (e.g.,
                                    category1, category2)
                                </small>
                            </div>
                        </div>

                        <Button variant="success" type="submit">
                            Update
                        </Button>
                        <Button
                            variant="outline-secondary"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default UpdateProduct
