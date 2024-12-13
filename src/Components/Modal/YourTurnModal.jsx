import { Button, CircularProgress, Modal, Typography } from '@mui/material';
import React from 'react';

const YourTurnModal = ({open, handleClose}) => {
    return (
        <div>
            <Modal
                open={open}
                // onClose={handleClose}
                style={{width:'40%', display:'flex', justifyContent:'center', alignItems:'center', margin:'0 auto'}}
            >
                <div style={{backgroundColor:'white', height:'50%', width:'100%', display:'flex', flexDirection:'column', gap:'20px', alignItems:'center', justifyContent:'center'}}>
                    <CircularProgress size={100}/>
                    <Typography variant='h4'>It's your turn now.</Typography>
                    <Typography>Please go to your adviser.</Typography>
                    <Button variant='contained' color='success' onClick={handleClose}>Close</Button>
                </div>
                
            </Modal>
        </div>
    );
}

export default YourTurnModal;
