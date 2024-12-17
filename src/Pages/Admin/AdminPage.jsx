import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; 
import { toast } from 'react-toastify'; 
import UserNavbar from '../../Components/Navbar/UserNavbar'; 
import AdviserBackgroundPage from '../../Components/Backgound/AdviserBackgroundPage';
import img5 from '../../Assets/img/img5.png'; 
import CreateUserAccount from '../../Components/Dialogs/Admin/AdminCreateUserAccountDialog';

export default function AdminPage() {
  const [user, setUser] = useState(null);
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
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/');  
    } else {
      setUser(storedUser);  
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
    <div className="flex flex-col h-screen relative overflow-hidden items-center gap-4">
      <AdviserBackgroundPage /> 
      <UserNavbar />

      <div style={{ marginTop: '5px', height: '150px', width: '88%', backgroundColor: '#7d57fc', borderRadius: '15px' }}>
        <div style={{ margin: '30px 0 0 50px', color: '#fff' }}>
          <h1> Hello, {user ? user.firstname : 'Guest'}!</h1>
          <h6> It's nice to see you here..</h6>
        </div>

        <Button 
          className="openCreateButton"   
          variant="contained" 
          style={{ background: '#b9ff66', color: '#000', textTransform: 'none', fontWeight: 'bold', margin: '-150px 0 0 750px' }} 
          onClick={openCreateButton} // Add onClick handler
        >
          Register User
        </Button>
        
        <img 
          src={img5} 
          alt="illustration" 
          style={{ height: '250px', marginTop: '-208px', marginLeft: '970px' }} 
        />
      </div>

      <CreateUserAccount 
        open={open}
        handleClose={cancelButton}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={createAccount}
        loading={loading}
      />
    </div> 
  );
}
