import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteClassroomModal = ({ show, handleClose, handleDelete }) => (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Delete Classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you want to delete this classroom?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete Classroom</Button>
        </Modal.Footer>
    </Modal>
);

export default DeleteClassroomModal;
