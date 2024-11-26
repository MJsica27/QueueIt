import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../../Components/Buttons/BackButton';
import { IconButton, } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UserNavbar from '../../Components/Navbar/UserNavbar';

export default function AdviserGroupPage() {

    const navigate = useNavigate();
    const [user] = useState(null);
    const location = useLocation();
    const group = location.state;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (!user) {
          navigate('/');  
        }   
      }, [navigate]);

    return ( 
        <div className="m-0 vh-100" style={{  backgroundPosition: 'center', backgroundSize: 'cover', backgroundColor: '#fff', height: '95vh' }} >
            <UserNavbar/>

            <div  className=" d-flex align-items-center justify-content-center"> 
                <div  style={{ backgroundColor:'rgba(0,0,0,0.03)', borderRadius: '5px', color: '#333',  width: '1400px', overflow: 'hidden', height: '82vh', margin: '20px 0 0 20px',  }} >  
                    <div  style={{ fontWeight: 'bold',   height: '50px', fontSize: '22px', padding: '0 20px', color: '#000', display: 'flex', alignItems: 'center'}} >
                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <BackButton />
                                {group.groupName}
                            <IconButton  style={{ color: 'black'}}>
                                <MoreHorizIcon/>
                            </IconButton>
                        </span>
                        
                    </div>
  
                    <div  style={{ padding: '20px', maxHeight: '500px', overflowY: 'auto' }} > 
                    </div>
                </div> 
            </div>  
        </div>
    );
}
