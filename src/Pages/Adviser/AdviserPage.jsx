import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClassroomCard from '../../Components/Card/Adviser/AdviserClassroomCard';
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
import addbtn from '../../Assets/icons/plus.png'; 
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
    adviserID: user ? user.userID : undefined,
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
      adviserID: user ? user.userID : undefined
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
            background: '#fff', 
            color: '#333333',
            backgroundImage: `url(${vector})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '95vh'
         }}>
      <AdviserNavbar />
      <div 
        className="container d-flex align-items-center justify-content-center"> 
          <div 
            className="shadow-lg "
            style={{ 
                background: 'rgba(255, 255, 255, 0.95)', 
                color: '#333', 
                width: '2000px', 
                overflow: 'hidden',
                height: '82vh', 
                borderRadius: '20px'
            }}
          > 
        <div className='d-flex align-items-center justify-content-between'
          style={{
            fontWeight: 'bold',
            backgroundColor: '#b9ff66',
            height: '50px',
            fontSize: '22px',
            padding: '0 20px',
            borderBottom: '1px solid #ddd',
            color: '#fff'
          }}>
        <h4 className="m-0">Active Classrooms</h4>
        <Button
          onClick={handleClickOpen} 
          style={{ background: 'none', color: '#111' }}
        >
          <OverlayTrigger placement="bottom" overlay={<Tooltip id="profile-tooltip">Create Classrooms</Tooltip>}>
            <img
              src={addbtn}
              alt="Create Classrooms"
              style={{ width: '35px', height: '35px', borderRadius: '50%' }}
            /> 
          </OverlayTrigger>
        </Button>
      </div> 
        <div style={{ gap: '20px', marginTop: '0px', overflowY: 'auto', maxHeight: '70vh'}}>
        {classrooms.length === 0 ? (
          <p className="text-center mt-4">No active classrooms found.</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
              {classrooms.map((classroom) => (
                <ClassroomCard 
                  key={classroom.classId}
                  classroom={classroom}
                />
              ))}
            </div>
        )}
        </div>
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
    </div>
  );
}
