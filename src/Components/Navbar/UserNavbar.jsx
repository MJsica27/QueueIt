import React, { useState, useContext } from 'react';
import logo from '../../Assets/logo/logo.png';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import { Dropdown, Nav } from 'react-bootstrap';
import { UserContext } from '../../Components/User/UserContext';
 
const UserNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);
    const user = useContext(UserContext)?.user;
 
    const handleProfile = () => {
        console.log("Navigating to profile...");  
        navigate('/profile');
    };
 
    const handleLogout = () => {
        console.log("User logged out");
        localStorage.removeItem('user');
        window.location.reload();
    };
 
    const handleProfileToggle = () => {
        setShowDropdown(!showDropdown);
    };
 
    const isActiveLink = (...paths) => {
        return paths.some(path => location.pathname === path);  
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
            <img src={logo} alt='logo' style={{height:'75%'}}/>
 
            {user ? (
                user.role === "ADMIN" ? (
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
                ) : user.role === "ADVISER" ? (
                    <Nav className="d-flex gap-3">
                        <Nav.Link
                            as={Link}
                            to="/adviserhomepage"
                            className={`nav-link-custom ${isActiveLink('/adviserhomepage', '/adviserclassroompage', '/group') ? 'active' : ''}`}
                            style={{ color: '#666666', fontWeight: isActiveLink('/adviserhomepage', '/adviserclassroompage', '/group') ? 'bold' : 'normal' }}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/adviserqueuepage"
                            className={`nav-link-custom ${isActiveLink('/adviserqueuepage') ? 'active' : ''}`}
                            style={{ color: '#666666', fontWeight: isActiveLink('/adviserqueuepage') ? 'bold' : 'normal' }}
                        >
                            Queue
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/adviseravailabilitypage"
                            className={`nav-link-custom ${isActiveLink('/adviseravailabilitypage') ? 'active' : ''}`}
                            style={{ color: '#666666', fontWeight: isActiveLink('/adviseravailabilitypage') ? 'bold' : 'normal' }}
                        >
                            Availability
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/adviserlogpage"
                            className={`nav-link-custom ${isActiveLink('/adviserlogpage') ? 'active' : ''}`}
                            style={{ color: '#666666', fontWeight: isActiveLink('/adviserlogpage') ? 'bold' : 'normal' }}
                        >
                            Logs
                        </Nav.Link>
                    </Nav>
                ) : null
            ) : null}
 
            <div style={{display:'flex', gap:10, position:'relative'}}>
                <IconButton style={{color:'black'}}>
                    <NotificationsIcon style={{fontSize:'2.3rem'}}/>
                </IconButton>
                <Dropdown show={showDropdown}>
                    <Dropdown.Toggle as="div" id="dropdown-profile" style={{ cursor: 'pointer' }}>
                        <IconButton style={{color:'black'}} onClick={handleProfileToggle}>
                            <AccountCircleIcon style={{fontSize:'2.3rem'}}/>
                        </IconButton>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end" style={{ position:'absolute', zIndex:1050 }}>
                        <Dropdown.Item onClick={handleProfile}>View Profile</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};
 
export default UserNavbar;