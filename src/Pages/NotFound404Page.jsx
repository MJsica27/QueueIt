import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Typography } from '@mui/material';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound404Page = () => {
    const navigate = useNavigate()
    return (
        <div style={{margin:'0 auto', width:'100%', height:'100dvh', border:'solid 1px black', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', gap:'3dvh'}}>
            <ErrorOutlineIcon style={{fontSize:'15dvw', color:'gray'}}/>
            <Typography variant='h1' style={{fontFamily:'poppins', fontSize:'3.5dvw'}}>404 Page not found</Typography>
            <Typography variant='caption' style={{fontSize:'1.5dvw'}}>The page you have requested does not exist.</Typography>
            <Button className='buttonCustom' onClick={()=>{navigate("/")}}>Home</Button>
        </div>
    );
}

export default NotFound404Page;
