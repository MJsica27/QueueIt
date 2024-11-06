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
                            padding: '15px',
                            borderRadius: '5px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            marginBottom: '10px',
                            width: '200px',   
                            height: '85px',   
                            display: 'flex',   
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '10px',
                            backgroundColor: '#eee',
                            border: '1px solid #2e2e2e'
                        }}
                    >
                        {group.groupName || "Unnamed Group"}
                    </div>
                </Typography>
            </NavLink>
        </div>
    );
}
