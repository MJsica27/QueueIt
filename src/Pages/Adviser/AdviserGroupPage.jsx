import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../../Components/Buttons/BackButton'; 
import UserNavbar from '../../Components/Navbar/UserNavbar'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';  

export default function AdviserGroupPage() {
    const navigate = useNavigate();
    const [user] = useState();
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
                    // Assuming the response contains a list of members
                    setMembers(response.data);
                })
                .catch((error) => {
                    console.error("There was an error fetching the group members!", error);
                });
        }
    }, [group]);
  
    return ( 
        <div className="m-0 vh-100" style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundColor: '#fff', height: '95vh' }}>
            <UserNavbar />
{/* 
            <div className="d-flex align-items-center justify-content-center"> 
                <div style={{
                    backgroundColor: 'rgba(0,0,0,0.03)', 
                    borderRadius: '5px', 
                    color: '#333',  
                    width: '90%', 
                    overflow: 'hidden', 
                    height: '85vh', 
                    margin: '20px 0',
                    display: 'flex', 
                    flexDirection: 'column'
                }}>
                    Header Section
                    <div style={{
                        fontWeight: 'bold',   
                        height: '50px', 
                        fontSize: '22px', 
                        padding: '0 20px', 
                        color: '#000', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between'
                    }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                            <BackButton />
                            {group.groupName}   
                        </span> 
                    </div>

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
