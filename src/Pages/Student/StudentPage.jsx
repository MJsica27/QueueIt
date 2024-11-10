import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClassroomCard from '../../Components/Card/Student/StudentClassroomCard'; 
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
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'; 

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
      <div className="m-0 vh-100" style={{ backgroundColor:'#fff', height:'95vh' }}>  
        <StudentNavbar />
            <div   style={{ backgroundColor:'#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
              <div  
                style={{   
                    color: '#333', 
                    width: '100dvw', 
                    overflow: 'hidden',
                    height: '82vh',
                    backgroundColor:'rgba(0,0,0,0.03)',
                    margin: '10px 78px 0px 78px',  
                    borderRadius: '5px',
                }}> 
                <div className='d-flex align-items-center justify-content-between'
                  style={{
                    fontWeight: 'bold', 
                    height: '50px',
                    fontSize: '22px',
                    padding: '0 20px', 
                    margin: '10px ',  
                    color: '#000'
                  }}>
                  <h4 className="m-0">Active Classes</h4> 
                  <Button  onClick={handleClickOpen} variant="contained" style={{ background: '#b9ff66', color: '#000', textTransform: 'none', fontWeight: 'bold'   }} > 
                    Eroll
                  </Button>
                </div>

                <div  style={{  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {classrooms.length === 0 ? (
                    <p>No active classrooms found.</p>
                  ) : (
                    
                      <div style={{ backgroundColor:'#ff000', display:'flex', flexWrap:'wrap', justifyContent:'start'}}>
                        {classrooms.map((classroom) => (
                            <ClassroomCard 
                              key={classroom.classId}
                              classroom={classroom}
                              style={{ margin: '0px' }} 
                              />
                        ))}
                      </div>
                    
                  )}
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
      </div> 
  );
}
