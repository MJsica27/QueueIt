import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClassroomCard from '../../Components/Card/Adviser/AdviserClassroomCard';
import Button from '@mui/material/Button'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   
import SearchIcon from '@mui/icons-material/Search'; 
import CreateClassroomDialog from '../../Components/Dialogs/Adviser/AdviserCreateClassroomDialog';
import UserNavbar from '../../Components/Navbar/UserNavbar';

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

  const userData = {
    subjectName: formData.subjectName,
    subjectCode: formData.subjectCode,
    section: formData.section,
    adviserID: user ? user.userID : undefined,
    classCode: formData.classCode
  };

  useEffect(() => {
    const fetchClassrooms = async () => {
      if (user && user.userID) {
        try {
          const response = await fetch(`http://localhost:8080/classroom/getClassrooms?userID=${user.userID}`);
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
      const response = await fetch('http://localhost:8080/classroom/create', {
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
    <div className="m-0 vh-100" style={{ background: '#fff', color: '#333333', height: '95vh' }}>
      <UserNavbar/>
        <div  
          style={{    
            background: '#fff', 
            color: '#333', 
            width: 'auto', 
            overflow: 'hidden',
            height: '90vh',  
            overflowY:'auto'
          }}
        > 
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ 
              margin: '20px 20px 10px 20px',
              backgroundColor:'rgba(0,0,0,0.03)',
              borderRadius: '5px',
              fontWeight: 'bold',
              height: '80px',
              fontSize: '22px',
              padding: '0 20px',
              width: '1400px', 
            }} >
            <div style={{ position: 'relative', width: '70%' }}>
              <input 
                  type="text" 
                  placeholder="Search Classrooms" 
                  style={{ 
                      width: '100%', 
                      padding: '8px', 
                      fontSize: '16px', 
                      border: '1px solid #ccc', 
                      borderRadius: '4px', 
                      boxShadow: '0px 0px 10px rgba(182, 255, 102, 1)', 
                      paddingRight: '30px'  
                  }} 
              />
              <SearchIcon  style={{  position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',  color: '#ccc' }}  />
            </div>
            <Button  onClick={handleClickOpen} variant="contained" style={{ background: '#b9ff66', color: '#000', textTransform: 'none', fontWeight: 'bold'   }} > 
              Create
            </Button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div
            className="d-flex justify-content-between"
            style={{
              margin: '20px 20px 10px 20px',
              borderRadius: '5px',
              fontWeight: 'bold',
              fontSize: '22px', 
              width: '1400px',
            }}
          >
            
            <div style={{ width: '100%', margin: '20px 0px 0px 20px ' }}> <h2>Advisory</h2>
              {classrooms.length === 0 ? (
                <p className="text-center mt-4">No active classrooms found.</p>
              ) : (
                <div style={{ backgroundColor:'#ff000', display:'flex', flexWrap:'wrap', gap:'5%'}}>
                  {classrooms.map((classroom) => (
                    <ClassroomCard 
                      key={classroom.classId}
                      classroom={classroom}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
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
      </div> 
  );
}
