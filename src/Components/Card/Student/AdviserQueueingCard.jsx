import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useWebSocket } from '../../User/WebSocketContext';

const AdviserQueueingCard = ({groupID, classroom}) => {
    const [adviser,setAdviser] = useState(null);
    const client = useWebSocket();
    const fetchAdviser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user/getAdviser?userID=${classroom.adviserID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            switch (response.status) {
                case 200:
                    const data = await response.json();
                    setAdviser(data); // Update the adviser state
                
                    break;
                case 404:
                    const message = await response.text();
                    toast.error(message);
                    break;
                default:
                    toast.error("Something went wrong while fetching adviser details.");
            }
        } catch (error) {
            toast.error("An error occurred: " + error.message);
        }
    };
    

    useEffect(() => {
        fetchAdviser();
    }, []);

    useEffect(() => {
        if (client && adviser) {
            const subscription = client.subscribe(`/topic/queueStatus/adviser/${adviser.user.userID}`,(message)=>{
                const receivedMessage = JSON.parse(message.body);
                setAdviser(receivedMessage);
            })

            // Cleanup subscription on unmount
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [client, adviser]);


    return (
        <div style={{ border:'solid 1px black', flex:1, borderRadius:'15px', display:'flex', flexDirection:'column', alignItems:'center', padding:'1em 0.5em', backgroundColor:'white', height:'100%'}} >
            {adviser?
                <>
                    <div style={{justifyContent:'center', alignItems:'center', display:'flex', flexDirection:'column'}}>
                        <Typography fontWeight='bold'>Adviser</Typography>
                        <AccountCircleIcon style={{fontSize:'calc(6em + 1dvw)', color:'gray'}}/>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography style={{fontFamily:'poppins', fontSize:'calc(1em + 1dvw)', fontWeight:'bold'}}>{adviser.user.firstname.charAt(0).toUpperCase()+adviser.user.firstname.slice(1)+" "+adviser.user.lastname.charAt(0).toUpperCase()+adviser.user.lastname.slice(1)}</Typography>
                        <Typography variant='caption' fontFamily='poppins'> Last seen x minutes ago.</Typography>
                        <a href='/' style={{textDecorationColor:'#000', width:'fit-content', marginTop:'10px'}}><Typography variant='subtitle2' fontFamily='poppins' color='#000'>View Profile</Typography></a>
                    </div>
                    <div style={{display:'flex', flexGrow:1, width:'100%', alignItems:'center', justifyContent:'center'}}>
                        {adviser.ready && (adviser.cateringClasses.includes(classroom.classID) || adviser.cateringClasses.includes(0))?
                            <>
                                <div style={{backgroundColor:'#CCBCFF', borderRadius:'15px', textAlign:'center', display:'flex',justifyContent:'center', flexDirection:'column', alignItems:'center', padding:'1em 2em'}}>
                                <div style={{paddingInline:'10%', fontWeight:'bold', fontSize:'calc(1em + 1dvw)', color:'rgba(106,191,5,0.8)'}}>Available</div>
                                    
                                    {

                                        groupID?
                                            <>
                                                <div style={{color:'gray', fontSize:'0.7em', paddingInline:'10%'}}>x groups in queue</div>
                                                <NavLink 
                                                    style={{textDecoration:'none'}}
                                                    state={{adviser, groupID}}
                                                    to={'/onQueuePage'}
                                                    className='primaryBTN'
                                                    >
                                                    Queue
                                                </NavLink>
                                            </>
                                            :
                                            <div style={{color:'gray', fontSize:'0.7em', paddingInline:'10%'}}>Proceed to team formation first.</div>
                                            
                                    }
                                </div>
                            </>
                            :
                            <>
                                <div style={{backgroundColor:'#CCBCFF', borderRadius:'15px', textAlign:'center', display:'flex',justifyContent:'center', flexDirection:'column', alignItems:'center', padding:'1em 2em'}}>
                                    <div style={{paddingInline:'10%', fontWeight:'bold', fontSize:'calc(1em + 1dvw)', color:'rgba(255,0,0,0.7)'}}>Unavailable</div>
                                    <div style={{color:'gray', fontSize:'0.7em', paddingInline:'10%'}}>View this person's profile for schedule details.</div>
                                </div>
                            </>
                        }
                    </div>
                </>
                :
                // if wala pay sulod ang adviser variable
                <></>
            }
            
        </div>
    );
}

export default AdviserQueueingCard;
