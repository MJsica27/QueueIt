import { Container, Nav, Navbar, Dropdown} from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';  
import { useState } from 'react';
import { toast } from 'react-toastify';
import pu from '../../Assets/icons/profile-user.png';
import darkwo from '../../Assets/logo/logo.png';

export default function AdviserNavbar() {
    const navigate = useNavigate();
    const location = useLocation();  
    const [showDropdown, setShowDropdown] = useState(false);

    const handleProfile = () => {
        console.log("Navigating to profile...");  
        navigate('/profile');
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        toast.success('Logged out successfully');
        navigate('/login');  
    };
 
    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };
 
    const isActiveLink = (path) => {
        return location.pathname === path;  
    };

    return (
        <div>
            <Navbar  className="m-0" style={{ background: '#b9ff66' }}>
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand href="adviserhomepage">
                        <img src={darkwo} alt="System Logo" style={{ width: 'auto', height: '35px' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <div className="m-0" >
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="justify-content-center">
                                <Nav.Link 
                                    className={`me-3 nav-link-custom ${isActiveLink('/adviserhomepage') ? 'active' : ''}`} 
                                    href="adviserhomepage" 
                                    style={{ color: '#666666', fontWeight: isActiveLink('/adviserhomepage') ? 'bold' : 'normal' }}
                                >
                                    Home
                                </Nav.Link>
                                <Nav.Link 
                                    className={`me-3 nav-link-custom ${isActiveLink('/adviserqueuepage') ? 'active' : ''}`} 
                                    href="adviserqueuepage" 
                                    style={{ color: '#666666', fontWeight: isActiveLink('/adviserqueuepage') ? 'bold' : 'normal' }}
                                >
                                    Queue
                                </Nav.Link>
                                <Nav.Link 
                                    className={`me-3 nav-link-custom ${isActiveLink('/adviseravailabilitypage') ? 'active' : ''}`} 
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
                        </Navbar.Collapse>
                    </div> 
                    {/* Profile */}
                    <Nav onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> 
                            <Dropdown show={showDropdown}>
                                <Dropdown.Toggle as={Nav.Link} id="dropdown-profile">
                                    <img
                                        src={pu}
                                        alt="User Profile"
                                        style={{ width: '35px', height: '35px', borderRadius: '50%' }}
                                    />
                                </Dropdown.Toggle>

                                <Dropdown.Menu align="end">
                                    <Dropdown.Item onClick={handleProfile}>View Profile</Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> 
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}
