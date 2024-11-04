import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClassroomCard from '../../Components/Card/StudentClassroomCard';
import vector from '../../Assets/Vector.png'
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
import { Col, Row } from 'react-bootstrap';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Container } from '@mui/material';

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
          const response = await fetch(`http://localhost:8080/classroom/getClassroomsOfStudent?studentID=${user.userID}`,{
            method:'GET',
            // headers:{
            //   "Authorization":`Bearer ${localStorage.getItem("token")}`
            // }
          } );
          if (response.ok) {
            const data = await response.json();
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
        body: JSON.stringify({ 
          "classCode":classCode,
          "userID":user?user.userID:undefined,
        }),  
      });

      if (response.ok) {
        const data = await response.json();
        setClassrooms([...classrooms, data]);
        toast.success('Enrolled successfully!');
        handleClose();
      } else {
        response.text().then(message=>{
          toast.error(message)
        })
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
      <div
           style={{ 
              backgroundImage:`url(${vector})`,
              backgroundPosition:'center',
              backgroundSize:'cover',
              backgroundColor:'#b9ff66',
              minHeight:'100dvh',
           }}> 

           <div>
            <StudentNavbar />
              <div className="mx-4" style={{ height: '100%', borderRadius: '20px', padding: '10px', overflow:'auto', backgroundColor:'white', color:'gray',}}> 
                <div style={{display:'flex', justifyContent:'space-between', padding:'10px'}}>
                  <h2>Active Classes</h2> 
                  <Button className='shadow-sm' onClick={handleClickOpen} size='medium' variant='outlined' style={{color:'black',border:'solid 1px rgba(0,0,0,0.09)'}} startIcon={<MeetingRoomIcon/>}>Enroll</Button>
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
      </div>
    </>
  );
}
