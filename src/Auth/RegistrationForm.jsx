import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegistrationForm() {
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
                navigate('/');
            } else {
                const bodyMessage = await response.text();
                toast.error(bodyMessage);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                            <span
                                onClick={togglePasswordVisibility}
                                className="text-sm ml-2 cursor-pointer text-blue-500"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </span>
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <input type="checkbox" id="terms" required className="mr-2" />
                        <label htmlFor="terms" className="text-sm text-gray-700">
                            I agree to the terms and conditions
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account?{' '}
                    <span
                        onClick={handleLoginRedirect}
                        className="text-blue-500 cursor-pointer"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}
