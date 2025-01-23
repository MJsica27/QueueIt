import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'

export default function JournalCard({journal}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
    return (
        <div style={{borderTop:'solid 1px white', width:'100%', height:'100px', padding:'0.5em', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
                <h3 style={{fontWeight:'bold', color:'white'}}>Week {journal.weekNumber}</h3>
                <h6 style={{color:'white'}}>{journal.studentName}</h6>
                <span style={{color:'white'}}>{journal.entryDate?new Date(journal.entryDate).toLocaleDateString():<></>}</span>
            </div>
            <div>
                <IconButton onClick={handleClick}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}><MoreHorizIcon style={{color:'white'}}/></IconButton>
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
  )
}
