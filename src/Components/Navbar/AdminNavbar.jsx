import React, { useState } from 'react';
import {  Nav,  Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';  
import darkwo from '../../Assets/logo/logo.png';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function AdminNavbar() {
    const navigate = useNavigate();
    const location = useLocation();  
    const [showDropdown, setShowDropdown] = useState(false);

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        console.log("User logged out"); 
        localStorage.removeItem('user');
        document.cookie = 'token=; Max-Age=0; path=/; domain=' + window.location.hostname; 
        window.history.replaceState(null, null, '/login'); 
        window.location.href = '/login'; 
    };

    const handleProfileToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const isActiveLink = (path) => {
        return location.pathname === path;  
    };

    return (
        <div
            style={{
                backgroundColor:'#b9ff66',
                height:'10dvh',
                width:'100%',
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center',
                padding:'0px 6dvw 0px 6dvw'
            }}
        >
            <img src={darkwo} alt="System Logo" style={{ height:'75%' }} />
            
            <Nav style={{ display: 'flex', gap: '20px' }}>
                <Nav.Link 
                    className={`nav-link-custom ${isActiveLink('/adminhomepage') ? 'active' : ''}`} 
                    href="/adminhomepage" 
                    style={{ color: '#666666', fontWeight: isActiveLink('/adminhomepage') ? 'bold' : 'normal' }}
                >
                    Classrooms
                </Nav.Link>
                <Nav.Link 
                    className={`nav-link-custom ${isActiveLink('/adminuserpage') ? 'active' : ''}`} 
                    href="/adminuserpage" 
                    style={{ color: '#666666', fontWeight: isActiveLink('/adminuserpage') ? 'bold' : 'normal' }}
                >
                    Users
                </Nav.Link>
                <Nav.Link 
                    className={`nav-link-custom ${isActiveLink('/adminlogpage') ? 'active' : ''}`} 
                    href="/adminlogpage" 
                    style={{ color: '#666666', fontWeight: isActiveLink('/adminlogpage') ? 'bold' : 'normal' }}
                >
                    Logs
                </Nav.Link>
            </Nav>

            <div style={{ display: 'flex', gap: '10px', position: 'relative' }}>
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="profile-tooltip">User Profile</Tooltip>}>
                    <Dropdown show={showDropdown}>
                        <Dropdown.Toggle as={Nav.Link} id="dropdown-profile">
                            <IconButton style={{ color: 'black' }} onClick={handleProfileToggle}>
                                <AccountCircleIcon style={{ fontSize: '2.3rem' }} />
                            </IconButton>
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end">
                            <Dropdown.Item onClick={handleProfile}>View Profile</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </OverlayTrigger>
            </div>
        </div>
    );
}
