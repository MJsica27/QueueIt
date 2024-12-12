import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import UserNavbar from '../../Components/Navbar/UserNavbar';
import { useWebSocket } from '../../Components/User/WebSocketContext';
import { UserContext } from '../../Components/User/UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import { Button } from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';
import Note from '../../Components/Card/Note';
import MyModal from '../../Components/Modal/Modal';
import RichTextEditor from '../../Components/Utils/RichTextEditor';
import Queue from '../../Components/Queue';
import OpenQueueModal from '../../Components/Modal/OpenQueueModal';

export default function AdviserQueuePage() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [onHoldTeams, setOnHoldTeams] = useState([]);
  const [tendingTeam, setTendingTeam] = useState(null);
  const [chats, setChats] = useState([]);
  const user = useContext(UserContext).user;
  const client = useWebSocket();
  const [message, setMessage] = useState("");
  const containerRef = useRef(null)
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [notes, setNotes] = useState([]);
  const [noteToggle, setNoteToggle]= useState(false);
  const [note, setNote] = useState(null);
  const [meeting, setMeeting] = useState(null)
  const [open, setOpen] = useState(false);
  const [adviser,setAdviser] = useState(null)

  useEffect(()=>{
    if(tendingTeam){
        console.log("ning fetch")
        fetchNotes(tendingTeam.groupID)
    }
  },[tendingTeam])

  useEffect(() => {
    if(user){
      if(user.role === "ADVISER"){
        fetchTeams();
        fetchAdviser();
      }else{
       navigate("*")
      }
    }else{
        navigate("/")
    }
  }, [user]);

  useEffect(()=>{
    if(!meeting && tendingTeam){
        getActiveMeeting();
    }
  },[tendingTeam])

  const fetchAdviser = async () => {
    try {
        const response = await fetch(`http://localhost:8080/user/getAdviser?userID=${user.userID}`, {
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

  const getActiveMeeting = async ()=>{
    try{

        const response = await fetch(`http://localhost:8080/meeting/getActive?groupID=${tendingTeam.groupID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        switch(response.status){
            case 200:
                const data = await response.json()
                setMeeting(data)
                break;
            case 404:
                toast.error("Meeting not found.")
                break;
            default:
                toast.error("Server error.")
        }
    }catch (err){
        console.log(err)
    }
  }

  const fetchTeams = async ()=>{
    if(user){
        try {
            const response = await fetch(`http://localhost:8080/queue/getQueueingTeams?adviserID=${user.userID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            switch (response.status) {
                case 200:
                    const data = await response.json();
                    let temp = [...data.groups, ...data.onHoldGroups]
                    setTeams([...teams, ...temp])
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
                        "adviserID":user.userID,
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

  const fetchNotes = async (groupID) =>{
    if(user){
        try {
            const response = await fetch(`http://localhost:8080/note/getAllByGroupAndAdviser?groupID=${groupID}&adviserID=${user.userID}`, {
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

  const admitTeam = async (groupID)=>{
    if(user){
        try {
            const response = await fetch(`http://localhost:8080/queue/adviser/admit?adviserID=${user.userID}&groupID=${groupID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            switch (response.status) {
                case 200:
                    const data = await response.json();
                    // console.log(data)
                    localStorage.setItem("meetingID",data)
                    console.log(teams)
                    setTendingTeam(teams.find((team)=>team.groupID === groupID))
                    fetchNotes(groupID)
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

  const concludeMeeting = async ()=>{
    if(user){
        try {
            const response = await fetch(`http://localhost:8080/queue/adviser/conclude?meetingID=${localStorage.getItem("meetingID")}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            switch (response.status) {
                case 200:
                    setTendingTeam(null)
                    localStorage.removeItem("meetingID");
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

  const createNote = async ()=>{
    if(user){
        try {
            if(subject && body){
                const response = await fetch(`http://localhost:8080/note/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "groupID":tendingTeam.groupID,
                        "adviserID":user.userID,
                        "noteTakerUserID":user.userID,
                        "subject":subject,
                        "body":body
                    })
                });
        
                switch (response.status) {
                    case 200:
                        const note = await response.json()
                        setNotes([...notes, note])
                        setSubject("")
                        setBody("")
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

  const closeQueueing = async () =>{
    try{
    const response = await fetch(`http://localhost:8080/queue/adviser/close`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            adviserID: user.userID,
        }),
    })

    if (response.ok){          
        setAdviser({
        ...adviser,
        ready: false
        })
    }
    }catch(err){
    console.log(err)
    }
  }

  
  const handleOpen = () => setOpen(true);


  useEffect(()=>{ 
    if(containerRef.current){
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  },[chats])
  useEffect(() => {
    if (client && user) {
        const subscription = client.subscribe(`/topic/queueingTeamsStatus/student/enqueue/${user.userID}`,(message)=>{
            const receivedMessage = JSON.parse(message.body);
            // console.log(receivedMessage)
            setTeams((prevTeams) => [...prevTeams, receivedMessage]);
        })

        const subscription2 = client.subscribe(`/topic/queueingTeamsStatus/student/dequeue/${user.userID}`,(message)=>{
            const receivedMessage = JSON.parse(message.body);
            // console.log(receivedMessage)
            setTeams((prevTeams) => prevTeams.filter(team => team.groupID !== receivedMessage.groupID));
            setOnHoldTeams((prevTeams) => prevTeams.filter(team => team.groupID !== receivedMessage.groupID));
        })

        const subscription3 = client.subscribe(`/topic/queueingTeamsStatus/student/onHold/${user.userID}`, (message) => {
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

        const subscription4 = client.subscribe(`/topic/queueingTeamsStatus/student/requeue/${user.userID}`,(message)=>{
            const receivedMessage = JSON.parse(message.body);
            // console.log(receivedMessage)
            teams.find(team=>team.groupID === receivedMessage.groupID)?<></>:
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

        const chatSubscription = client.subscribe(`/topic/chat/adviser/${user.userID}`,(message)=>{
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
  
  return (
    
    <div id='mainContainer'>
      <UserNavbar/>
      <div id="QueuePageSecondRowContainer">
        <div style={{flex:0.4}} id="leftContainer">
          <div style={{backgroundColor: 'rgba(0, 0, 0, 0.03)', height:'15%', display:'flex'}}>
            {adviser?!adviser.ready?<button style={{backgroundColor:'#baff66', flexGrow:1, fontWeight:'500', borderRadius:'5px'}} onClick={handleOpen}>Open Queueing</button>:
            <><button style={{backgroundColor:'rgba(255,0,0,0.7)', flexGrow:1, fontWeight:'500', borderRadius:'5px', color:'white'}} onClick={closeQueueing}>Close Queueing</button></>:
            <></>}
            <OpenQueueModal open={open} setOpen={setOpen} adviser={adviser} setAdviser={setAdviser}/>
          </div>
          <div style={{flexGrow:1, display:'flex'}}>
            <div className='queueingTeamsContainer'>
                {teams.length > 0 || onHoldTeams.length > 0?
                    <>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <Typography variant='subtitle1' fontWeight='bold' color='gray'>Up Next</Typography>
                        </div>
                        <Queue teams={teams} onHoldTeams={onHoldTeams} admitTeam={admitTeam}/>
                    </>
                :
                <>
                    <div style={{margin:'0 auto', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <CategoryIcon style={{fontSize:'calc(2em + 5dvw)'}}/>
                        <Typography style={{ color:'gray', textAlign:'center'}}>Awaiting queueing teams.</Typography>
                    </div>
                </>
                }
            </div>     
          </div>
        </div>
        <div id="rightContainer" style={{flexGrow:1}}>
            <div id="currentlyTendingContainer" style={{flex:'0.335'}}>
              <div style={{display:'flex', height:'100%'}}>
                <div id="currentlyTendingContainer" style={{flex:1, backgroundColor:'transparent'}}>
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
                            <Typography>Awaiting admission.</Typography>
                        }
                    </div>
                </div>
                <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'end'}}>{tendingTeam?<Button size='sm' style={{paddingInline:'1.5em', border:'none'}} className='buttonCustom' onClick={concludeMeeting}>Conclude</Button>:<></>}</div>
              </div>
            </div>
            <div id="ChatBoxContainer" style={{flexDirection:'row', gap:'1em', flexWrap:'wrap', maxHeight:'none', maxWidth:'100%'}}>
                <div id="NotesContainer" style={{flex:1.7, backgroundColor:'white', borderRadius:'5px', display:'flex', flexDirection:'column', gap:'10px', padding:'1em', maxHeight:'100%', maxWidth:'100%', overflow:'hidden'}}>
                    {tendingTeam?
                      <>
                        <div id="noteTitle">
                          <input type="text" placeholder='Note Title' style={{width:'100%', borderRadius:'5px', padding:'1em', border:'solid 1px #d0d0d0'}} value={subject} onChange={(e)=>{setSubject(e.target.value)}} />
                        </div>
                        <div id="note" style={{flexGrow:1, maxWidth:'100%', display:'flex', flexDirection:'column', gap:'10px', overflow:'hidden'}}>
                            <RichTextEditor createNote={createNote} body={body} setBody={setBody}/>
                        </div>
                        <div style={{display:'flex', justifyContent:'end'}}>
                            
                        </div>
                      </>
                      :
                      <>
                        <div id="chatBoxFeed" ref={containerRef}>
                          <div id="welcomeChatMessage">
                              Welcome to {`${user?user.firstname:<></>} ${user?user.lastname:<></>}'s chat!`}
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
                          <input style={{flexGrow:1, paddingInline:'1em'}} type='text' placeholder='Enter message.' id='messageInput' onChange={(e)=>{setMessage(e.target.value); }} value={message}/>
                          <IconButton onClick={sendMessage}>
                              <SendIcon style={{color:'black'}}/>
                          </IconButton>
                        </div>
                      </>
                    }
                </div>
                {tendingTeam?
                <div id="savedNotesContainer" style={{backgroundColor:'white', overflowY:'auto' }}>
                    {notes.length>0?
                        <div style={{display:'flex', flexDirection:'column', gap:'15px', flex:1, overflowY:'auto', maxHeight:'100%'}}>
                        {notes.map((singlenote)=>(
                            <Note note={singlenote} setNoteToggle={setNoteToggle} setNote={setNote} />
                        ))}
                        </div>
                        :
                        <Typography>No saved notes.</Typography>
                    }
                </div>:<></>}
                <MyModal open={noteToggle} setOpen={setNoteToggle} note={note}/>
            </div>
        </div>
      </div>
    </div>
  )
}
