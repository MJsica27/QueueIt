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
import UserNavbar from '../../Components/Navbar/UserNavbar';  
import img5 from '../../Assets/img/img5.png'; 
import AdviserBackgroundPage from '../../Components/Backgound.jsx/AdviserBackgroundPage';

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
    <div className="flex flex-col h-screen relative overflow-hidden items-center gap-4">  
        
      <AdviserBackgroundPage />

      <UserNavbar/>

      <div style={{ marginTop: '5px', height:'150px', width: '88%', backgroundColor: '#7d57fc', borderRadius: '15px' }}>

      <div style={{margin: '30px 0 0 50px', color: '#fff'}}>
        <h1> Hello, {user ? user.firstname : 'Guest'} !</h1>
        <h6> It's nice to see you here..</h6>
      </div>

      <Button className="createClassroomBtn" onClick={handleClickOpen} variant="contained" style={{ background: '#b9ff66', color: '#000', textTransform: 'none', fontWeight: 'bold', margin: '-130px 0 0 750px', width: '150px'}} > 
        Enroll
      </Button>
      <img src={img5} alt="illustration" style={{height:'250px', marginTop: '-208px', marginLeft: '970px' }} />   

      </div>


      <div style={{ padding: '30px', height:'450px', width: '88%', backgroundColor: '#fff', border:'1px solid black', borderRadius: '15px'}}>
      <h2 style={{fontWeight: 'bold'}} >Classes</h2>

        <div style={{ width: '100%'}}>  
          {classrooms.length === 0 ? (
            <p>No active classrooms found.</p>
          ) : (
            
              <div style={{ backgroundColor:'#fff', display:'flex', flexWrap:'wrap', rowGap: '0px', columnGap: '40px',   marginLeft: '50px', maxHeight: '350px', overflowY: 'auto', }}>
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
  );
}



