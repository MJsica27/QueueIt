import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography } from '@mui/material';
import { Button } from 'react-bootstrap';

const AdviserQueueingCard = ({adviserID}) => {
    const [adviser,setAdviser] = useState(null);
    const socket = new SockJS('http:/localhost:8080/ws');
    const client = Stomp.over(socket);

    const fetchAdviser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user/getAdviser?userID=${adviserID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            switch (response.status) {
                case 200:
                    const data = await response.json();
                    setAdviser(data); // Update the adviser state
                    client.debug = ()=>{};
                    client.connect({},()=>{
                        client.subscribe(`/topic/queueStatus/adviser/${data.user.userID}`,(message)=>{
                            const receivedMessage = JSON.parse(message.body);
                            console.log(receivedMessage);
                            setAdviser(receivedMessage);
                        })
                    })

                    setStompClient(client);
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

    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        fetchAdviser();
        
        return () => {
            if(client.connected){
                client.disconnect();
            }
        };
    }, []);


    return (
        <div
            style={{
                display:'flex',
                flexDirection:'column',
                flex:1
            }}
        >
            {adviser?
                <>
                    <div style={{justifyContent:'center', flex:2,alignItems:'center', display:'flex'}}>
                        <AccountCircleIcon style={{fontSize:'15em', color:'gray'}}/>
                    </div>
                    <div style={{padding:'0px 2em 0px 2em', display:'flex', flexDirection:'column', flex:1}}>
                        <Typography style={{fontFamily:'poppins', fontSize:'1.5em'}} variant='h4'>{adviser.user.firstname.charAt(0).toUpperCase()+adviser.user.firstname.slice(1)+" "+adviser.user.lastname.charAt(0).toUpperCase()+adviser.user.lastname.slice(1)}</Typography>
                        <Typography variant='caption' fontFamily='poppins' color='gray' fontSize='0.9em'> Last seen x minutes ago.</Typography>
                        <a href='/' style={{textDecorationColor:'#6abf05', width:'fit-content'}}><Typography variant='subtitle2' fontSize='0.9em' fontFamily='poppins' color='#6abf05'>View Profile</Typography></a>
                    </div>
                    <div style={{padding:'0em 2em 1em 2em', flex:1.3, display:'flex'}}>
                        {adviser.ready?
                            <>
                                <div style={{backgroundColor:'rgba(185,255,102,0.22)', flex:1,borderRadius:'3px', textAlign:'center', display:'flex',justifyContent:'center', flexDirection:'column', padding:'0px 1em 0px 1em'}}>
                                    <Typography style={{color:'#457B06'}} variant='h4' fontSize='3rem'>Available</Typography>
                                    <Typography style={{color:'gray', fontSize:'0.8em'}}>x groups in queue.</Typography>
                                    <span><Button size='lg' style={{backgroundColor:'#b9ff66',color:'black',border:'none', fontWeight:'bold'}}>Queue</Button></span>
                                </div>
                            </>
                            :
                            <>
                                <div style={{backgroundColor:'#FBD9d9', flex:1,borderRadius:'3px', textAlign:'center', display:'flex',justifyContent:'center', flexDirection:'column', padding:'0px 1em 0px 1em'}}>
                                    <Typography style={{color:'rgba(255,0,0,0.5)'}} variant='h3'>Unavailable</Typography>
                                    <Typography style={{color:'gray', fontSize:'0.8em'}}>View this person's profile for schedule details.</Typography>
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
