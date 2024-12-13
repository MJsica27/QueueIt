import React, { useContext, useEffect, useRef, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../../Static/OnQueuePage.css';
import { IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useWebSocket } from '../../Components/User/WebSocketContext';
import CategoryIcon from '@mui/icons-material/Category';
import { UserContext } from '../../Components/User/UserContext';
import UserNavbar from '../../Components/Navbar/UserNavbar';
import { capitalizeFirstLetter } from '../../Components/Utils/Utils';
import Queue from '../../Components/Queue';
import YourTurnModal from '../../Components/Modal/YourTurnModal';
import RichTextEditor from '../../Components/Utils/RichTextEditor';
import Note from '../../Components/Card/Note';
import MyModal from '../../Components/Modal/Modal';
import NoteAltIcon from '@mui/icons-material/NoteAlt';

const OnQueuePage = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const {adviser, groupID} = location.state || {};
    const [teams, setTeams] = useState([]);
    const [onHoldTeams, setOnHoldTeams] = useState([]);
    const [tendingTeam, setTendingTeam] = useState(null);
    const [chats, setChats] = useState([]);
    const user = useContext(UserContext).user;
    const client = useWebSocket();
    const [message, setMessage] = useState("");
    const containerRef = useRef(null)
    const [time, setTime] = useState("");
    const [myAdviser, setAdviser] = useState(adviser);
    const [loading, setLoading] = useState(false);
    const [open,setOpen] = useState(false);
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [notes, setNotes] = useState([]);
    const [noteToggle, setNoteToggle]= useState(false);
    const [note, setNote] = useState(null);

    useEffect(() => {

        if(user){
           if(user.role === "STUDENT"){
             // Update the clock every second (1000 milliseconds)
             updateClock();
             const clockInterval = setInterval(updateClock, 1000);
 
             fetchTeams();
             fetchAdviser();
             fetchNotes(groupID);
             // console.log("this useeffect reran after receiving subscription message")
             return ()=>{
                clearInterval(clockInterval);
            }
           }else{
            navigate("*")
           }
            
        }else{
            navigate("/")
        }
    }, []);

    const fetchAdviser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user/getAdviser?userID=${adviser.user.userID}`, {
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
            // toast.error("An error occurred: " + error.message);
        }
    };

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
                    const combinedTeams = [...data.groups, ...data.onHoldGroups];

                    // Sort the combined array based on queueingTimeStart
                    const sortedTeams = combinedTeams.slice().sort((a, b) => {
                        const timeA = a.queueingTimeStart.split(':').map(Number);
                        const timeB = b.queueingTimeStart.split(':').map(Number);

                        const totalSecondsA = timeA[0] * 3600 + timeA[1] * 60 + timeA[2];
                        const totalSecondsB = timeB[0] * 3600 + timeB[1] * 60 + timeB[2];

                        return totalSecondsA - totalSecondsB; // Ascending order
                    });

                    // Update state with sorted teams
                    setTeams(sortedTeams);
                    setOnHoldTeams([...onHoldTeams, ...data.onHoldGroups]);
                    setTendingTeam(data.tendingGroup);
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
            setLoading(true);
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
        setLoading(false)
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
            setLoading(true)
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
        setLoading(false)
    }

    const queue = async ()=>{
        try {
            setLoading(true)
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
                case 400:
                    const message400 = await response.text();
                    toast.error(message400)
                    break;
                case 422:
                    const message422 = await response.text();
                    toast.error(message422)
                    break;
                default:
                    // toast.error("Something went wrong while fetching teams.");
            }
        } catch (error) {
            // toast.error("An error occurred: " + error.message);
        }
        setLoading(false)
    }

    const sendMessage = async ()=>{
        if(user){
            try {
                if(message){
                    const response = await fetch(`http://localhost:8080/chat`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body:JSON.stringify({
                            "userID":user.userID,
                            "adviserID":adviser.user.userID,
                            "message":message
                        })
                    });
                }
                setMessage("")
            } catch (error) {
                toast.error("An error occurred: " + error.message);
            }
        }
    }

    

    

    useEffect(()=>{ 
        if(containerRef.current){
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
        // console.log("nidagan")
    },[chats])
    
    const fetchNotes = async (groupID) =>{
        if(user){
            try {
                const response = await fetch(`http://localhost:8080/note/getAllByGroupAndAdviser?groupID=${groupID}&adviserID=${adviser.user.userID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        
                switch (response.status) {
                    case 200:
                        const data = await response.json();
                         // Sort the notes by dateTaken in descending order
                         const sortedNotes = data.sort((a, b) => new Date(b.dateTaken) - new Date(a.dateTaken));
    
                         // Update the state with the sorted notes
                         setNotes([...notes, ...sortedNotes]);
                         break;
                    case 404:
                        const message = await response.text();
                        toast.error(message);
                        break;
                    default:
                        // toast.error("Something went wrong while fetching teams.");
                }
            } catch (error) {
                toast.error("An error occurred: " + error.message);
            }
        }
      }
    

    useEffect(() => {
        if (client && user) {
            const subscription = client.subscribe(`/topic/queueingTeamsStatus/student/enqueue/${adviser.user.userID}`,(message)=>{
                const receivedMessage = JSON.parse(message.body);
                setTeams(prevTeams => [...prevTeams, receivedMessage]);
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

                // setTeams((prevTeams) => prevTeams.filter(team => team.groupID !== receivedMessage.groupID));
            });

            const subscription4 = client.subscribe(`/topic/queueingTeamsStatus/student/requeue/${adviser.user.userID}`,(message)=>{
                const receivedMessage = JSON.parse(message.body);
                // console.log(receivedMessage)
                // setTeams((prevTeams) => {
                //     // Combine previous teams and receivedMessage
                //     const combinedTeams = [...prevTeams, receivedMessage];
                
                //     // Sort the combined array based on queueingTimeStart
                //     return combinedTeams.sort((a, b) => {
                //         const timeA = a.queueingTimeStart.split(':').map(Number);
                //         const timeB = b.queueingTimeStart.split(':').map(Number);
                
                //         const totalSecondsA = timeA[0] * 3600 + timeA[1] * 60 + timeA[2];
                //         const totalSecondsB = timeB[0] * 3600 + timeB[1] * 60 + timeB[2];
                
                //         return totalSecondsA - totalSecondsB; // Ascending order
                //     });
                // });
                setOnHoldTeams((prevTeams) => prevTeams.filter(team => team.groupID !== receivedMessage.groupID));
            })

            const adviserSubscription = client.subscribe(`/topic/queueStatus/adviser/${adviser.user.userID}`,(message)=>{
                const receivedMessage = JSON.parse(message.body);
                // console.log(receivedMessage)
                setAdviser(receivedMessage);
            })

            const chatSubscription = client.subscribe(`/topic/chat/adviser/${adviser.user.userID}`,(message)=>{
                const receivedMessage = JSON.parse(message.body);
                // console.log(receivedMessage)
                setChats((prevMessages)=>[...prevMessages, receivedMessage]);
            })

            const tendingTeamSubscription = client.subscribe(`/topic/queueingTeamsStatus/student/tendingTeam/${adviser.user.userID}`,(message)=>{
                const receivedMessage = JSON.parse(message.body);
                if (receivedMessage){
                    if(receivedMessage.groupID == groupID){
                        setOpen(true);
                    }
                    setTendingTeam(receivedMessage);
                }else{
                    setTendingTeam(null)
                }
            })

            const concludeMeetingSubscription = client.subscribe(`/topic/queueingTeamsStatus/student/concludeMeeting/${adviser.user.userID}`,(message)=>{
                const receivedMessage = JSON.parse(message.body);
                // console.log(receivedMessage)
                if(receivedMessage){
                    setTendingTeam(null);
                }
            })

            // Cleanup subscription on unmount
            return () => {
                subscription.unsubscribe();
                subscription2.unsubscribe();
                subscription3.unsubscribe();
                subscription4.unsubscribe();
                chatSubscription.unsubscribe();
                adviserSubscription.unsubscribe();
                tendingTeamSubscription.unsubscribe();
                concludeMeetingSubscription.unsubscribe();
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
        setTime(currentTime);
    }
    
    const handleClose = ()=>{
        setOpen(false);
    }

    const createNote = async ()=>{
        if(user){
            try {
                if(subject != "" && body != ""){
                    const response = await fetch(`http://localhost:8080/note/create`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "groupID":tendingTeam.groupID,
                            "adviserID":adviser.user.userID,
                            "noteTakerUserID":user.userID,
                            "subject":subject,
                            "body":body
                        })
                    });
            
                    switch (response.status) {
                        case 200:
                            const note = await response.json()
                            let temp = [...notes,note];
                            const sortedNotes = temp.sort((a, b) => new Date(b.dateTaken) - new Date(a.dateTaken)).reverse();
                            setNotes([...sortedNotes])
                            setSubject("")
                            setBody("")
                            toast.success("Note created.")
                            break;
                        default:
                            response.text().then(bodyMessage =>{
                                toast.error(bodyMessage)
                            })
                    }
                }else{
                    toast.error("Note must not be empty in subject nor body.")
                }
            } catch (error) {
                // toast.error("An error occurred: " + error.message);
            }
        }
      }
    
    
    return (
        <div id='mainContainer'>
            <UserNavbar/>
            {client && user?
                <div id="QueuePageSecondRowContainer">
                    <div id="leftContainer">
                        <div id="adviserInfoContainer">
                            <AccountCircleIcon className='adviserProfilePhoto'/>
                            <div style={{display:'flex', flexDirection:'column',justifyItems:'center'}}>
                                {adviser?<span id='adviserName'>{capitalizeFirstLetter(adviser.user.firstname)+" "+capitalizeFirstLetter(adviser.user.lastname)}</span>:<></>}
                                <a href='/' style={{color:'#6ABf05'}}>View Profile</a>
                            </div>
                            <span style={{flex:1, display:'flex',justifyContent:'end'}}>Queueing ends 3:00 pm</span>
                        </div>
                        <div id='adviserInfoContainer' style={{display:'flex', justifyContent:'space-between'}}>
                            <Typography variant='h6' color='gray'>Current Time:</Typography>
                            <span className='timeText'>{time}</span>
                        </div>
                        {tendingTeam && tendingTeam.groupID == groupID?
                            <div id="NotesContainer" style={{flex:1.7, backgroundColor:'rgba(0, 0, 0, 0.03)', borderRadius:'5px', display:'flex', flexDirection:'column', gap:'10px', padding:'1em', maxHeight:'100%', maxWidth:'100%', overflow:'hidden'}}>
                                <div id="noteTitle">
                                    <input type="text" placeholder='Note Title' style={{width:'100%', borderRadius:'5px', padding:'1em', border:'solid 1px #d0d0d0'}} value={subject} onChange={(e)=>{setSubject(e.target.value)}} />
                                </div>
                                <div id="note" style={{flexGrow:1, maxWidth:'100%', display:'flex', flexDirection:'column', gap:'10px', overflow:'hidden'}}>
                                    <RichTextEditor createNote={createNote} body={body} setBody={setBody}/>
                                </div>
                                <div style={{display:'flex', justifyContent:'end'}}>
                                    
                                </div>
                            </div>
                            :
                            <div className='queueingTeamsContainer'>
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <Typography variant='subtitle1' fontWeight='bold' color='gray'>Up Next</Typography>
                                    {
                                        myAdviser.ready?  tendingTeam && tendingTeam.groupID == groupID?<></>:(teams.some(team => team.groupID === groupID) || onHoldTeams.some(team => team.groupID === groupID))?<></>:<Button disabled={loading} size='sm' style={{paddingInline:'1.5em', border:'none'}} className='buttonCustom' onClick={queue} >Queue</Button>:<><Typography variant='subtitle1' color='red'>Adviser terminated queueing.</Typography></>
                                        // myAdviser.ready?<Button size='sm' style={{paddingInline:'1.5em', border:'none'}} className='buttonCustom' onClick={queue} >Queue</Button>:<><Typography variant='subtitle1' color='red'>Adviser terminated queueing.</Typography></>
                                    }
                                    
                                </div>
                                <Queue teams={teams} groupID={groupID} holdQueue={holdQueue} cancelQueue={cancelQueue} onHoldTeams={onHoldTeams} requeue={requeue} loading={loading}/>
                            </div>
                        }
                    </div>


                    <YourTurnModal open={open} handleClose={handleClose}/>


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
                                    <>
                                        <Stack direction={'column'} sx={{width:'100%'}}>
                                            <Skeleton animation='wave' sx={{width:'100%'}}/>
                                            <Skeleton animation='wave' sx={{width:'100%'}}/>
                                            <Skeleton animation='wave' sx={{width:'100%'}}/>
                                        </Stack>
                                    </>
                                }
                            </div>
                        </div>
                        {tendingTeam && tendingTeam.groupID == groupID?
                            <div id="savedNotesContainer" style={{backgroundColor:'rgba(0, 0, 0, 0.03)', overflowY:'auto' }}>
                                {notes.length>0?
                                    <div style={{display:'flex', flexDirection:'column', gap:'15px', flex:1, overflowY:'auto', maxHeight:'100%'}}>
                                    {notes.map((singlenote)=>(
                                        <Note note={singlenote} setNoteToggle={setNoteToggle} setNote={setNote} />
                                    ))}
                                    </div>
                                    :
                                    <div style={{display:'flex', justifyContent:'center', alignItems:'center',flex:1, flexDirection:'column'}}>
                                        <NoteAltIcon style={{color:'gray', fontSize:'calc(1em + 5dvw)'}}/>
                                        <Typography style={{margin:'0 auto'}} variant='h6' color='gray'>No saved notes.</Typography>
                                    </div>
                                }
                                <MyModal open={noteToggle} setOpen={setNoteToggle} note={note}/>
                            </div>
                            :
                            <div id="ChatBoxContainer">
                                <Typography variant='subtitle1' fontWeight='bold' color='gray'>Chat</Typography>
                                <div id="chatBoxFeed" ref={containerRef}>
                                    <div id="welcomeChatMessage">
                                        Welcome to {`${adviser.user.firstname} ${adviser.user.lastname}'s chat!`}
                                    </div>
                                    <div style={{marginTop:'30px', display:'flex', flexDirection:'column', gap:'20px', maxWidth:'100%', overflow:'hidden'}}>
                                        {chats.map((chat,index)=>(
                                            <div style={{display:'flex',justifyContent:chat.userID==user.userID?'end':'start', flexDirection:chat.userID == user.userID?'row-reverse':'row', gap:'8px', maxWidth:'100%', overflow:'hidden',flexGrow:1}}>
                                                <div id="chatProfile"></div>
                                                <div style={{display:'flex', flexDirection:'column', flexGrow:1, maxWidth:'100%'}}>
                                                    <div style={{fontSize:'0.7em',alignSelf:chat.userID == user.userID?'end':'', color:'gray'}}>{`${chat.firstname.charAt(0).toUpperCase()}${chat.firstname.slice(1)} ${chat.lastname.charAt(0).toUpperCase()}${chat.lastname.slice(1)}`}</div>
                                                    <div style={{backgroundColor:'rgba(217,217,217,0.5)', paddingBlock:'5px', borderRadius:'20px', paddingInline:'15px', display:'flex',wordBreak:'break-word', maxWidth:'70%',alignSelf:chat.userID == user.userID?'end':'start'}}>
                                                        {chat.message}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                </div>
                                <div id="chatboxUtilities" style={{display:'flex', marginTop:'10px'}}>
                                    <input style={{flexGrow:1, paddingInline:'1em'}} type='text' placeholder='Enter message.' id='messageInput' onChange={(e)=>{setMessage(e.target.value); console.log(e.target.value)}} value={message}/>
                                    <IconButton onClick={sendMessage}>
                                        <SendIcon style={{color:'black'}}/>
                                    </IconButton>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                :
                <>
                    <div style={{fontSize:'20dvw'}}>Loading</div>
                </>
            }
        </div>
    );
}

export default OnQueuePage;
