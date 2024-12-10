import React from 'react'; 
import { NavLink } from 'react-router-dom'; 
import { OverlayTrigger, Tooltip } from 'react-bootstrap'; 
import OptionsMenu from '../Adviser/OptionsMenu'; 

export default function AdviserGroupCard({ group }) {
    return (            
    <NavLink to={`/group`} state={group} style={{ textDecoration: 'none' }}>
        <div className="navlinkcustom"
            style={{   
                paddingLeft: '25px',
                borderRadius: '5px',
                boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.1)',
                marginBottom: '10px',
                width: '530px',   
                height: '100px',     
                alignItems: 'center', 
                margin: '10px', 
                border: '1px solid black',
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                fontWeight: 'bold', fontSize: '18px', color: 'black', textAlign: 'left',
            }}>  
                  {group.groupName || "Unnamed Group"}  
                  
            {/* kuwang panig onAction */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="profile-tooltip">More options</Tooltip>}>
                    <div>
                        <OptionsMenu color="black" />
                    </div>
                </OverlayTrigger>
            </div>
        </div>
        
    </NavLink> 
    );
}
