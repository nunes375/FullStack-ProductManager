import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'
import 'bootstrap/dist/css/bootstrap.min.css'
import UpdateProduct from './UpdateProduct'
import DeleteConfirmation from './DeleteConfirmation'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

function ProductTable({
    products,
    setProducts,
    setAllProducts,
    fetchProducts,
}) {
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    // Function to delete a product
    const deleteProduct = (productId) => {
        fetch(`http://localhost:5000/api/deleteproducts/${productId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data if needed
                console.log('Product deleted:', data)
                fetchProducts() // Update the products state after deleting a product

                // Update the products state to remove the deleted product
                const updatedProducts = products.filter(
                    (product) => product._id !== productId
                )
                setProducts(updatedProducts)
                setAllProducts(updatedProducts)
            })
            .catch((error) => {
                // Handle any error that occurs during the delete operation
                console.error('Error deleting product:', error)
            })
            .finally(() => {
                setSelectedProduct(null)
                setShowConfirmation(false)
            })
    }

    // Function to handle updating a product
    const handleUpdateProduct = (updatedProduct) => {
        fetch(
            `http://localhost:5000/api/updateproducts/${updatedProduct._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data if needed
                console.log('Product updated:', data)
                fetchProducts() // Update the products state after updating the product
            })
            .catch((error) => {
                console.error('Error updating product:', error)
            })
    }

    // Function to handle showing the delete confirmation dialog
    const handleDeleteConfirmation = (product) => {
        setSelectedProduct(product)
        setShowConfirmation(true)
    }

    const handleCloseConfirmation = () => {
        setSelectedProduct(null)
        setShowConfirmation(false)
    }

    // Fetch products from the server
    useEffect(() => {
        fetchProducts()
    }, [])

    // Format categories for display
    const formatCategories = (categories) => {
        return categories.join(', ')
    }

    // Handle the change in rows per page
    const handleRowsPerPageChange = (eventKey) => {
        const value = Number(eventKey)
        setRowsPerPage(value)
        setCurrentPage(1)
    }

    // Calculate the index of the last and first product in the current page
    const indexOfLastProduct = currentPage * rowsPerPage
    const indexOfFirstProduct = indexOfLastProduct - rowsPerPage
    const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    )

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price(€)</th>
                        <th>Category</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product) => (
                        <tr key={product._id}>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{formatCategories(product.category)}</td>
                            <td>{product.createdAt}</td>
                            <td>{product.updatedAt}</td>
                            <td>
                                <UpdateProduct
                                    product={product}
                                    updateProduct={handleUpdateProduct}
                                    fetchProducts={fetchProducts}
                                />
                                <Button
                                    variant="outline-danger"
                                    onClick={() =>
                                        handleDeleteConfirmation(product)
                                    }
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <td className="MuiTablePagination-root">
                            <div className="MuiTablePagination-toolbar">
                                <div className="MuiTablePagination-spacer"></div>
                                <div className="MuiTablePagination-actions">
                                    <DropdownButton
                                        id="dropdown-basic-button"
                                        title="Products per page:"
                                    >
                                        <Dropdown.Item
                                            onClick={() =>
                                                handleRowsPerPageChange(5)
                                            }
                                            eventKey={5}
                                        >
                                            5
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                handleRowsPerPageChange(10)
                                            }
                                            eventKey={10}
                                        >
                                            10
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                handleRowsPerPageChange(15)
                                            }
                                            eventKey={15}
                                        >
                                            15
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                handleRowsPerPageChange(
                                                    products.length
                                                )
                                            }
                                            eventKey={products.length}
                                        >
                                            All
                                        </Dropdown.Item>
                                    </DropdownButton>
                                    <p className="MuiTablePagination-displayedRows">{`${
                                        indexOfFirstProduct + 1
                                    }-${Math.min(
                                        indexOfLastProduct,
                                        products.length
                                    )} of ${products.length}`}</p>
                                </div>
                                <div className="MuiTablePagination-actions">
                                    <Pagination>
                                        <Pagination.First
                                            disabled={currentPage === 1}
                                            aria-label="Go to first page"
                                            title="Go to first page"
                                            onClick={() => setCurrentPage(1)}
                                        />
                                        <Pagination.Prev
                                            disabled={currentPage === 1}
                                            aria-label="Go to previous page"
                                            title="Go to previous page"
                                            onClick={() =>
                                                setCurrentPage(currentPage - 1)
                                            }
                                        />
                                        <Pagination.Next
                                            disabled={
                                                indexOfLastProduct >=
                                                products.length
                                            }
                                            aria-label="Go to next page"
                                            title="Go to next page"
                                            onClick={() =>
                                                setCurrentPage(currentPage + 1)
                                            }
                                        />
                                        <Pagination.Last
                                            disabled={
                                                indexOfLastProduct >=
                                                products.length
                                            }
                                            aria-label="Go to last page"
                                            title="Go to last page"
                                            onClick={() =>
                                                setCurrentPage(
                                                    Math.ceil(
                                                        products.length /
                                                            rowsPerPage
                                                    )
                                                )
                                            }
                                        />
                                    </Pagination>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>

            {selectedProduct && (
                <DeleteConfirmation
                    product={selectedProduct}
                    deleteProduct={deleteProduct}
                    handleClose={handleCloseConfirmation}
                />
            )}
        </div>
    )
}

export default ProductTable
