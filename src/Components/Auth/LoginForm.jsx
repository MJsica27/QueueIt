import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./auth.css";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                    username: email,  // Assuming the email is being used as the username
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                // Navigate to the next page after successful login
                navigate('/studenthomepage'); // Adjust the route as necessary
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleSignupRedirect = () => {
        navigate('/register'); // Adjust the route as necessary
    };

    return (
        <div className="login-form">
            <h2 style={{ textAlign: 'center' }}>Login</h2>
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
                    <label htmlFor="password">Password</label>
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
    );
};

export default LoginForm;
