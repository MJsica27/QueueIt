import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';
import vector from '../../Assets/Vector.png';
import ClassroomListCard from '../../Components/Card/ClassroomListCard';

export default function AdminPage() {
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    subjectName: '',
    subjectCode: '',
    section: '',
    adviserID: '', 
    classCode: ''
  });

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    const data = [
      { classCode: 'MUATH3', subjectCode: 'IT411', subjectName: 'Capstone 2', section: 'G1', adviserID: 'John Doe' },
      { classCode: '9OU7TS', subjectCode: 'ES038', subjectName: 'Technoprenuership', section: 'F2', adviserID: 'Jane Smith' },
    ];
    setFilteredClassrooms(data);
  };

  const handleClickOpen = () => {
    setFormValues(prev => ({ ...prev, classCode: generateClassCode() }));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const generateClassCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleCreateClassroom = () => {
    const newClassroom = { ...formValues };  
    setFilteredClassrooms(prev => [...prev, newClassroom]);
    handleClose();
  };

  return (
    <div className="m-0 vh-100"
      style={{
        background: '#ffffff',
        color: '#333333',
        backgroundImage: `url(${vector})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <AdminNavbar />
      <div className="mx-5" style={{ background: 'rgba(238, 238, 238, 0.9)', color: '#333333', height: '100vh', borderRadius: '20px', padding: '50px' }}>
        <div className='mb-10 d-flex align-items-center justify-content-between'>
          <h2>Classrooms</h2>
          <Button
            onClick={handleClickOpen}
            style={{ background: '#000000', color: '#ffffff', marginTop: '20px' }}
          >
            Create Classroom
          </Button>
        </div>
        <div className='mt-4' style={{ width: 'auto' }}>
          {filteredClassrooms.map(classroom => (
            <ClassroomListCard
              key={classroom.classCode}
              classCode={classroom.classCode}
              subjectName={classroom.subjectName}
              subjectCode={classroom.subjectCode}
              adviserID={classroom.adviserID}
              section={classroom.section}
            />
          ))}
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
              value={formValues.subjectName}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="subjectCode"
              label="Subject Code"
              fullWidth
              value={formValues.subjectCode}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="section"
              label="Section"
              fullWidth
              value={formValues.section}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="adviserID"  
              label="Assigned Adviser"
              fullWidth
              value={formValues.adviserID}  
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="classCode"
              label="Class Code"
              fullWidth
              value={formValues.classCode}
              InputProps={{ readOnly: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreateClassroom} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
