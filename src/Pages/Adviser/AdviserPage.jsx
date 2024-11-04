import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClassroomCard from '../../Components/Card/ClassroomCard';
import AdviserNavbar from '../../Components/Navbar/AdviserNavbar';
import vector from '../../Assets/Vector.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';   
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      navigate('/login');
    }
  }, [navigate]);

  const userData = {
    subjectName: formData.subjectName,
    subjectCode: formData.subjectCode,
    section: formData.section,
    adviserID: user?user.userID:undefined,
    classCode: formData.classCode
  };

  useEffect(() => {
    const fetchClassrooms = async () => {
      if (user && user.userID) {
        try {
          const response = await fetch(`http://localhost:8080/classroom/ClassroomsByAdviser?userID=${user.userID}`);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevValues => ({ ...prevValues, [name]: value }));
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
      adviserID: user?user.userID:undefined
    };

    try {
      const response = await fetch('http://localhost:8080/classroom/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success('Classroom created successfully!');
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
    <div className="m-0 vh-100" 
         style={{ 
            background: '#b9ff66', 
            color: '#333333',
            backgroundImage: `url(${vector})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
         }}>
      <AdviserNavbar />
      <div className="mx-5" style={{ background: 'rgba(238, 238, 238, 0.9)', color: '#333333', height: '100vh', borderRadius: '20px', padding: '25px 50px 25px 50px'}}> 
        <div className='mb-10 d-flex align-items-center justify-content-between'>
          <h2>Active Classrooms</h2>
          <Button
            onClick={handleClickOpen}  
            variant="contained"
            style={{ background: '#000000', color: '#ffffff', marginTop: '20px' }}
          >
            Create Classroom
          </Button>
        </div>  

        {classrooms.length === 0 ? (
                  <p>No active classrooms found.</p>
                ) : (
                  
                    <div style={{display:'flex', flexWrap:'wrap', justifyContent:'start'}}>
                      {classrooms.map((classroom) => (
                          <ClassroomCard 
                            key={classroom.classId}
                            classroom={classroom}
                            style={{ margin: '0px' }} 
                            />
                      ))}
          </div>
        )}
 
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Classroom</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="subjectName"
              label="Subject Name"
              fullWidth
              value={formData.subjectName}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="subjectCode"
              label="Subject Code"
              fullWidth
              value={formData.subjectCode}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="section"
              label="Section"
              fullWidth
              value={formData.section}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="classCode"
              label="Class Code"
              fullWidth
              value={formData.classCode}
              InputProps={{ readOnly: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">Cancel</Button>
            <Button onClick={handleCreateClassroom} color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </div> 
    </div>
  );
}
