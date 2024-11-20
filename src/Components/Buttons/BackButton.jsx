import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const BackButton = () => {
    const navigate = useNavigate();

    // Function to handle back navigation
    const handleBackClick = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
       
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="profile-tooltip">back</Tooltip>}>
         <span onClick={handleBackClick} style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
            <ArrowBackIosIcon /> 
        </span>
    </OverlayTrigger>
    );
};

export default BackButton;
