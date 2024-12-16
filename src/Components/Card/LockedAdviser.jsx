import { Typography } from '@mui/material';
import React from 'react';
import LockPersonIcon from '@mui/icons-material/LockPerson';

const LockedAdviser = () => {
    return (
        <div style={{border:'solid 1px black', flex:1, borderRadius:'15px', display:'flex', flexDirection:'column', alignItems:'center', padding:'1em 0.5em', backgroundColor:'white', height:'100%'}}>
            <Typography fontWeight='bold'>Mentor</Typography>
            <div style={{display:'flex', flexGrow:1, flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'2em'}}>
                <LockPersonIcon style={{fontSize:'calc(6em + 1dvw)'}}/>
                <Typography style={{paddingInline:'20%', textAlign:'center', color:'#505050'}}>Find a group first to enable mentorship Availability.</Typography>
            </div>
        </div>
    );
}

export default LockedAdviser;
