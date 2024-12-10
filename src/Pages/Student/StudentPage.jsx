import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClassroomCard from '../../Components/Card/Student/StudentClassroomCard'; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';   
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import SearchIcon from '@mui/icons-material/Search'; 
import UserNavbar from '../../Components/Navbar/UserNavbar';

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
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchClassrooms = async () => {
      if (user && user.userID) {
        try {
          const response = await fetch(`http://localhost:8080/classroom/getClassrooms?userID=${user.userID}`,{
            method:'GET', 
            headers: {
              'Content-Type': 'application/json',
            },
          } );
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            setClassrooms(data);
          } else {
            toast.error("No classrooms found.")
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
      <div className="m-0 vh-100" style={{ backgroundColor:'#fff', height:'95vh'}}>  
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
              Enroll
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
            
          <div style={{ width: '100%'}}> 
            <h2>Classroom</h2>
            {classrooms.length === 0 ? (
              <p>No active classrooms found.</p>
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
  );
}



