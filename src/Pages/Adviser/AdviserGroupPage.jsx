import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../../Components/Buttons/BackButton'; 
import UserNavbar from '../../Components/Navbar/UserNavbar'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';   
import AdviserBackgroundPage from '../../Components/Backgound/AdviserBackgroundPage'; 
import OptionsMenu from '../../Components/Card/Adviser/OptionsMenu'; 
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import MemberProfileCard from '../../Components/Card/Adviser/MemberProfileCard';

export default function AdviserGroupPage() {
    const navigate = useNavigate(); 
    const location = useLocation();
    const group = location.state;
    const [members, setMembers] = useState([]);  
 
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');  
        }   
    }, [navigate]);
 
    useEffect(() => {
        if (group && group.groupID) {
            axios.get(`http://localhost:8080/group/getGroupMembers?groupID=${group.groupID}`)
                .then((response) => { 
                    setMembers(response.data);
                })
                .catch((error) => {
                    console.error("There was an error fetching the group members!", error);
                });
        }
    }, [group]);
  
    return ( 
        <div className="flex flex-col relative overflow-hidden items-center gap-4">
            
            <AdviserBackgroundPage /> 

            <UserNavbar /> 
            
            <div style={{ marginTop: '5px', height: 'auto', backgroundColor: '#000' ,  width: '88%', borderRadius: '15px 15px 0 0',   }}>

            <div style={{height:'750px', width: '100%', backgroundColor: '#7d57fc', borderRadius: '15px 15px 100px 100px',  }}>
 
                <div style={{ padding: '20px', height: '110px', width: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',  }} >
                    
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <BackButton />
                    </div>

                    <div style={{ color: 'white', textAlign: 'center', }} > 
                        <div className="text-8xl font-bold">{group.groupName}  </div> 
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="profile-tooltip">More options</Tooltip>}>
                            <div>
                                <OptionsMenu color="white" />
                            </div>
                        </OverlayTrigger>
                    </div>
                </div>

                <div>
                    <div className="text-4xl text-white font-bold mt-8 ml-10">Member</div> 
                    <div style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
                        {members.length > 0 ? (
                            members.map((member, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                                <MemberProfileCard
                                fullName={`${member.firstname} ${member.lastname}`} 
                                />
                            </div>
                            ))
                        ) : (
                            <div style={{ fontSize: '1.1rem', color: '#999', padding: '10px' }}>No members found.</div>
                        )}
                    </div>

                </div> 
                </div>


                <div style={{margin: '70px 20px 20px 20px'}}>
                    <div className="text-4xl text-white font-bold mt-8 ml-10">Consultation History</div>                 
                </div>


            </div>

            

                {/*  
                    Main Content Section
                    <div className="d-flex" style={{ flex: 1, padding: '20px', gap: '20px', overflowY: 'auto' }}>
                        Left Column
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{
                                backgroundColor: '#fff', 
                                height: '10%', 
                                padding: '10px 0 0 10px', 
                                borderRadius: '5px', 
                                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.4)'
                            }}>
                                <strong>Mentor:</strong>
                            </div>
                            <div style={{
                                backgroundColor: '#fff', 
                                height: '90%', 
                                padding: '10px 0 0 10px', 
                                borderRadius: '5px', 
                                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.4)'
                            }}>
                                <strong>Members:</strong>
                                <div style={{ margin: '10px 0 0 5px' }}>
                            dli pani final na code
                            {members.length > 0 ? (
                                members.map((member, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            height: '50px',                 
                                            fontSize: '1.2rem',            
                                            margin: '5px 10px 0 0',                
                                            borderBottom: '1px solid #979797',  
                                            display: 'flex',           
                                            alignItems: 'center',       
                                            padding: '5px 10px',         
                                            borderRadius: '5px',          
                                            backgroundColor: '#f8f8f8',   
                                            transition: 'background-color 0.3s ease',  
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#e0e0e0';  
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = '#f8f8f8';  
                                        }}
                                    >
                                        <AccountCircleIcon style={{ marginRight: '10px', color: '#333' }} />   
                                        <span>{member.firstname} {member.lastname}</span>
                                    </div>
                                ))
                            ) : (
                                <div style={{ fontSize: '1.1rem', color: '#999', padding: '10px' }}>No members found.</div>
                            )}
                        </div>

                            </div>
                        </div> 

                        Mid Column
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{
                                backgroundColor: '#fff', 
                                height: '100%', 
                                padding: '10px 0 0 10px', 
                                borderRadius: '5px', 
                                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.4)'
                            }}>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Journal</span> 
                            </div> 
                        </div> 
                        
                        Right Column
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{
                                backgroundColor: '#fff', 
                                height: '100%', 
                                padding: '10px 0 0 10px', 
                                borderRadius: '5px', 
                                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.4)'
                            }}>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Consultation</span> 
                            </div>
                        </div> 
                    </div>  
                </div> 
            </div>   */}
        </div>
    );
}
