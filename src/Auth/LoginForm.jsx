import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import vector from '../Assets/Vector.png'
import image1 from '../Assets/illustration.png';
import openEye from '../Assets/password/eye.png';
import closeEye from '../Assets/password/invisible.png';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Stack, Typography } from '@mui/material';

export default function LoginForm () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading,setLoading] = useState(false);
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
        console.log(password)
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
            })

            switch(response.status){
                case (200):
                    const data = await response.json();
                    // console.log('Login successful:', data);
                    toast.success('Login successful');
        
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('token', data.token);   
        
                    window.location.reload();
                    break;
                case (404):
                    response.text().then(bodyMessage =>{
                        toast.error(bodyMessage)
                    })
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
     

    // to be remove   
    const handleSignup = () => {
        navigate('/register');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

        return (
        <Container 
            fluid 
            className="m-0 d-flex align-items-center"
            style={{ background: '#b9ff66', color: '#333333', minHeight:'100dvh', height:'100%' }}
        >
            <Row className="h-100 w-100">  
                <Col sm={6} className="d-none d-md-flex justify-content-center align-items-center">
                    <div style={{
                        backgroundImage:`url(${vector})`,
                        backgroundPosition:'center',
                        backgroundSize:'cover',
                        height:'660px',
                        width:'80%',
                        position:'relative'
                    }}>
                            <div>
                                <Typography variant='h2'>Organize Your Workflow</Typography>
                                <Typography variant='h6'>Simplify project management </Typography>
                                <Typography variant='h6'>with streamlined tools and resources.</Typography>
                            </div>
                            <div style={{position:'absolute'}} className='w-100 d-flex align-items-center justify-content-center'>
                                <img src={image1} alt="logo" style={{height:'80%', width:'80%'}} />
                            </div>
                    </div>
                </Col>
                <Col md={6} className="d-flex justify-content-center align-items-center">  
                    <Card className='m-5 p-3' style={{ background: '#ffffff', width: '80%', border:'none', borderRadius:'30px'}}>
                        <div className="p-4">
                            <div className="d-flex flex-column align-items-center" style={{ color: '#333333' }}>
                                <Stack direction={"column"} gap={1} alignItems={"center"}>
                                    <h2 className="loginHeader">Log in</h2>
                                    <p>
                                        <span style={{color:'gray'}}>New to QueueIt?</span>{' '}
                                        <a onClick={()=>{navigate('/register')}} style={{color:'inherit',fontWeight:'bold', cursor:'pointer', textDecoration:'underline'}}>Sign up for now</a>
                                    </p>
                                </Stack>
                            </div>
                            <Form onSubmit={handleLogin}>
                                <Stack direction={'column'} gap={2}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label style={{color:'gray'}}>Email Address</Form.Label>
                                        <Form.Control 
                                            // type='email' 
                                            // placeholder='example@email.com' 
                                            style={{padding:'10px'}}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} 
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label className="d-flex justify-content-between">
                                            <span style={{color:'gray'}}>Password</span>
                                            <span 
                                                className="visiblePassword float-end" 
                                                onClick={togglePasswordVisibility} 
                                                style={{ cursor: 'pointer', color:'gray' }}
                                            >
                                                {showPassword ? (
                                                    <>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <img src={closeEye} alt="Hide" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                                                        <p style={{ margin: 0 }}>Hide</p>
                                                        </div>
                                                    </>
                                                
                                                ) : (
                                                    <>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <img src={openEye} alt="Hide" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                                                        <p style={{ margin: 0 }}>Show</p>
                                                        </div>
                                                    </>
                                                )}
                                            </span>
                                        </Form.Label>
                                        <Form.Control 
                                            type={showPassword ? 'text' : 'password'} 
                                            // placeholder='password' 
                                            style={{padding:'10px'}}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} 
                                            required
                                        />
                                    </Form.Group>
                                    {/* <a href="" style={{color:'inherit'}}>
                                        <Typography fontWeight={'bold'} variant='subtitle2'>Forgot Password?</Typography>
                                    </a> */}
                                    <div className="d-flex justify-content-center">
                                        <Button
                                            className="m-0" 
                                            style={{ background: '#B9FF66', margin: 0, border: 'none', width:'100%', borderRadius:'50px', padding:'10px' }} 
                                            type="submit"
                                            disabled={loading}
                                        >
                                            <Typography variant='subtitle2' color='black' fontSize={'18px'} fontWeight={"bold"}>{loginBTNText}</Typography>
                                        </Button>
                                    </div>
                                </Stack>
                            </Form>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}; 
