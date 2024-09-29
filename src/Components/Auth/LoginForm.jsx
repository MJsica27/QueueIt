import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./auth.css";

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
                navigate('/studenthomepage');
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleSignupRedirect = () => {
        navigate('/register');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
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
                            {showPassword ? '🙈' : '👁️'} {/* This can be replaced with an icon */}
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
    );
};

export default LoginForm;
