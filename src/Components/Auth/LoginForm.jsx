import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./auth.css";
import { toast } from 'react-toastify';
import image1 from '../Assets/image1.png';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data); 
                toast.success('Login successful'); 
                navigate('/studenthomepage');
            } else {
                console.log('Login failed');
                toast.error('Login failed');  
            }
        } catch (error) {
            console.error('Error during login:', error); 
            toast.error('Error during login');  
        }
    };

    const handleSignupRedirect = () => {
        navigate('/register');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (

        <div className="container">
            <div className='left'>
                <img className="image1" src={image1} alt="A beautiful landscape showcasing nature" />
            </div>

            <div className='right'>
                <div className="login-form">
                    <h2 className="loginHeader">Login</h2>
                    <div>
                    <p>New to QueueIt?{' '}
                            <span onClick={handleSignupRedirect} style={{ cursor: 'pointer', color: '#B9FF66' }}>Sign up for now</span>
                        </p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password
                            <span className="visiblePassword" onClick={togglePasswordVisibility}>
                                    {showPassword ? '🙈Hide' : '👁️Show'} {/* This can be replaced with an icon */}
                                </span>
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <br />
                        <div className="btnLogin">
                        <button type="submit">Login</button> 
                        </div>
                    </form>
                </div>
            </div>

        </div>
        
    );
};

export default LoginForm;
