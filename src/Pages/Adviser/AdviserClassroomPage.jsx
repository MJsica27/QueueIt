import React, { useEffect, useState } from 'react';
import vector from '../../Assets/Vector.png';
import { Stack, Modal, Button, Form } from 'react-bootstrap'; 
import AdviserNavbar from '../../Components/Navbar/AdviserNavbar';
import AdviserGroupCard from '../../Components/Card/Adviser/AdviserGroupCard';
import { useLocation } from 'react-router-dom';  
import { useNavigate } from 'react-router-dom';
import backIcon from '../../Assets/icons/arrow.png'; 
import OptionsMenu from '../../Components/Card/Adviser/OptionsMenu'; 
import StudentsList from '../../Components/Card/Adviser/StudentsListCard';
import { toast } from 'react-toastify';

const AdviserClassroomPage = () => {
    const location = useLocation();
    const classroom = location.state;
    const [groups, setGroups] = useState([]); 
    const [students, setStudents] = useState([]);
    const navigate = useNavigate(); 
    const [showStudentsModal, setShowStudentsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [classroomDetails, setClassroomDetails] = useState({
        subjectCode: classroom.subjectCode,
        subjectName: classroom.subjectName,
        section: classroom.section
    });

    useEffect(() => {
        const fetchGroups = async () => {
            if (classroom && classroom.classID) {
                try {
                    const response = await fetch(`http://localhost:8080/group/getAllGivenClassroom?classroomID=${classroom.classID}`);
                    if (response.ok) {
                        const data = await response.json();
                        setGroups(data);
                    } else {
                        console.error('Failed to fetch groups:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching groups:', error);
                }
            }
        };
        fetchGroups();
    }, [classroom.classID]);

    const handleAction = async (action) => {
        if (action === 'View Enrolled Students') {
            try {
                const response = await fetch(`http://localhost:8080/classroom/getStudents?classID=${classroom.classID}`);
                if (response.ok) {
                    const data = await response.json();
                    setStudents(data);
                    setShowStudentsModal(true);  // Show modal when students are loaded
                } else {
                    console.error('Failed to fetch students:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        } else if (action === 'Edit Classroom') {
            setShowEditModal(true);  // Show the edit modal
        } else if (action === 'Delete Classroom') {
            setShowDeleteModal(true);  // Show delete confirmation modal
        }
    };

    const handleCloseStudentsModal = () => setShowStudentsModal(false);
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    const handleSaveChanges = async () => {
        console.log("Updating classroom with data:", classroomDetails); 
        
        try {
            const response = await fetch(`http://localhost:8080/classroom/editClassroom`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    classID: classroom.classID,
                    adviserID: classroom.adviserID,
                    subjectCode: classroomDetails.subjectCode,
                    subjectName: classroomDetails.subjectName,
                    section: classroomDetails.section
                })
            });
    
            console.log("Response status:", response.status); // Log status code
    
            if (response.ok) {
                setClassroomDetails(prev => ({ ...prev, ...classroomDetails }));
                setShowEditModal(false);
                toast.success('Update classroom successful');
            } else {
                const errorText = await response.text();
                console.error("Failed to update classroom:", errorText);
                toast.error('Failed to update classroom.');
            }
        } catch (error) {
            console.error("Error updating classroom:", error);
            toast.error('Failed to update classroom.');
        }
    };
    
    const handleDeleteClassroom = async () => {
        try {
            const response = await fetch(`http://localhost:8080/classroom/deleteClassroom?classID=${classroom.classID}&userID=${classroom.adviserID}`, {
                method: 'POST',
            });

            if (response.ok) { 
                setShowDeleteModal(false); 
                navigate('/adviserhomepage');
                toast.success('Delete classroom successful');
            } else {
                toast.error('Failed to delete classroom.');
            }
        } catch (error) {
            toast.error('Error deleting classroom:', error);
        }
    };

    return (
        <div
            className="m-0 vh-100"
            style={{
                backgroundImage: `url(${vector})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundColor: '#fff',
                height: '95vh'
            }}
        >
            <AdviserNavbar />
            <div className="container d-flex align-items-center justify-content-center"> 
                <div
                    className="shadow-lg"
                    style={{ 
                        background: 'rgba(255, 255, 255, 0.95)', 
                        color: '#333', 
                        maxWidth: '2000px', 
                        width: '2500px', 
                        overflow: 'hidden',
                        height: '82vh', 
                        borderRadius: '20px 20px 0 0',  
                    }}
                >  
                    <div className='d-flex align-items-center'
                        style={{
                            fontWeight: 'bold',
                            backgroundColor: '#abf500',
                            color: '#fff',
                            height: '50px',
                            width: '100%',
                            fontSize: '20px',
                            padding: '0 20px',
                            borderRadius: '20px 20px 0 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    > 
                        <span style={{ display: 'inline-flex', alignItems: 'center', }} >
                            <img src={backIcon} alt="back" style={{ width: '25px', height: '25px', marginRight: '10px' }} />
                            {classroomDetails.subjectName} - {classroomDetails.section}
                            <OptionsMenu onAction={handleAction} color="white" />  
                        </span>

                        <span style={{ fontWeight: 'normal' }}>Classcode: {classroom.classCode}</span>
                    </div>

                    <Stack direction="column" style={{ display: 'flex', alignItems: 'flex-start', margin: '35px' }} gap={3} >  
                        {groups.length === 0 ? (
                            <p>No active groups found.</p>
                        ) : (
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start' }}>
                                {groups.map((group) => (
                                    <AdviserGroupCard
                                        key={group.groupID}
                                        group={group}
                                    />
                                ))}
                            </div>
                        )}
                    </Stack>
                </div>
            </div> 

            {/* Modal for displaying enrolled students */}
            <Modal show={showStudentsModal} onHide={handleCloseStudentsModal} centered>
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
                    <Button variant="secondary" onClick={handleCloseStudentsModal}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for editing classroom */}
            <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
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
                    <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for delete confirmation */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Classroom</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this classroom? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteClassroom}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdviserClassroomPage;
