import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import StudentsList from '../../Components/Card/Adviser/StudentsListCard';

const StudentsModal = ({ show, handleClose, students }) => (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Enrolled Students</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {students.length === 0 ? (
                <p>No students enrolled in this classroom.</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start' }}>
                    {students.map((student) => (
                        <div key={student.userID} style={{ padding: '10px', borderRadius: '8px', margin: '10px' }}>
                            <StudentsList
                                fullName={`${student.user.firstname} ${student.user.lastname}`}
                                userName={student.user.username}
                            />
                        </div>
                    ))}
                </div>
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
    </Modal>
);

export default StudentsModal;
