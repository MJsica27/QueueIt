import React, { useState } from 'react';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';
import vector from '../../Assets/Vector.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminUserPage() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    role: 'Adviser', 
  });
  const [loading, setLoading] = useState(false);  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username: formData.username,
      password: formData.password,
      firstname: formData.firstname,
      lastname: formData.lastname,
      role: formData.role,
      photoURL: ''  
    };

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success('User registered successfully!'); 
        handleClose();
      } else {
        toast.error('Registration failed. Please try again.');  
      }
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('An error occurred. Please try again later.'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="m-0 vh-100"
      style={{
        background: '#ffffff',
        color: '#333333',
        backgroundImage: `url(${vector})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <AdminNavbar />
      <div className="mx-5" style={{ background: 'rgba(238, 238, 238, 0.9)', color: '#333333', height: '100vh', borderRadius: '20px', padding: '50px' }}>
        <div className='m-0  d-flex align-items-center justify-content-between'>
          <TextField id="outlined-search" label="Search Account" type="search" />
          
          {/* Register Button */}
          <Button onClick={handleClickOpen} style={{ background: '#000000', color: '#ffffff', marginTop: '20px' }}>
            Create Account
          </Button> 
        </div>
        
        {/* Form */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Account</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              name="username"
              label="Username"
              type="text"
              fullWidth
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="firstname"
              name="firstname"
              label="Firstname"
              type="text"
              fullWidth
              value={formData.firstname}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="lastname"
              name="lastname"
              label="Lastname"
              type="text"
              fullWidth
              value={formData.lastname}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleChange} 
            />
            <TextField
              margin="dense"
              id="role"
              name="role"
              select
              label="Role"
              value={formData.role}
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value="Adviser">Adviser</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">Cancel</Button>
            <Button onClick={handleSubmit} color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
            </Button>
          </DialogActions>
        </Dialog>
        
        <div className="mt-3 d-flex align-items-center justify-content-between" style={{ background: 'rgba(185, 255, 102, 0.78)', color: '#333333', width: 'auto', borderRadius: '5px', padding: '10px' }}>
          <strong className="mx-2" style={{ marginLeft: '25px' }}> Name </strong>
          <strong className='ml-auto' style={{ marginRight: '25px' }}> Action </strong>
        </div>
        <div className='d-flex justify-content-center align-items-center' style={{ height: 'auto' }}>
          {/* User list will go here */}
        </div>
      </div>
    </div>
  );
}
