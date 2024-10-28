import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClassroomCard from '../../Components/Card/ClassroomCard';
import EnrollClassroomCard from '../../Components/Card/EnrollClassroomCard';
import vector from '../../Assets/Vector.png';
import StudentNavbar from '../../Components/Navbar/StudentNavbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';   
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StudentPage() {
  const navigate = useNavigate();
  const [classrooms, setClassrooms] = useState([]);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [classCode, setClassCode] = useState('');
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
    setOpen(true);
  };
 
  const handleClose = () => {
    setOpen(false);
    setClassCode(''); 
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
 
    try {
      const response = await fetch('http://localhost:8080/classroom/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ classCode, userID: user.userID }),  
      });

      if (response.ok) {
        toast.success('Enrolled successfully!');
        handleClose();
      } else {
        toast.error('Failed to enroll. Please try again.');
      }
    } catch (error) {
      console.error('Error enrolling:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="m-0 vh-100" 
           style={{ 
              background: '#ffffff', 
              color: '#333333',
              backgroundImage: `url(${vector})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
           }}> 

        <StudentNavbar />
        <div className="mx-5" style={{ background: 'rgba(238, 238, 238, 0.9)', color: '#333333', height: '100vh', borderRadius: '20px', padding: '25px'}}> 
          <h2>Active Classrooms</h2> 

          {user && (
            <p>User ID: {user.userID}</p>
          )}

          {classrooms.length === 0 ? (
            <p>No active classrooms found.</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {classrooms.map((classroom) => (
                <ClassroomCard 
                  key={classroom.classId}
                  subjectName={classroom.subjectName} 
                  style={{ margin: '0px' }} 
                />
              ))}
            </div>
          )}
 
          <div onClick={handleClickOpen}>
            <EnrollClassroomCard />
          </div>
 
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Enroll in Classroom</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Enter ClassCode"
                type="text"
                fullWidth
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">Cancel</Button>
              <Button onClick={handleSubmit} color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Enroll'}
              </Button>
            </DialogActions>
          </Dialog>

        </div> 
      </div>
    </>
  );
}
