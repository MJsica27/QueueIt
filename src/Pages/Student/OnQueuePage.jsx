import React, { useEffect, useState } from 'react';
import JandelStudentNavbar from '../../Components/Navbar/JandelStudentNavbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../../Static/OnQueuePage.css';
import { IconButton, Tooltip, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useWebSocket } from '../../Components/User/WebSocketContext';

const OnQueuePage = () => {
    const location = useLocation()
    const {adviser, groupID} = location.state || {};
    const [teams, setTeams] = useState([]);

    const client = useWebSocket();

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
                    break;
                case 404:
                    const message = await response.text();
                    toast.error(message);
                    break;
                default:
                    toast.error("Something went wrong while fetching teams.");
            }
        } catch (error) {
            toast.error("An error occurred: " + error.message);
        }
    }

    useEffect(() => {
        // Update the clock every second (1000 milliseconds)
        updateClock();
        const clockInterval = setInterval(updateClock, 1000);

        fetchTeams();
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
            })

            // Cleanup subscription on unmount
            return () => {
                subscription.unsubscribe();
                subscription2.unsubscribe();
            };
        }
    }, [client]);


    // const teams = [
    //     {
    //         "groupID":1,
    //         "classID":2,
    //         "mentorID":3,
    //         "groupName":"Natus Vincere",
    //         "subjectCode":"IT322",
    //         "section":"G1"
    //     },
    //     {
    //         "groupID":2,
    //         "classID":2,
    //         "mentorID":3,
    //         "groupName":"Team Liquid",
    //         "subjectCode":"IT321",
    //         "section":"F2"
    //     },
    //     {
    //         "groupID":3,
    //         "classID":2,
    //         "mentorID":3,
    //         "groupName":"Team Bangan",
    //         "subjectCode":"IT322",
    //         "section":"G01"
    //     },
    //     {
    //         "groupID":5,
    //         "classID":2,
    //         "mentorID":3,
    //         "groupName":"Team Secret",
    //         "subjectCode":"IT301",
    //         "section":"F1  "
    //     },
    //     {
    //         "groupID":7,
    //         "classID":2,
    //         "mentorID":3,
    //         "groupName":"Team LAIN NAPUD!",
    //         "subjectCode":"IT301",
    //         "section":"F1  "
    //     },

    // ]

    const onHoldTeams = [
        
        {
            "groupID":4,
            "classID":2,
            "mentorID":3,
            "groupName":"Team OnHold",
            "subjectCode":"IT301",
            "section":"F1  "
        },
    ]

    const tendingTeam = {
        "groupID":6,
        "classID":2,
        "mentorID":3,
        "groupName":"Team Tending hehe",
        "subjectCode":"IT301",
        "section":"F1  "
    }

    // const adviser = {
    //     "firstname":"ice",
    //     "lastname":"man",
    //     "photoURL":""
    // }

    const chats = [
        {
            "userID":1,
            "firstname":"jandel",
            "lastname":"macabecha",
            "photoURL":"",
            "message":"test message lamang  hehekz"
        },
        {
            "userID":2,
            "firstname":"shimbal",
            "lastname":"gisaeki",
            "photoURL":"",
            "message":"test message lamang  hehekz"
        },
        {
            "userID":3,
            "firstname":"xaler",
            "lastname":"vivi",
            "photoURL":"",
            "message":"GAE SAEKEIYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ASLKDNNDOPQWE ALSD NA;LSND ;LQWEQWE"
        },
        {
            "userID":3,
            "firstname":"xaler",
            "lastname":"vivi",
            "photoURL":"",
            "message":"KGHWQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQWEQWEQWEQWEASASDASDQWEQWE"
        },
        {
            "userID":1,
            "firstname":"jandel",
            "lastname":"macabecha",
            "photoURL":"",
            "message":"test message lamang  hehekz"
        },
        {
            "userID":2,
            "firstname":"shimbal",
            "lastname":"gisaeki",
            "photoURL":"",
            "message":"test message lamang  hehekz"
        },
        {
            "userID":3,
            "firstname":"xaler",
            "lastname":"vivi",
            "photoURL":"",
            "message":"GAE SAEKEIYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ASLKDNNDOPQWE ALSD NA;LSND ;LQWEQWE"
        },
        {
            "userID":3,
            "firstname":"xaler",
            "lastname":"vivi",
            "photoURL":"",
            "message":"KGHWQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQWEQWEQWEQWEASASDASDQWEQWE"
        },
    ]

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
                            <Typography variant='subtitle1' fontWeight='bold' color='gray'>Up Next</Typography>
                                {teams.map((team,index)=>(
                                    groupID == team.groupID?

                                    <>
                                    <div id='queueingTeamContainer' style={{backgroundColor:'rgba(185,255,102,0.22)'}} key={index}>
                                        <div id='indexNumber'>{index+1}</div>
                                        <div id="queueingTeamMiniProfile"></div>
                                        <div id="queueingTeamInformationLive">
                                            <div id='queueingTeamNameLive'>{team.groupName}</div>
                                            <div id='queueingTeamSectionLive'>{`${team.subjectCode} - ${team.section}`}</div>
                                            <Button size='sm' style={{paddingInline:'1.5em', backgroundColor:'#FFD466', border:'none'}}>Hold</Button>
                                            <Button size='sm' style={{marginLeft:'5px', paddingInline:'1em', backgroundColor:'#FF6666', border:'none'}}>Cancel</Button>
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
                        </div>
                        <div id="nextToUpNextContainer">
                            <div id="timeContainer">

                            </div>
                            <div id="onHoldContainer">
                                {onHoldTeams.map((team,index)=>(
                                    <div id='queueingTeamContainer'>
                                        <div id='indexNumber' style={{backgroundColor:'#FFD466'}}>{index+1}</div>
                                        <Tooltip title={team.groupName}>
                                            <div id="queueingTeamMiniProfile"></div>
                                        </Tooltip>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>





                <div id="rightContainer">
                    <div id="currentlyTendingContainer">
                        <Typography variant='subtitle1' fontWeight='bold' color='gray'>Currently Tending</Typography>
                        <div id='queueingTeamContainer' style={{gap:'10px', alignItems:'start', marginTop:'5px'}}>
                            <div id="queueingTeamMiniProfile"></div>
                            <div>
                                <div id='queueingTeamNameLive'>{tendingTeam.groupName}</div>
                                <div id='queueingTeamSectionLive'>{`${tendingTeam.subjectCode} - ${tendingTeam.section}`}</div>
                                <div style={{color:'#6abf05'}}>Time elapsed: 23 minutes</div>
                            </div>
                        </div>
                    </div>
                    <div id="ChatBoxContainer">
                        <Typography variant='subtitle1' fontWeight='bold' color='gray'>Chat</Typography>
                        <div id="chatBoxFeed">
                            <div id="welcomeChatMessage">
                                Welcome to {`${adviser.firstname} ${adviser.lastname}'s chat!`}
                            </div>
                            <div style={{marginTop:'30px', display:'flex', flexDirection:'column', gap:'20px', maxWidth:'100%', overflow:'hidden'}}>
                                {chats.map((chat,index)=>(
                                    <div style={{display:'flex',justifyContent:chat.userID==2?'end':'start', flexDirection:chat.userID == 2?'row-reverse':'row', gap:'8px', maxWidth:'100%', overflow:'hidden',flexGrow:1}}>
                                        <div id="chatProfile"></div>
                                        <div style={{display:'flex', flexDirection:'column', flexGrow:1, maxWidth:'100%'}}>
                                            <div style={{fontSize:'0.7em',alignSelf:chat.userID == 2?'end':'', color:'gray'}}>{`${chat.firstname.charAt(0).toUpperCase()}${chat.firstname.slice(1)} ${chat.lastname.charAt(0).toUpperCase()}${chat.lastname.slice(1)}`}</div>
                                            <div style={{backgroundColor:'rgba(217,217,217,0.5)', paddingBlock:'5px', borderRadius:'20px', paddingInline:'15px', display:'flex',wordBreak:'break-word', maxWidth:'70%',alignSelf:chat.userID == 2?'end':''}}>
                                                {chat.message}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                        <div id="chatboxUtilities" style={{display:'flex', marginTop:'10px'}}>
                            <input style={{flexGrow:1}} type='text' placeholder='Enter message.' id='messageInput'/>
                            <IconButton>
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
