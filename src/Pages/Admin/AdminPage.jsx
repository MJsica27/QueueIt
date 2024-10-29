import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions'; 
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'; 
import TextField from '@mui/material/TextField'; 
import AdminNavbar from '../../Components/Navbar/AdminNavbar';
import vector from '../../Assets/Vector.png';
import { toast } from 'react-toastify';
import AdminClassroomListCard from '../../Components/Card/AdminClassroomListCard';

export default function AdminPage() {
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false); // For Create Classroom dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // For Delete Classroom dialog
  const [loading, setLoading] = useState(true); 
  const [deleteClassID, setDeleteClassID] = useState(null);  
  const [userID, setUserID] = useState(null); 
  const [formData, setFormData] = useState({
    subjectName: '',
    subjectCode: '',
    section: '',
    adviserID: '',
    classCode: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      navigate('/login');  
    } else {
      setUserID(user.userID);  
      const fetchClassrooms = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem('token');  
          const response = await fetch('http://localhost:8080/classroom/all', {
            headers: {
              'Authorization': `Bearer ${token}`, 
            },
          });
          const data = await response.json();
          setFilteredClassrooms(data);
        } catch (error) {
          console.error('Error fetching classrooms:', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchClassrooms(); 
      navigate('/adminhomepage');  
    }
  }, [navigate]);

  const handleDeleteClassroom = async () => {
    if (deleteClassID) {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:8080/classroom/deleteClassroomAsAdmin?classID=${deleteClassID}&userID=${userID}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,  
          },
        });
  
        if (response.ok) {
          setFilteredClassrooms(prev => prev.filter(classroom => classroom.classID !== deleteClassID));
          toast.success('Classroom deleted successfully');
        } else {
          toast.error('Failed to delete classroom');
        }
      } catch (error) {
        console.error('Error deleting classroom:', error);
        toast.error('Error deleting classroom');
      }
      setOpenDeleteDialog(false); // Close the delete dialog
    }
  };
  
  const handleOpenDeleteDialog = (classID) => {
    setDeleteClassID(classID);
    setOpenDeleteDialog(true); // Open delete dialog
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteClassID(null);  
  };

  const handleClickOpenCreateDialog = () => {
    setFormData({
      subjectName: '',
      subjectCode: '',
      section: '',
      adviserID: '',
      classCode: generateClassCode(),
    });
    setOpenCreateDialog(true); // Open create dialog
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    const userData = {
      subjectName: formData.subjectName,
      subjectCode: formData.subjectCode,
      section: formData.section,
      adviserID: formData.adviserID,
      classCode: formData.classCode
    };
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/classroom/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
  
      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);
  
      if (response.ok) {
        setFilteredClassrooms(prev => [...prev, responseData]);
        handleCloseCreateDialog();
        toast.success('Classroom created successfully');
      } else {
        console.error('Failed to create classroom', responseData);
        toast.error(`Failed to create classroom: ${responseData.message || JSON.stringify(responseData)}`);
      }
    } catch (error) {
      console.error('Error creating classroom:', error);
      toast.error('Error creating classroom');
    }
  };

  return (
    <div className="m-0"
      style={{
        background: '#ffffff',
        color: '#333333',
        backgroundImage: `url(${vector})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'auto'
      }}>
      <AdminNavbar />
      <div className="mx-5" style={{ background: 'rgba(238, 238, 238, 0.9)', color: '#333333', height: '100vh', borderRadius: '20px', padding: '50px' }}>
        <div className='mb-10 d-flex align-items-center justify-content-between'>
          <h2>Classrooms</h2>
          <Button
            onClick={handleClickOpenCreateDialog}  
            variant="contained"
            style={{ background: '#000000', color: '#ffffff', marginTop: '20px' }}
          >
            Create Classroom
          </Button>
        </div>
        <div className='mt-4' style={{ width: 'auto' }}>
          {loading ? (
            <p>Loading classrooms...</p>
          ) : (
            filteredClassrooms.map(classroom => (
              <AdminClassroomListCard
                key={classroom.classCode}
                classID={classroom.classID}
                classCode={classroom.classCode}
                subjectName={classroom.subjectName}
                subjectCode={classroom.subjectCode}
                adviserID={classroom.adviserID}
                section={classroom.section}
                onDelete={handleOpenDeleteDialog}  
              />
            ))
          )}
        </div>

        {/* Create Classroom Dialog */}
        <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
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
              name="adviserID"
              label="Assigned Adviser"
              fullWidth
              value={formData.adviserID}
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
            <Button onClick={handleCloseCreateDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreateClassroom} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>

        {/* Confirmation Dialog for Deleting Classroom */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this classroom?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteClassroom} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
