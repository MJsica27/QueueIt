import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateUserAccount from '../../Components/Dialogs/Admin/AdminCreateUserAccountDialog';
import Button from '@mui/material/Button';  
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search'; 
import UserNavbar from '../../Components/Navbar/UserNavbar';

export default function AdminUserPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);  
  const [open, setOpen] = useState(false); 
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    role: 'Adviser', 
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); 
    if (!user) {
      navigate('/');  
    }   
  }, [navigate]);

  const openCreateButton = () => {
    setOpen(true);
  };

  const cancelButton = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createAccount = async (e) => {
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
        cancelButton();
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
      className="m-0 vh-100" style={{ background: '#b9ff66', color: '#333333' }} >
      <UserNavbar/>
      <div style={{background: '#fff', color: '#333333', height: '100vh', padding: '30px 50px 0px 50px'}} >
      <div  style={{background: '#fafafa', padding: '30px 50px 0px 50px'}}>
        <div className='mb-1 d-flex align-items-center justify-content-between' style={{ width: '100%', marginBottom: '20px' }}>
          <div style={{ position: 'relative', width: '70%', display: 'flex', alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="Search user" 
              style={{ width: '100%', padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0px 0px 10px rgba(182, 255, 102, 1)', paddingRight: '30px'  }} />
            <SearchIcon style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
          </div>

          <Button  
            onClick={openCreateButton} 
            variant="contained" 
            style={{ background: '#b9ff66', color: '#000', textTransform: 'none', fontWeight: 'bold' }} > 
            Create Account
          </Button>
        </div> 
        <div className='mt-4'> 
          <h2>Users</h2>  
        </div> 
          <div className="mt-3 d-flex align-items-center justify-content-between" style={{ background: 'rgba(185, 255, 102, 0.78)', color: '#333333', width: 'auto', borderRadius: '5px', padding: '10px' }}>
            <strong className="mx-2" style={{ marginLeft: '25px' }}> Name </strong>
            <strong className='ml-auto' style={{ marginRight: '25px' }}> Action </strong>
          </div>
            <div className='d-flex justify-content-center align-items-center' style={{ height: 'auto' }}>
              {/* User list will go here */}
            </div>
      </div> 
 
        {/* Form */}
        <CreateUserAccount 
          open={open}
          handleClose={cancelButton}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={createAccount}
          loading={loading}
        />
      </div>
    </div>
  );
}
