import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import img2 from '../Assets/img/img2.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Modal, Button, Form } from 'react-bootstrap';

export default function LoginForm() {
  const [show] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginBTNText, setLoginBTNText] = useState("Log in");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginBTNText("Logging in...");
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      switch(response.status) {
        case 200:
          const data = await response.json(); 
          toast.success('Login successful');
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);   
          window.location.reload();
          break;
        case 404:
          response.text().then(bodyMessage => {
            toast.error(bodyMessage);
          });
          setLoading(false);
          setLoginBTNText("Log in");
          break;
        default:
          toast.error('Login failed');
          setLoading(false);
          setLoginBTNText("Log in");
      }
    } catch (error) {
      setLoading(false);
      setLoginBTNText("Log in");
      toast.error('Error during login');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] fixed"></div>
      
      <div className="absolute">
        <img src={img2} style={{ marginTop: '-200px', marginLeft: '-220px' }} />
        <img src={img2} style={{ marginTop: '-700px', marginLeft: '720px' }} />
      </div>

      {/* Modal */}
      <Modal  centered show={show} >
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '20px' }}>
            <Modal.Title style={{ marginBottom: '10px' }}>Login</Modal.Title>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ color: 'gray' }}>New to QueueIt?</span>
                <a 
                onClick={() => { navigate('/register') }} 
                style={{ color: 'inherit', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                >
                Sign up for now
                </a>
            </div>
        </div>



        <Modal.Body style={{margin: '0 20px 10px 20px'}}>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Password
                <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
                style={{ cursor: 'pointer', color: 'gray', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                {showPassword ? (
                    <>
                    <VisibilityOffIcon />
                    Hide
                    </>
                ) : (
                    <>
                    <VisibilityIcon />
                    Show
                    </>
                )}
                </span>
            </Form.Label>
            <Form.Control
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="**********"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </Form.Group>
  
            <div className="d-flex justify-content-center">
            <Button
            type="submit"
            disabled={loading}
            style={{ color: '#000', fontWeight: 'bold', backgroundColor: '#CCFC57', width: '100%', borderRadius: '50px', padding: '10px', border: 'none',  }}
            >
            {loginBTNText}
            </Button>

            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
