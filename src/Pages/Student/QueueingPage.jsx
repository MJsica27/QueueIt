import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import JandelStudentNavbar from '../../Components/Navbar/JandelStudentNavbar';
import '../../Static/QueueingPage.css';
import AdviserQueueingCard from '../../Components/Card/AdviserQueueingCard';
import { useEffect, useState } from 'react';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { Button } from 'react-bootstrap';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';

const QueueingPage = () => {
    const location = useLocation();
    const classroom = location.state;
    const [group,setGroup] = useState(null);
    const [count,setCount] = useState(0);
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchGroup = async ()=>{
        const response = await fetch(`http://localhost:8080/group/getGroupGivenStudent?classID=${classroom.classID}&userID=${user.userID}`)
        if (response.ok){
            const data = await response.json();
            // console.log(data)
            setGroup(data);
        }
    }

    useEffect(() => {
        fetchGroup();
    }, []);
    
    return (
        <div>
            <JandelStudentNavbar/>
            {/* main container kanang puti */}
            <div 
                style={{
                    maxWidth:'100dvw',
                    padding:'1dvh 5dvw 1dvh 5dvw',
                    display:'flex',
                    flexDirection:'column',
                    gap:10,
                }}
            >
                {/* Team information container kanang gray first row */}
                <div
                    style={{
                        height:'11dvh',
                        backgroundColor:'rgba(0,0,0,0.03)',
                        borderRadius:'5px',
                        display:'flex',
                        padding:'0.8rem',
                        gap:10,
                        alignItems:'center',
                    }}
                >
                    {/* green box  */}
                    <div
                        style={{
                            backgroundColor:'#b9ff66',
                            height:'100%',
                            aspectRatio:1,
                            borderRadius:'3px'
                        }}
                    >
                    </div>


                    {/* Team basic info title & section */}
                    <div
                        style={{
                            display:'flex',
                            flexDirection:'column',
                            flex:1
                        }}
                    >
                        <Typography variant='h6' fontWeight='bold'>{classroom.subjectName}</Typography>
                        <Typography variant='caption' color='gray'>{classroom.section}</Typography>
                    </div>


                    {/* All Teams */}
                    <div
                        style={{
                        }}
                    >
                        <a href='studentHomePage' style={{textDecoration:'none', color:'inherit'}}><Typography variant='subtitle2' fontWeight='bold'>{`< All Teams`}</Typography></a>
                    </div>
                </div>

                {/* ------------------- end of first row  ----------------- */}

                <div id='SecondRowContainer'>
                    <div className='adviserQueueingCard'>
                        <Typography variant='subtitle1' fontWeight='bold' color='gray'>Adviser</Typography>
                        <AdviserQueueingCard adviserID={classroom.adviserID} groupID={group?group.groupID:""}/>
                    </div>
                    <div className='adviserQueueingCard'>
                        <Typography variant='subtitle1' fontWeight='bold' color='gray'>Mentor</Typography>
                        {group?
                            group.mentorID?
                            <><AdviserQueueingCard adviserID={group.mentorID} groupID={group?group.groupID:""}/></>
                            :
                            //if wala pay mentor
                            <>
                                <PersonPinCircleIcon style={{fontSize:'12em', alignSelf:'center',flex:2}}/>
                                <Typography style={{fontSize:'1.2em', color:'gray', flex:0.2, display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center'}}>Scout for potential mentors by clicking browse.</Typography>
                                <div style={{flex:1,display:'flex', alignItems:'center',justifyContent:'center'}}>
                                    <Button size='lg' style={{backgroundColor:'#b9ff66',color:'black',border:'none', fontWeight:'bold'}}>Browse</Button>
                                </div>
                            </>
                        :
                        <>
                            {/* if wala pay group */}
                            <div style={{flex:1, display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center', gap:'20px'}}>
                                <LockPersonIcon style={{fontSize:'12em'}}/>
                                <Typography variant='subtitle2' fontSize='1em' fontFamily='Poppins' textAlign='center' color='gray'>Find a group first to enable mentorship availability.</Typography>
                            </div>
                        </>}
                    </div>
                    <div className='adviserQueueingCard' id='extraInfoCard'>
                        {/* group card */}
                        <div className='extraInfoSubCard'>
                            <Typography variant='subtitle1' fontWeight='bold' color='gray'>Group</Typography>
                            {group?
                                <>
                                    <div id='groupGreenBox' style={{flex:1, backgroundColor:'#b9ff66',borderRadius:'5px',width:'50%', alignSelf:'center'}}>

                                    </div>
                                    <div style={{flex:0.5, display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        <Typography className='typoGname' style={{fontFamily:'poppins',fontSize:'1.5em', textAlign:'center'}}>{group.groupName}</Typography>
                                    </div>
                                    <div style={{display:'flex',flex:0.2, justifyContent:'center', alignItems:'end', gap:'10px'}}>
                                        <GroupsIcon style={{fontSize:'2em'}}/>
                                        <Typography style={{color:'#6abf05', cursor:'pointer'}}>{group.students.length === 1? <>{group.students.length} Member</>: <>{group.students.length} Members</>}</Typography>
                                    </div>
                                </>
                                :
                                <>
                                    <div style={{display:'flex',flex:1,flexDirection:'column'}}>
                                        <ConnectWithoutContactIcon style={{fontSize:'clamp(5em, 8em, 12em)',alignSelf:'center', flex:1}}/>
                                        <Typography style={{padding:'0px 0.8em 0px 0.8em',color:'gray', display:'flex',alignItems:'center', justifyContent:'center', textAlign:'center', flex:1 }}>You have yet to find any group. Connect with others</Typography>
                                        <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
                                            <Button size='lg' style={{backgroundColor:'#b9ff66',color:'black',border:'none', fontWeight:'bold'}}>Connect</Button>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>

                        {/* consultations card */}
                        <div className='extraInfoSubCard'>
                            <Typography variant='subtitle1' fontWeight='bold' color='gray'>Consultation</Typography>
                            <div style={{flex:1,display:'flex',flexDirection:'column', textAlign:'center'}}>
                                <span id='count'>{count}</span>
                                <span id='consul'>Consultations conducted.</span>
                                <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
                                    <Button size='lg' style={{backgroundColor:'#b9ff66',color:'black',border:'none', fontWeight:'bold'}}>History</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
}

export default QueueingPage;
