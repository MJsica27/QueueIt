import { IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';

const Note = ({note, setSubject, setBody, setNoteToggle, setNote}) => {
    const [user,setUser] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const fetchUser = async () => {
        if(note){
            try {
                const response = await fetch(`http://localhost:8080/user/userDetails?userID=${note.noteTakerUserID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
    
                switch (response.status) {
                    case 200:
                        const data = await response.json();
                        // console.log(data)
                        setUser(data);
                        break;
                    case 404:
                        toast.error("Note taker not found.");
                        break;
                    default:
                        toast.error("Something went wrong while fetching adviser details.");
                }
            } catch (error) {
                // toast.error("An error occurred: " + error.message);
                // toast.error("Something went wrong while fetching adviser details.");
                console.log(error)
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, [note]);
    return (
        <div style={{backgroundColor:'#f4f4f4', display:'flex', borderRadius:'15px',boxShadow:'0px 4px 4px rgba(0,0,0,0.2)', alignItems:'center'}}>
            <div style={{display:'flex', flexDirection:'column', flex:1, padding:'1em',  borderRadius:'15px',cursor:'pointer'}} onClick={()=>{setNoteToggle(true); setNote(note)}}>
                <Typography variant='h5' fontWeight='bold'>{note.subject}</Typography>
                <span style={{color:'gray'}}>{note.dateTaken?new Date(note.dateTaken).toDateString():<></>}</span>
                <span style={{color:'gray', fontSize:'0.8em', textDecoration:'underline'}}>{user?user.firstname:<></>} {user?user.lastname:<></>}</span>
            </div>
            <div>
                <IconButton
                    onClick={handleClick}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                ><MoreHorizIcon/></IconButton>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem>
                        <ListItemIcon>
                            <DeleteIcon/> Delete
                        </ListItemIcon>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
}

export default Note;
