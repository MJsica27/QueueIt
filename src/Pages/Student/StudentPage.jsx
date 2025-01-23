import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClassroomCard from '../../Components/Card/ClassroomCard';
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
import AdviserBackgroundPage from '../../Components/Backgound/AdviserBackgroundPage';
import { BASE_URL } from '../../Global_vars/Urls';
import { Box } from '@mui/material';
import { Container, Row } from 'react-bootstrap';

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
          const response = await fetch(`${BASE_URL}/classroom/getClassrooms?userID=${user.userID}`,{
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
      const response = await fetch(`${BASE_URL}/classroom/enroll`, {
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

      <div style={{ marginTop: '5px', height:'150px', width: '88%', backgroundColor: '#7d57fc', borderRadius: '15px', display:'flex'}}>

      <div style={{color: '#fff',flex:1, justifyContent:'center', display:'flex',flexDirection:'column', paddingLeft:'1em'}}>
        <h1> Hello, {user ? user.firstname : 'Guest'} !</h1>
        <h6> It's nice to see you here..</h6>
      </div>

      <div style={{ flex:1, display:'flex', alignItems:'center',justifyContent:'end', position:'relative', paddingRight:'1em'}}>
        <Button className="createClassroomBtn" onClick={handleClickOpen} variant="contained" style={{ background: '#b9ff66', color: '#000', textTransform: 'none', fontWeight: 'bold', width: '150px'}} > 
          Enroll
        </Button>
      </div>
      
      <Box sx={{flex:1, position:'relative', alignItems:'center', display: {xs:'none',sm:'none',md:'flex'}}} style={{position:'relative', flex:1, alignItems:'center'}}>
        <img src={img5} alt="illustration" style={{height:'200%', position:'absolute', bottom:-33, left:50, zIndex:0 }} /> 
      </Box>

      </div>


      <div style={{ padding: '25px', width: '88%', backgroundColor: '#fff', borderRadius: '15px', flexGrow:1}}>
        <p style={{fontWeight: 'bold', fontSize:'clamp(2rem, 2.5vw + 0.5rem, 3.3rem)'}} >Classrooms</p>

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



