import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClassroomCard from '../../Components/Card/Adviser/AdviserClassroomCard';
import Button from '@mui/material/Button'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';    
import CreateClassroomDialog from '../../Components/Dialogs/Adviser/AdviserCreateClassroomDialog';
import UserNavbar from '../../Components/Navbar/UserNavbar';
import img5 from '../../Assets/img/img5.png'; 
import AdviserBackgroundPage from '../../Components/Backgound.jsx/AdviserBackgroundPage';

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
    <div className="flex flex-col h-screen relative overflow-hidden items-center gap-4">
      {/* Background Grid */}
      <AdviserBackgroundPage /> 

      <UserNavbar/> 
      

      <div style={{ marginTop: '5px', height:'150px', width: '88%', backgroundColor: '#7d57fc', borderRadius: '15px' }}>

        <div style={{margin: '30px 0 0 50px', color: '#fff'}}>
          <h1> Hello, Teacher {user ? user.firstname : 'Guest'} !</h1>
          <h6> It's nice to see you here..</h6>
        </div>
        
        <Button className="createClassroomBtn" onClick={handleClickOpen} variant="contained" style={{ background: '#b9ff66', color: '#000', textTransform: 'none', fontWeight: 'bold', margin: '-150px 0 0 750px' }} > 
          Create Classroom
        </Button>
        <img src={img5} alt="illustration" style={{height:'250px', marginTop: '-208px', marginLeft: '970px' }} />   

      </div>


      <div style={{ padding: '25px', height:'450px', width: '88%', backgroundColor: '#fff', border:'1px solid black', borderRadius: '15px'}}>
        <h2 style={{fontWeight: 'bold'}} >Advisory</h2>

        <div>  
          {classrooms.length === 0 ? (
            <p className="text-center ">No active classrooms found.</p>
          ) : (
            <div style={{ backgroundColor:'#fff', display:'flex', flexWrap:'wrap', rowGap: '0px', columnGap: '60px',   marginLeft: '50px', maxHeight: '350px', overflowY: 'auto', }}>
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
