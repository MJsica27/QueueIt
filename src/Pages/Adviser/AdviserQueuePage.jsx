import React, { useContext, useEffect, useRef, useState } from 'react';
import { IconButton, TextField, Typography } from '@mui/material';
import AdviserSetQueue from '../../Components/Adviser/AdviserSetQueue'; 
import UserNavbar from '../../Components/Navbar/UserNavbar';
import { useWebSocket } from '../../Components/User/WebSocketContext';
import { UserContext } from '../../Components/User/UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import { Button } from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';

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
  const [meeting, setMeeting] = useState(null)

  useEffect(() => {

    if(user){
      if(user.role === "ADVISER"){
        fetchTeams();
      }else{
       navigate("*")
      }
    }else{
        navigate("/")
    }
  }, [user]);

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
                    // console.log(data.groups)
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
                    setMeeting(data)
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

  const concludeMeeting = async ()=>{
    if(user){
        try {
            const response = await fetch(`http://localhost:8080/queue/adviser/conclude?meetingID=${meeting.meetingID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            switch (response.status) {
                case 200:
                    {console.log("2000000")}
                    setMeeting(null)
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


  useEffect(()=>{ 
    if(containerRef.current){
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    // console.log("nidagan")
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

        const tendingTeamSubscription = client.subscribe(`/topic/queueingTeamsStatus/student/tendingTeam/${user.userID}`,(message)=>{
            const receivedMessage = JSON.parse(message.body);
            console.log(receivedMessage)
            if (receivedMessage){
                setTendingTeam(receivedMessage);
            }else{
                setTendingTeam(null)
            }
        })

        const concludeMeetingSubscription = client.subscribe(`/topic/queueingTeamsStatus/student/concludeMeeting/${user.userID}`,(message)=>{
            const receivedMessage = JSON.parse(message.body);
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
            tendingTeamSubscription.unsubscribe();
            concludeMeetingSubscription.unsubscribe();
        };
    }
  }, [client]);
  
  return (
    
    <div id='mainContainer'>
      <UserNavbar/>
      <div id="QueuePageSecondRowContainer">
        <div id="leftContainer" style={{flex:0.5}}>
          <div id="adviserInfoContainer">
            <AdviserSetQueue/>
          </div>
          <div id="QueueingInformationContainer">
            <div id="upNextContainer">
            {teams.length > 0?
                                    
              <>
                  {teams.map((team,index)=>(
                      <div id='queueingTeamContainer' key={index} style={{backgroundColor:onHoldTeams.find(onHoldTeam => onHoldTeam.groupID === team.groupID)?'rgba(255,165,0,0.3)':'transparent'}}>
                          <div id='indexNumber'>{index+1}</div>
                          <div id="queueingTeamMiniProfile"></div>
                          <div id="queueingTeamInformationLive">
                              <div id='queueingTeamNameLive'>{team.groupName}</div>
                              <div id='queueingTeamSectionLive'>{`${team.subjectCode} - ${team.section}`}</div>
                              {onHoldTeams.find(onHoldTeam=>onHoldTeam.groupID===team.groupID)?<Typography variant='caption' fontStyle='poppins' fontSize='1dvw' fontWeight='bold' color='white' style={{alignSelf:'end', justifySelf:'end'}}>On Hold</Typography>:<Button size='sm' style={{paddingInline:'1.5em', border:'none'}} className='buttonCustom' onClick={()=>{admitTeam(team.groupID)}}>Admit</Button>}
                          </div>
                      </div>
                  ))}
              </>
              :
              <>
                  <div style={{margin:'0 auto', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                      <CategoryIcon style={{fontSize:'15dvw', color:'gray'}}/>
                      <Typography style={{fontSize:'2.5dvw', color:'gray', textAlign:'center'}}>Awaiting queueing teams.</Typography>
                  </div>
              </>
            }
            </div>
          </div>
        </div>
        <div id="rightContainer" style={{flex:1}}>
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
                <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}>{tendingTeam?<Button size='sm' style={{paddingInline:'1.5em', border:'none'}} className='buttonCustom' onClick={concludeMeeting}>Conclude</Button>:<></>}</div>
              </div>
            </div>
            <div id="ChatBoxContainer" style={{flexDirection:'row', gap:'1em', flexWrap:'wrap', maxHeight:'none'}}>
                <div id="NotesContainer" style={{flex:1.7, backgroundColor:'white', borderRadius:'5px', display:'flex', flexDirection:'column', gap:'10px', padding:'1em', maxHeight:'100%'}}>
                    {tendingTeam?
                      <>
                        <div id="noteTitle">
                          <input type="text" placeholder='Note Title' style={{width:'100%', borderRadius:'5px', padding:'1em', border:'solid 1px #d0d0d0'}} />
                        </div>
                        <div id="note" style={{flexGrow:1}}>
                        <textarea
                            style={{ width: '100%', height: '100%', resize: 'none', borderRadius:'5px', padding:'1em', border:'solid 1px #d0d0d0' }}
                        ></textarea>
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
                          <input style={{flexGrow:1, paddingInline:'1em'}} type='text' placeholder='Enter message.' id='messageInput' onChange={(e)=>{setMessage(e.target.value); console.log(e.target.value)}} value={message}/>
                          <IconButton onClick={sendMessage}>
                              <SendIcon style={{color:'black'}}/>
                          </IconButton>
                        </div>
                      </>
                    }
                </div>
                {tendingTeam?<div id="savedNotesContainer" style={{maxHeight:'none',backgroundColor:'white', borderRadius:'5px'}}>
                    <Typography>No saved notes.</Typography>
                </div>:<></>}
            </div>
        </div>
      </div>
    </div>
  )
}
