import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClassroomCard from '../../Components/Card/ClassroomCard';
import Button from '@mui/material/Button'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';    
import CreateClassroomDialog from '../../Components/Dialogs/Adviser/AdviserCreateClassroomDialog';
import UserNavbar from '../../Components/Navbar/UserNavbar';
import img5 from '../../Assets/img/img5.png'; 
import AdviserBackgroundPage from '../../Components/Backgound/AdviserBackgroundPage';
import { BASE_URL } from '../../Global_vars/Urls';
import { Box } from '@mui/material';
import { Container, Row } from 'react-bootstrap';

export default function AdviserPage() {
  const navigate = useNavigate();
  const [classrooms, setClassrooms] = useState([]);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    subjectName: '',
    subjectCode: '',
    section: '', 
    classCode: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      console.log('User is logged in:', storedUser);
      setUser(storedUser);
    } else {
      console.log('No user is logged in');
      navigate('/');
    }
  }, [navigate]); 

  useEffect(() => {
    const fetchClassrooms = async () => {
      if (user && user.userID) {
        try {
          const response = await fetch(`${BASE_URL}/classroom/getClassrooms?userID=${user.userID}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched classrooms:', data);
            setClassrooms(data);
          } else {
            console.error('Failed to fetch classrooms:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching classrooms:', error);
        }
      }
    };
    fetchClassrooms();
  }, [user]);

  const handleClickOpen = () => {
    const newClassCode = generateClassCode();  
    setFormData(prevValues => ({
      ...prevValues,
      classCode: newClassCode  
    }));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ subjectName: '', subjectCode: '', section: '', classCode: '' }); 
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const generateClassCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleCreateClassroom = async () => {
    setLoading(true);
    
    const classroomData = {
      subjectName: formData.subjectName,
      subjectCode: formData.subjectCode,
      section: formData.section,
      classCode: formData.classCode,  
      adviserID: user ? user.userID : undefined,
      mentorable: formData.requiresMentor,
    };

    console.log("Classroom Data to be sent:", classroomData);
    

    try {
      const response = await fetch(`${BASE_URL}/classroom/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classroomData),
      });

      if (response.ok) {
        toast.success('Classroom created successfully!');
        console.log(response)
        setClassrooms(prev => [...prev, classroomData]);  
        handleClose();
      } else {
        toast.error('Failed to create classroom. Please try again.');
      }
    } catch (error) {
      console.error('Error creating classroom:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen relative overflow-auto items-center gap-4 pb-4">
      {/* Background Grid */}
      <AdviserBackgroundPage /> 

      <UserNavbar/> 
      

      <div style={{ marginTop: '5px', height:'150px', width: '88%', backgroundColor: '#7d57fc', borderRadius: '15px', display:'flex'}}>
        <div style={{color: '#fff',flex:1, justifyContent:'center', display:'flex',flexDirection:'column', paddingLeft:'1em'}}>
          <p style={{fontSize:'clamp(1.5rem, 2vw + 0.5rem, 2.5rem)', fontWeight:'bold'}}> Hello, Teacher {user ? user.firstname : 'Guest'} !</p>
          <h6> It's nice to see you here..</h6>
        </div>
        
        <div style={{ flex:1, display:'flex', alignItems:'center',justifyContent:'end', position:'relative', paddingRight:'1em'}}>
          <Button onClick={handleClickOpen} variant="contained" style={{ background: '#b9ff66', color: '#000', textTransform: 'none', fontWeight: 'bold' }} > 
            Create Classroom
          </Button>
        </div>
        <Box sx={{flex:1, position:'relative', alignItems:'center', display: {xs:'none',sm:'none',md:'flex'}}} style={{position:'relative', flex:1, alignItems:'center'}}>
          <img src={img5} alt="illustration" style={{height:'200%', position:'absolute', bottom:'-20%', left:50, zIndex:0 }} /> 
        </Box>
      </div>


      <div style={{ padding: '25px', width: '88%', backgroundColor: '#fff', borderRadius: '15px', flexGrow:1}}>
        <p style={{fontWeight: 'bold', fontSize:'clamp(2rem, 2.5vw + 0.5rem, 3.3rem)'}} >Advisory</p>

        <Container fluid>  
          {classrooms.length === 0 ? (
            <p className="text-center ">No active classrooms found.</p>
          ) : (
            <Row className='g-5'>
              {classrooms.map((classroom) => (
                <ClassroomCard 
                  key={classroom.classId}
                  classroom={classroom}
                />
              ))}
            </Row>
          )}
        </Container>
      </div>

 

      <CreateClassroomDialog
          open={open}
          formData={formData}
          loading={loading}
          onClose={handleClose}
          onChange={handleInputChange}
          onCreate={handleCreateClassroom}
        /> 
      </div> 
  );
}
