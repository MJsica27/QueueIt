import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, IconButton } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50dvw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight:'70lvh',
  overflowY:'auto',
  whiteSpace:'pre-wrap',
  borderRadius:'15px',
};

export default function MyModal({note, open, setOpen}) {
  const handleClose = () => setOpen(false);
  return (
    <div style={{maxHeight:'50vh',overflowY:'auto'}}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
                {note?note.subject:<></>}
            </Typography>
            <IconButton>
                <EditIcon/>
            </IconButton>
          </div>
          <Divider style={{border:'solid 2px black'}}/>
          <div dangerouslySetInnerHTML={{__html:note?note.body:<></>}}>

          </div>
        </Box>
      </Modal>
    </div>
  );
}
