import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditClassroomModal = ({ show, handleClose, classroomDetails, setClassroomDetails, saveChanges }) => (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Edit Classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="subjectCode">
                    <Form.Label>Subject Code</Form.Label>
                    <Form.Control
                        type="text"
                        value={classroomDetails.subjectCode}
                        onChange={(e) => setClassroomDetails({ ...classroomDetails, subjectCode: e.target.value })}
                    />
                </Form.Group>
                <Form.Group controlId="subjectName">
                    <Form.Label>Subject Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={classroomDetails.subjectName}
                        onChange={(e) => setClassroomDetails({ ...classroomDetails, subjectName: e.target.value })}
                    />
                </Form.Group>
                <Form.Group controlId="section">
                    <Form.Label>Section</Form.Label>
                    <Form.Control
                        type="text"
                        value={classroomDetails.section}
                        onChange={(e) => setClassroomDetails({ ...classroomDetails, section: e.target.value })}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" onClick={saveChanges}>Save Changes</Button>
        </Modal.Footer>
    </Modal>
);

export default EditClassroomModal;
