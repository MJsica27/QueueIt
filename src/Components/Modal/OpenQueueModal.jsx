import { Modal } from '@mui/material';
import React from 'react';
import AdviserSetQueue from '../Adviser/AdviserSetQueue';

const OpenQueueModal = ({open, setOpen, adviser, setAdviser}) => {
  
  
  const handleClose = () => setOpen(false);
  return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                style={{width:'40%', display:'flex', justifyContent:'center', alignItems:'center', margin:'0 auto'}}
            >
                <AdviserSetQueue handleClose={handleClose} adviser={adviser} setAdviser={setAdviser}/>
            </Modal>
        </div>
    );
}

export default OpenQueueModal;
