import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image1 from '../Assets/image1.png';
// import openEye from '../Assets/password/eye.png';
// import closeEye from '../Assets/password/invisible.png';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

export default function RegistrationForm () {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);  
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);  

        const userData = {
            username: email,
            password: password,
            firstname: firstName,
            lastname: lastName,
            photoURL: ''
        };

        try {
            const response = await fetch('http://localhost:8080/auth/registerStudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                console.log('Registration successful');
                toast.success('Registration successful!'); 
                navigate('/login');
            } else {
                console.log('Registration failed');
                toast.error('Registration failed. Please try again.');  
            }
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error('An error occurred. Please try again later.'); 
        } finally {
            setLoading(false); 
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container 
            fluid 
            className="m-0 vh-100"  
            style={{ background: '#ffffff', color: '#333333' }}
        >
            <Row className="h-100">  
                <Col sm={6} className="d-flex justify-content-center align-items-center">
                    <img 
                        className="img-fluid" 
                        src={image1} 
                        alt="A beautiful landscape showcasing nature" 
                        style={{ width: '650px', height: '650px' }} 
                    />
                </Col>
                <Col sm={6} className="d-flex justify-content-center align-items-center">  
                    <Card className='m-5 rounded' style={{ background: '#ffffff', width: '560px' }}>
                        <div className="p-4">
                            <div className="d-flex flex-column align-items-center" style={{ color: '#333333' }}>
                                <h2 className="registrationHeader">Sign up now</h2>
                            </div>
                            <Form onSubmit={handleRegister}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control 
                                        type="email"
                                        placeholder='example@email.com' 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-flex justify-content-between">
                                        Password
                                        <span 
                                            className="visiblePassword float-end" 
                                            onClick={togglePasswordVisibility} 
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {showPassword ? (
                                                <span>Hide</span>
                                            ) : (
                                                <span>Show</span>
                                            )}
                                        </span>
                                    </Form.Label>
                                    <Form.Control 
                                        type={showPassword ? 'text' : 'password'}  
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required
                                    />
                                </Form.Group>
                                <div className="align">
                                    <Form.Check 
                                        type="checkbox" 
                                        id="terms" 
                                        label="I agree to the terms and conditions" 
                                        required 
                                    />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Button 
                                        className="m-0" 
                                        style={{ background: '#B9FF66', margin: 0, border: 'none' }} 
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Registering...' : 'Register'}
                                    </Button>
                                </div>
                                <p className="text-center">
                                    Already have an account?{' '}
                                    <span 
                                        onClick={handleLoginRedirect} 
                                        style={{ cursor: 'pointer', color: '#B9FF66' }}
                                    >
                                        Login
                                    </span>
                                </p>
                            </Form>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
