import React, { useContext, useEffect, useRef, useState } from 'react';
import JandelStudentNavbar from '../../Components/Navbar/JandelStudentNavbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../../Static/OnQueuePage.css';
import { IconButton, Tooltip, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useWebSocket } from '../../Components/User/WebSocketContext';
import CategoryIcon from '@mui/icons-material/Category';
import { UserContext } from '../../Components/User/UserContext';

const OnQueuePage = () => {
    const location = useLocation()
    const {adviser, groupID} = location.state || {};
    const [teams, setTeams] = useState([]);
    const [onHoldTeams, setOnHoldTeams] = useState([]);
    const [tendingTeam, setTendingTeam] = useState(null);
    const [chats, setChats] = useState([]);
    const user = useContext(UserContext);
    const client = useWebSocket();
    const [message, setMessage] = useState("");
    const containerRef = useRef(null)
    const fetchTeams = async ()=>{
        try {
            const response = await fetch(`http://localhost:8080/queue/getQueueingTeams?adviserID=${adviser.user.userID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            switch (response.status) {
                case 200:
                    const data = await response.json();
                    // console.log(data.groups)
                    setTeams([...teams, ...data.groups])
                    setOnHoldTeams([...onHoldTeams, ...data.onHoldGroups])
                    setTendingTeam(data.tendingGroup)
                    break;
                case 404:
                    const message = await response.text();
                    toast.error(message);
                    break;
                default:
                    // toast.error("Something went wrong while fetching teams.");
            }
        } catch (error) {
            // toast.error("An error occurred: " + error.message);
        }
    }

    const holdQueue = async ()=>{
        try {
            const response = await fetch(`http://localhost:8080/queue/student/holdQueue?adviserID=${adviser.user.userID}&groupID=${groupID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            switch (response.status) {
                case 200:
                    const data = await response.json();
                    // console.log(data)
                    break;
                case 404:
                    const message = await response.text();
                    toast.error(message);
                    break;
                default:
                    // toast.error("Something went wrong while fetching teams.");
            }
        } catch (error) {
            // toast.error("An error occurred: " + error.message);
        }
    }

    const cancelQueue = async ()=>{
        try {
            const response = await fetch(`http://localhost:8080/queue/student/dequeue?adviserID=${adviser.user.userID}&groupID=${groupID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            switch (response.status) {
                case 200:
                    const data = await response.json();
                    // console.log(data)
                    break;
                case 404:
                    const message = await response.text();
                    toast.error(message);
                    break;
                default:
                    // toast.error("Something went wrong while fetching teams.");
            }
        } catch (error) {
            // toast.error("An error occurred: " + error.message);
        }
    }

    const requeue = async ()=>{
        try {
            const response = await fetch(`http://localhost:8080/queue/student/requeue?adviserID=${adviser.user.userID}&groupID=${groupID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            switch (response.status) {
                case 200:
                    const data = await response.json();
                    break;
                case 404:
                    const message = await response.text();
                    toast.error(message);
                    break;
                default:
                    // toast.error("Something went wrong while fetching teams.");
            }
        } catch (error) {
            // toast.error("An error occurred: " + error.message);
        }
    }

    const queue = async ()=>{
        try {
            const response = await fetch(`http://localhost:8080/queue/student/enqueue?adviserID=${adviser.user.userID}&groupID=${groupID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            switch (response.status) {
                case 200:
                    const data = await response.json();
                    break;
                case 404:
                    const message = await response.text();
                    toast.error(message);
                    break;
                default:
                    // toast.error("Something went wrong while fetching teams.");
            }
        } catch (error) {
            // toast.error("An error occurred: " + error.message);
        }
    }

    const sendMessage = async ()=>{
        try {
            if(message){
                const response = await fetch(`http://localhost:8080/chat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        "userID":user.user.userID,
                        "adviserID":adviser.user.userID,
                        "message":message
                    })
                });
            }
            setMessage("")
        } catch (error) {
            // toast.error("An error occurred: " + error.message);
        }
    }

    useEffect(()=>{ 
        if(containerRef.current){
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
        // console.log("nidagan")
    },[chats])

    useEffect(() => {
        // Update the clock every second (1000 milliseconds)
        updateClock();
        const clockInterval = setInterval(updateClock, 1000);

        fetchTeams();
        // console.log("this useeffect reran after receiving subscription message")
        return ()=>{
            clearInterval(clockInterval);
        }
    }, []);

    

    useEffect(() => {
        if (client) {
            const subscription = client.subscribe(`/topic/queueingTeamsStatus/student/enqueue/${adviser.user.userID}`,(message)=>{
                const receivedMessage = JSON.parse(message.body);
                // console.log(receivedMessage)
                setTeams((prevTeams) => [...prevTeams, receivedMessage]);
            })

            const subscription2 = client.subscribe(`/topic/queueingTeamsStatus/student/dequeue/${adviser.user.userID}`,(message)=>{
                const receivedMessage = JSON.parse(message.body);
                // console.log(receivedMessage)
                setTeams((prevTeams) => prevTeams.filter(team => team.groupID !== receivedMessage.groupID));
                setOnHoldTeams((prevTeams) => prevTeams.filter(team => team.groupID !== receivedMessage.groupID));
            })

            const subscription3 = client.subscribe(`/topic/queueingTeamsStatus/student/onHold/${adviser.user.userID}`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                // console.log(receivedMessage)
                
                setOnHoldTeams((prevTeams) => {
                    // Combine previous teams and receivedMessage
                    const combinedTeams = [...prevTeams, receivedMessage];
                
                    // Sort the combined array based on queueingTimeStart
                    return combinedTeams.sort((a, b) => {
                        const timeA = a.queueingTimeStart.split(':').map(Number);
                        const timeB = b.queueingTimeStart.split(':').map(Number);
                
                        const totalSecondsA = timeA[0] * 3600 + timeA[1] * 60 + timeA[2];
                        const totalSecondsB = timeB[0] * 3600 + timeB[1] * 60 + timeB[2];
                
                        return totalSecondsA - totalSecondsB; // Ascending order
                    });
                });

                setTeams((prevTeams) => prevTeams.filter(team => team.groupID !== receivedMessage.groupID));
            });

            const subscription4 = client.subscribe(`/topic/queueingTeamsStatus/student/requeue/${adviser.user.userID}`,(message)=>{
                const receivedMessage = JSON.parse(message.body);
                // console.log(receivedMessage)
                setTeams((prevTeams) => {
                    // Combine previous teams and receivedMessage
                    const combinedTeams = [...prevTeams, receivedMessage];
                
                    // Sort the combined array based on queueingTimeStart
                    return combinedTeams.sort((a, b) => {
                        const timeA = a.queueingTimeStart.split(':').map(Number);
                        const timeB = b.queueingTimeStart.split(':').map(Number);
                
                        const totalSecondsA = timeA[0] * 3600 + timeA[1] * 60 + timeA[2];
                        const totalSecondsB = timeB[0] * 3600 + timeB[1] * 60 + timeB[2];
                
                        return totalSecondsA - totalSecondsB; // Ascending order
                    });
                });
                setOnHoldTeams((prevTeams) => prevTeams.filter(team => team.groupID !== receivedMessage.groupID));
            })

            const chatSubscription = client.subscribe(`/topic/chat/adviser/${adviser.user.userID}`,(message)=>{
                const receivedMessage = JSON.parse(message.body);
                // console.log(receivedMessage)
                setChats((prevMessages)=>[...prevMessages, receivedMessage]);
            })

            // Cleanup subscription on unmount
            return () => {
                subscription.unsubscribe();
                subscription2.unsubscribe();
                subscription3.unsubscribe();
                subscription4.unsubscribe();
                chatSubscription.unsubscribe();
            };
        }
    }, [client]);

    function updateClock() {
        const now = new Date(); // Get the current date and time
        let hours = now.getHours(); // Get hours in 24-hour format
        const minutes = String(now.getMinutes()).padStart(2, '0'); // Get minutes and pad with leading zero if needed
        // const seconds = String(now.getSeconds()).padStart(2, '0'); // Get seconds and pad with leading zero if needed
    
        // Convert to 12-hour format
        const isPM = hours >= 12; // Determine if it's PM
        hours = hours % 12; // Convert to 12-hour format
        hours = hours ? String(hours).padStart(1, '0') : '12'; // Adjust for 0 hour case
    
        // Format the time as HH:MM:SS AM/PM
        const currentTime = `${hours}:${minutes} ${isPM ? 'PM' : 'AM'}`;
    
        // Update the clock div with the current time
        document.getElementById('timeContainer').textContent = currentTime;
    }
    
    
    
    return (
        <div id='mainContainer'>
            <JandelStudentNavbar/>
            <div id="QueuePageSecondRowContainer">
                <div id="leftContainer">
                    <div id="adviserInfoContainer">
                        <AccountCircleIcon className='adviserProfilePhoto'/>
                        <div style={{display:'flex', flexDirection:'column',justifyItems:'center'}}>
                            {adviser?<span id='adviserName'>{adviser.user.firstname.charAt(0).toUpperCase()+adviser.user.firstname.slice(1)+" "+adviser.user.lastname.charAt(0).toUpperCase()+adviser.user.lastname.slice(1)}</span>:<></>}
                            <a href='/' style={{color:'#6ABf05'}}>View Profile</a>
                        </div>
                        <span style={{flex:1, display:'flex',justifyContent:'end', paddingInlineEnd:'2em'}}>Queueing ends 3:00 pm</span>
                    </div>
                    <div id="QueueingInformationContainer">
                        <div id="upNextContainer">
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                <Typography variant='subtitle1' fontWeight='bold' color='gray'>Up Next</Typography>
                                {
                                    teams.some(team => team.groupID === groupID) || onHoldTeams.some(team => team.groupID === groupID) ?<></>:<Button size='sm' style={{paddingInline:'1.5em', border:'none'}} className='buttonCustom' onClick={queue} >Queue</Button>
                                }
                                
                            </div>
                                {teams.length > 0?
                                
                                    <>
                                        {teams.map((team,index)=>(
                                            groupID == team.groupID?

                                            <>
                                            <div id='queueingTeamContainer' style={{backgroundColor:'rgba(185,255,102,0.22)'}} key={index}>
                                                <div id='indexNumber'>{index+1}</div>
                                                <div id="queueingTeamMiniProfile"></div>
                                                <div id="queueingTeamInformationLive">
                                                    <div id='queueingTeamNameLive'>{team.groupName}</div>
                                                    <div id='queueingTeamSectionLive'>{`${team.subjectCode} - ${team.section}`}</div>
                                                    <Button size='sm' style={{paddingInline:'1.5em', backgroundColor:'#FFD466', border:'none'}} className='buttonCustom' onClick={holdQueue}>Hold</Button>
                                                    <Button size='sm' style={{marginLeft:'5px', paddingInline:'1em', backgroundColor:'#FF6666', border:'none'}} className='buttonCustom' onClick={cancelQueue}>Cancel</Button>
                                                </div>
                                                
                                            </div>
                                            </>
                                            :
                                            <div id='queueingTeamContainer' key={index}>
                                                <div id='indexNumber'>{index+1}</div>
                                                <div id="queueingTeamMiniProfile"></div>
                                                <div id="queueingTeamInformationLive">
                                                    <div id='queueingTeamNameLive'>{team.groupName}</div>
                                                    <div id='queueingTeamSectionLive'>{`${team.subjectCode} - ${team.section}`}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                    :
                                    <>
                                        <div style={{margin:'0 auto', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                            <CategoryIcon style={{fontSize:'15dvw', color:'gray'}}/>
                                            <Typography style={{fontSize:'2.5dvw', color:'gray'}}>Awaiting queueing teams.</Typography>
                                        </div>
                                    </>
                                }
                        </div>
                        <div id="nextToUpNextContainer">
                            <div id="timeContainer">

                            </div>
                            <div id="onHoldContainer">
                                {onHoldTeams.map((team,index)=>(
                                    team.groupID == groupID?
                                        <>
                                            <div id='queueingTeamContainer' style={{flexDirection:'column'}}>
                                                <div id='queueingTeamContainer'>
                                                    <div id='indexNumber' style={{backgroundColor:'#FFD466'}}>{index+1}</div>
                                                    <Tooltip title={team.groupName}>
                                                        <div id="queueingTeamMiniProfile"></div>
                                                    </Tooltip>
                                                </div>
                                                <div>
                                                    <Button size='sm' style={{paddingInline:'1.5em', border:'none'}} className='buttonCustom' onClick={requeue}>Requeue</Button>
                                                    <Button size='sm' style={{marginLeft:'5px', paddingInline:'1em', backgroundColor:'#FF6666', border:'none'}} className='buttonCustom' onClick={cancelQueue}>Cancel</Button>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div id='queueingTeamContainer'>
                                                <div id='indexNumber' style={{backgroundColor:'#FFD466'}}>{index+1}</div>
                                                <Tooltip title={team.groupName}>
                                                    <div id="queueingTeamMiniProfile"></div>
                                                </Tooltip>
                                            </div>
                                        </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>





                <div id="rightContainer">
                    <div id="currentlyTendingContainer">
                        <Typography variant='subtitle1' fontWeight='bold' color='gray'>Currently Tending</Typography>
                        <div id='queueingTeamContainer' style={{gap:'10px', alignItems:'start', marginTop:'5px'}}>
                            {tendingTeam?
                                <>
                                    <div id="queueingTeamMiniProfile"></div>
                                    <div>
                                        <div id='queueingTeamNameLive'>{tendingTeam.groupName}</div>
                                        <div id='queueingTeamSectionLive'>{`${tendingTeam.subjectCode} - ${tendingTeam.section}`}</div>
                                        <div style={{color:'#6abf05'}}>Time elapsed: 23 minutes</div>
                                    </div>    
                                </>
                                :
                                <>Walay sulod tending team</>
                            }
                        </div>
                    </div>
                    <div id="ChatBoxContainer">
                        <Typography variant='subtitle1' fontWeight='bold' color='gray'>Chat</Typography>
                        <div id="chatBoxFeed" ref={containerRef}>
                            <div id="welcomeChatMessage">
                                Welcome to {`${adviser.firstname} ${adviser.lastname}'s chat!`}
                            </div>
                            <div style={{marginTop:'30px', display:'flex', flexDirection:'column', gap:'20px', maxWidth:'100%', overflow:'hidden'}}>
                                {chats.map((chat,index)=>(
                                    <div style={{display:'flex',justifyContent:chat.userID==user.user.userID?'end':'start', flexDirection:chat.userID == user.user.userID?'row-reverse':'row', gap:'8px', maxWidth:'100%', overflow:'hidden',flexGrow:1}}>
                                        <div id="chatProfile"></div>
                                        <div style={{display:'flex', flexDirection:'column', flexGrow:1, maxWidth:'100%'}}>
                                            <div style={{fontSize:'0.7em',alignSelf:chat.userID == user.user.userID?'end':'', color:'gray'}}>{`${chat.firstname.charAt(0).toUpperCase()}${chat.firstname.slice(1)} ${chat.lastname.charAt(0).toUpperCase()}${chat.lastname.slice(1)}`}</div>
                                            <div style={{backgroundColor:'rgba(217,217,217,0.5)', paddingBlock:'5px', borderRadius:'20px', paddingInline:'15px', display:'flex',wordBreak:'break-word', maxWidth:'70%',alignSelf:chat.userID == user.user.userID?'end':''}}>
                                                {chat.message}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                        <div id="chatboxUtilities" style={{display:'flex', marginTop:'10px'}}>
                            <input style={{flexGrow:1}} type='text' placeholder='Enter message.' id='messageInput' onChange={(e)=>{setMessage(e.target.value)}} value={message}/>
                            <IconButton onClick={sendMessage}>
                                <SendIcon style={{color:'black'}}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OnQueuePage;