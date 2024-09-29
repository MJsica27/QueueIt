import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const RegistrationForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const userData = {
            username: email,
            password: password,
            firstname: firstName,
            lastname: lastName,
            photoURL: ''
        };

        try {
            const response = await fetch('http://localhost:8080/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                console.log('Registration successful');
                navigate('/login');
            } else {
                console.log('Registration failed');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="registration-form">
            <h2>Sign up now</h2>
            <form onSubmit={handleRegister}>
                <div className="align-name">
                    <div>
                        <label htmlFor="firstName">First name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
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
                    
                    <div className="password-field">
                        
                        <input
                            type={showPassword ? 'text' : 'password'}  
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        
                    </div>
                </div>
                <br />
                <div className="align">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">I agree to the terms and conditions</label>
                </div>
                <br />
                <div className="submit">
                    <button type="submit">Register</button>
                    <p>
                        Already have an account?{' '}
                        <span onClick={handleLoginRedirect}>Login</span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
