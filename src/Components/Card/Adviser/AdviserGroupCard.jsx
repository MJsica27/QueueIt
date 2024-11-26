import React from 'react';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function AdviserGroupCard({ group }) {
    return (            
    <NavLink to={`/group`} state={group} style={{ textDecoration: 'none' }}>
        <div className="navlinkcustom"
            style={{   
                padding: '15px',
                borderRadius: '5px',
                boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.1)',
                marginBottom: '10px',
                width: '200px',   
                height: '85px',   
                display: 'flex',   
                alignItems: 'center',
                justifyContent: 'center',
                margin: '10px', 
            }}>

                <Typography
                    variant="caption"
                    style={{ fontWeight: 'bold', fontSize: '15px', color: 'black' }} >  
                  {group.groupName || "Unnamed Group"} 
                </Typography>
                </div>
    </NavLink> 
    );
}
