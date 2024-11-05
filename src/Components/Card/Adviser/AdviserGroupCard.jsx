import React from 'react';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function AdviserGroupCard({ group }) {
    return (
        <div>
            <NavLink to={`/group`} state={group} style={{ textDecoration: 'none' }}>
                <Typography
                    variant="caption"
                    style={{
                        fontWeight: 'bold',
                        fontSize: '15px',
                        color: 'black'
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',  // Set to light green as requested
                            padding: '15px',
                            borderRadius: '5px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            marginBottom: '10px',
                            width: '200px',  // Fixed width
                            height: '85px',  // Fixed height
                            display: 'flex',  // Center content vertically and horizontally
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {group.groupName || "Unnamed Group"}
                    </div>
                </Typography>
            </NavLink>
        </div>
    );
}
