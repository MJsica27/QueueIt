import React from 'react';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function AdviserGroupCard({ group }) {
    return (
        <div
            style={{
                backgroundColor: 'lightgreen',
                padding: '15px',
                borderRadius: '5px',  
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
                marginBottom: '10px',   
                width: '100%'  
            }}
        >
            <NavLink to={`/group`} state={group} style={{ textDecoration: 'none' }}>
                <Typography
                    variant="caption"
                    style={{
                        fontWeight: 'bold',
                        fontSize: '15px',
                        color: 'black'
                    }}
                >
                    {group.groupName || "Unnamed Group"}
                </Typography>
            </NavLink>
        </div>
    );
}
