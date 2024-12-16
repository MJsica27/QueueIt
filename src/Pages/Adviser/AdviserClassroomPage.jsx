import React, { useEffect, useState } from 'react'; 
import { Container, Row, Col } from 'react-bootstrap'; 
import AdviserGroupCard from '../../Components/Card/Adviser/AdviserGroupCard';
import { useLocation } from 'react-router-dom';  
import { useNavigate } from 'react-router-dom'; 
import OptionsMenu from '../../Components/Card/Adviser/OptionsMenu';  
import { toast } from 'react-toastify';
import img6 from '../../Assets/img/img6.png'; 
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import BackButton from '../../Components/Buttons/BackButton';
import UserNavbar from '../../Components/Navbar/UserNavbar';
import AdviserBackgroundPage from '../../Components/Backgound.jsx/AdviserBackgroundPage';
import StudentsModal from '../../Components/Modal/StudentsModal';
import EditClassroomModal from '../../Components/Modal/EditClassroomModal';
import DeleteClassroomModal from '../../Components/Modal/DeleteClassroomModal';


const AdviserClassroomPage = () => {
    const location = useLocation();
    const classroom = location.state;
    const [groups, setGroups] = useState([]); 
    const [students, setStudents] = useState([]);
    const navigate = useNavigate(); 
    const [showStudentsModal, setShowStudentsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    // Initialize state from localStorage or fallback to initial classroom details
    const [classroomDetails, setClassroomDetails] = useState(
        JSON.parse(localStorage.getItem('classroomDetails')) || {
            subjectCode: classroom.subjectCode,
            subjectName: classroom.subjectName,
            section: classroom.section
        }
    );

    useEffect(() => {
        const fetchGroups = async () => {
          const user = JSON.parse(localStorage.getItem('user'));
          const token = localStorage.getItem('token');
          
          if (!user || !token) {
            navigate('/'); 
            return;
          }
    
          if (classroom && classroom.classID) {
            try {
              const response = await fetch(
                `http://localhost:8080/group/getAllGivenClassroom?classroomID=${classroom.classID}`,
                {
                  headers: {
                    // 'Authorization': `Bearer ${token}`,  
                    'Content-Type': 'application/json' 
                  },
                }
              );
              
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
      }, [classroom, navigate, setGroups]);

    const handleAction = async (action) => {
        if (action === 'View Enrolled Students') {
            try {
                const response = await fetch(`http://localhost:8080/classroom/getStudents?classID=${classroom.classID}`);
                if (response.ok) {
                    const data = await response.json();
                    setStudents(data);
                    setShowStudentsModal(true);     
                } else {
                    console.error('Failed to fetch students:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        } else if (action === 'Edit Classroom') {
            setShowEditModal(true);   
        } else if (action === 'Delete Classroom') {
            setShowDeleteModal(true);   
        }
    };

    const handleCloseStudentsModal = () => setShowStudentsModal(false);
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    const editClassroom = async () => {
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
            console.log("Response status:", response.status);  
    
            if (response.ok) {
                // Save the updated classroom details to localStorage
                localStorage.setItem('classroomDetails', JSON.stringify(classroomDetails));
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
        <div className="flex flex-col h-screen relative overflow-hidden items-center gap-4">

            <AdviserBackgroundPage /> 

            <UserNavbar/>

            <div style={{ marginTop: '5px', height:'750px', width: '88%', backgroundColor: '#7d57fc', borderRadius: '15px 15px 0 0',  }}>
 
                <div style={{ padding: '20px', height: '110px', width: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',  }} >
                     
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <BackButton />
                    </div>
 
                    <div style={{ color: 'white', textAlign: 'center', }} >
                        <div>{classroomDetails.subjectCode} - {classroomDetails.section}</div>
                        <div className="text-3xl font-bold">{classroomDetails.subjectName}</div>
                        <div>Classcode: {classroom.classCode}</div>
                    </div>
 
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="profile-tooltip">More options</Tooltip>}>
                            <div>
                                <OptionsMenu onAction={handleAction} color="white" />
                            </div>
                        </OverlayTrigger>
                    </div>
            </div>

            <Container>
                <Row>
                    <Col md={6}>
                        <img src={img6} alt="illustration" style={{height:'600px', marginTop: '-35px', marginLeft: '' }} />   
                    </Col>
                    <Col md={6}>
                        <div style={{  marginTop: '50px' }}>  
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
                        </div>
                    </Col>
                </Row>
            </Container> 
            
            </div>
            <StudentsModal
                show={showStudentsModal}
                handleClose={handleCloseStudentsModal}
                students={students}
            />
            <EditClassroomModal
                show={showEditModal}
                handleClose={handleCloseEditModal}
                classroomDetails={classroomDetails}
                setClassroomDetails={setClassroomDetails}
                saveChanges={editClassroom}
            />
            <DeleteClassroomModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                handleDelete={handleDeleteClassroom}
            />
        </div> 
    );
};

export default AdviserClassroomPage;
