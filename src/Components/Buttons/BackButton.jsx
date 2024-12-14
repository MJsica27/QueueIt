import React from 'react';
import { useNavigate } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const BackButton = () => {
    const navigate = useNavigate();

    // Function to handle back navigation
    const handleBackClick = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
       
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="profile-tooltip">back</Tooltip>}>
         <span 
            onClick={handleBackClick} 
            style={{
                color: '#7D57FC',
                backgroundColor: 'white',
                display: 'flex', // Changed from 'inline-flex' to 'flex'
                justifyContent: 'center', // Horizontally center the arrow
                alignItems: 'center', // Vertically center the arrow
                height: '30px',
                width: '30px',
                borderRadius: '50%', // Alternative shorthand for a circular shape
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Optional: Adds a subtle shadow for visual polish
                cursor: 'pointer' // Optional: Makes it clear it's clickable
            }}
            >
            <WestIcon />
        </span>

    </OverlayTrigger>
    );
};

export default BackButton;
