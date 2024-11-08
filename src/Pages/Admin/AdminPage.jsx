import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; 
import AdminNavbar from '../../Components/Navbar/AdminNavbar'; 
import { toast } from 'react-toastify';
import AdminClassroomListCard from '../../Components/Card/Admin/AdminClassroomListCard';
import SearchIcon from '@mui/icons-material/Search';  
import CreateClassroomDialog from '../../Components/Dialogs/Admin/CreateClassroomDialog';
import DeleteClassroomDialog from '../../Components/Dialogs/Admin//DeleteClassroomDialog';

export default function AdminPage() {
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);  
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); 
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
      setOpenDeleteDialog(false);  
    }
  };
  
  const handleOpenDeleteDialog = (classID) => {
    setDeleteClassID(classID);
    setOpenDeleteDialog(true);  
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
    setOpenCreateDialog(true);  
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
        background: '#fff',
        color: '#333333', 
        height: 'auto'
      }}>
      <AdminNavbar />
      <div style={{ background: '#fff', color: '#333333', height: '100vh', padding: '30px 50px 0px 50px' }}>
        <div  style={{background: '#fafafa', padding: '30px 50px 0px 50px'}}>
        <div className='mb-1 d-flex align-items-center justify-content-between' style={{ width: '100%', marginBottom: '20px' }}>
      <div style={{ position: 'relative', width: '70%', display: 'flex', alignItems: 'center' }}>
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
        <SearchIcon style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
      </div>

      <Button  
        onClick={handleClickOpenCreateDialog} 
        variant="contained" 
        style={{ 
          background: '#b9ff66', 
          color: '#000', 
          textTransform: 'none', 
          fontWeight: 'bold' 
        }}
      > 
        Create Classroom
      </Button>
    </div>
    
          <div className='mt-4' style={{background: '#fafafa', width: 'auto' }}>
          <h2>Classrooms</h2>  
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

        </div>
        
        {/* Use CreateClassroomDialog */}
        <CreateClassroomDialog
          open={openCreateDialog}
          onClose={handleCloseCreateDialog}
          onCreate={handleCreateClassroom}
          formData={formData}
          handleInputChange={handleInputChange}
          generateClassCode={generateClassCode}
        />

        {/* Use DeleteClassroomDialog */}
        <DeleteClassroomDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          onDelete={handleDeleteClassroom}
        />
      </div>
    </div>
  );
}
