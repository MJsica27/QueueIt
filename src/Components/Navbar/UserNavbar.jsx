    import React, { useState } from 'react';
    import logo from '../../Assets/logo/logo.png';
    import NotificationsIcon from '@mui/icons-material/Notifications';
    import AccountCircleIcon from '@mui/icons-material/AccountCircle';
    import { IconButton } from '@mui/material';
    import { Dropdown, Nav } from 'react-bootstrap';
    import { useNavigate } from 'react-router-dom';

    const UserNavbar = () => {
        const navigate = useNavigate();
        const [showDropdown, setShowDropdown] = useState(false);
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
        return (
            //background
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
                <div style={{display:'flex', gap:10, position:'relative'}}>
                    {/* notification button */}
                    <IconButton style={{color:'black'}}>
                        <NotificationsIcon style={{fontSize:'2.3rem'}}/>
                    </IconButton>
                    
                    {/* dropdown */}
                    <Dropdown show={showDropdown}>
                        <Dropdown.Toggle as={Nav.Link} id="dropdown-profile" style={{}}>
                            {/* profile button */}
                            <IconButton style={{color:'black'}} onClick={handleProfileToggle}>
                                <AccountCircleIcon style={{fontSize:'2.3rem'}}/>
                            </IconButton>
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end" style={{position:'absolute'}}>
                            <Dropdown.Item onClick={handleProfile}>View Profile</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        );
    }

    export default UserNavbar;
