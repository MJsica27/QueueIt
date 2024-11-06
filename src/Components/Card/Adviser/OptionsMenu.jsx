import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
 
const OptionsMenu = ({ onAction, color }) => {
    const [anchorEl, setAnchorEl] = useState(null);
 
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);  
    };
 
    const handleMenuClose = () => {
        setAnchorEl(null);  
    }; 
    const handleAction = (action) => {
        onAction(action); 
        handleMenuClose(); 
    };

    return (
        <div>
            <IconButton onClick={handleMenuClick} style={{ color: color || 'white' }}>  
                <MoreHorizIcon />
            </IconButton>
 
            <Menu
                anchorEl={anchorEl}  
                open={Boolean(anchorEl)} 
                onClose={handleMenuClose}  
            >
                <MenuItem onClick={() => handleAction('View Enrolled Students')}>
                    View Enrolled Students
                </MenuItem>
                <MenuItem onClick={() => handleAction('Edit Classroom')}>
                    Edit Classroom
                </MenuItem>
                <MenuItem onClick={() => handleAction('Delete Classroom')}>
                    Delete Classroom
                </MenuItem>
            </Menu>
        </div>
    );
};

export default OptionsMenu;
