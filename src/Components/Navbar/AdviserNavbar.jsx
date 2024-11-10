import { Dropdown, Nav } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'; 
import darkwo from '../../Assets/logo/logo.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';

export default function AdviserNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleProfile = () => {
        console.log("Navigating to profile...");
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
                backgroundColor: '#b9ff66',
                height: '10dvh',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0px 6dvw'
            }}
        >
            <img src={darkwo} alt="System Logo" style={{ height: '75%' }} />
            
            <Nav className="d-flex gap-3">
                <Nav.Link
                    className={`nav-link-custom ${isActiveLink('/adviserhomepage') ? 'active' : ''}`}
                    href="adviserhomepage"
                    style={{ color: '#666666', fontWeight: isActiveLink('/adviserhomepage') ? 'bold' : 'normal' }}
                >
                    Home
                </Nav.Link>
                <Nav.Link
                    className={`nav-link-custom ${isActiveLink('/adviserqueuepage') ? 'active' : ''}`}
                    href="adviserqueuepage"
                    style={{ color: '#666666', fontWeight: isActiveLink('/adviserqueuepage') ? 'bold' : 'normal' }}
                >
                    Queue
                </Nav.Link>
                <Nav.Link
                    className={`nav-link-custom ${isActiveLink('/adviseravailabilitypage') ? 'active' : ''}`}
                    href="adviseravailabilitypage"
                    style={{ color: '#666666', fontWeight: isActiveLink('/adviseravailabilitypage') ? 'bold' : 'normal' }}
                >
                    Availability
                </Nav.Link>
                <Nav.Link
                    className={`nav-link-custom ${isActiveLink('/adviserlogpage') ? 'active' : ''}`}
                    href="adviserlogpage"
                    style={{ color: '#666666', fontWeight: isActiveLink('/adviserlogpage') ? 'bold' : 'normal' }}
                >
                    Logs
                </Nav.Link>
            </Nav>

            <div style={{ display: 'flex', gap: '10px', position: 'relative' }}>
                <IconButton style={{ color: 'black' }}>
                    <NotificationsIcon style={{ fontSize: '2.3rem' }} />
                </IconButton>

                <Dropdown show={showDropdown}>
                    <Dropdown.Toggle as={Nav.Link} id="dropdown-profile">
                        <IconButton style={{ color: 'black' }} onClick={handleProfileToggle}>
                            <AccountCircleIcon style={{ fontSize: '2.3rem' }} />
                        </IconButton>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end" style={{ position: 'absolute' }}>
                        <Dropdown.Item onClick={handleProfile}>View Profile</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}
