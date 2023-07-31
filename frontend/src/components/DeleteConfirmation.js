import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const DeleteConfirmation = ({ product, deleteProduct, handleClose }) => {
    const handleDelete = () => {
        deleteProduct(product._id)
        handleClose()
    }

    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete the product:{' '}
                <strong>{product.title}</strong>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteConfirmation
