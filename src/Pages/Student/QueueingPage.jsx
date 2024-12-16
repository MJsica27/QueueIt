import { useLocation, useNavigate } from 'react-router-dom';
import UserNavbar from '../../Components/Navbar/UserNavbar';
import '../../Static/QueueingPage.css';
import AdviserQueueingCard from '../../Components/Card/Student/AdviserQueueingCard';
import { useContext, useEffect, useState } from 'react';
import BackButton from '../../Components/Buttons/BackButton';
import { UserContext } from '../../Components/User/UserContext';
import React from 'react';
import { capitalizeFirstLetter, capitalizeText } from '../../Components/Utils/Utils'; 
import AdviserBackgroundPage from '../../Components/Backgound.jsx/AdviserBackgroundPage';
import { Col, Container, Row } from 'react-bootstrap';
import { Typography } from '@mui/material';
import LockedAdviser from '../../Components/Card/LockedAdviser';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const QueueingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const classroom = location.state;
    const [group,setGroup] = useState(null);
    const user = useContext(UserContext).user;

    const fetchGroup = async ()=>{
        const response = await fetch(`http://localhost:8080/group/getGroupGivenStudent?classID=${classroom.classID}&userID=${user.userID}`)
        if (response.ok){
            const data = await response.json();
            // console.log(data)
            setGroup(data);
        }
    }

    useEffect(() => {
        if(user){
            if(user.role === "STUDENT"){
                fetchGroup();
                console.log(classroom.mentorable)
            }else{
                navigate("*")
            }
        }else{
            navigate("/")
        }
    }, []);
    
    return (
        <div className="flex flex-col h-screen relative overflow-x-hidden overflow-y-auto items-center gap-4 pb-3">  
        
            <AdviserBackgroundPage opac={0.5}/>

            <UserNavbar/>

            <div style={{flexGrow:1, display:'flex', width:'90%', fontFamily:'poppins'}}>
                <Container fluid style={{ flexGrow:1, display:'flex'}}>
                    <Row style={{flexGrow:1}}>







                        {/* left container */}
                        <Col className='px-4' sm={12} md={9} style={{display:'flex', flexDirection:'column'}}>
                                {/* classroom information + back button */}
                                <Row className='classroomInformation_QPS'>
                                    <Col style={{display:'flex'}}>
                                        <div style={{display:'flex', flexDirection:'column', paddingBlock:'1em', flexGrow:1, overflow:'hidden'}}>
                                            <div style={{display:'flex',overflowWrap:'break-word', flexGrow:1}}>
                                                <Typography variant='h2' color='white' fontWeight='bold' style={{alignSelf:'center', fontSize:'calc(2.5em + 1dvw)'}}>{capitalizeFirstLetter(classroom.subjectName)}</Typography>
                                            </div>
                                            <Typography variant='h6' color='white' fontWeight='bold'>{classroom.section?capitalizeText(classroom.section):<>Section Undefined</>}</Typography>
                                        </div>
                                    </Col>
                                    <Col className='allTeamsBTN' style={{display:'flex', alignItems:'center', justifyContent:'end'}}>
                                        <div style={{display:'flex', gap:'10px', alignSelf:'center', paddingBlock:'1em', alignItems:'center'}}>
                                            <BackButton/> <Typography variant='h6' color='white' fontWeight={100} style={{fontSize:'calc(0.5em + 1dvw)', textAlign:'center'}}>All Teams</Typography>
                                        </div>
                                    </Col>
                                </Row>
                                {/* Adviser cards section */}
                                <Row style={{flexGrow:1}} className='mt-2'>
                                    <Col sm={12} md={classroom.mentorable?6:12} className='customClassCol_QPS' style={{padding:'0px',paddingRight:'5px'}}>
                                        <AdviserQueueingCard classroom={classroom} groupID={group?.groupID}/>
                                    </Col>
                                    {
                                        classroom.mentorable?
                                            <Col sm={12} md={6} className='customClassCol_QPS' style={{padding:'0px', paddingLeft:'5px'}}>
                                                {classroom.mentorable?
                                                    group?
                                                        <AdviserQueueingCard classroom={classroom} groupID={group?.groupID} title={"Mentor"}/>:<LockedAdviser/>:<></>}
                                            </Col>
                                            :
                                            <>

                                            </>
                                    }
                                    
                                </Row>
                        </Col>








                        {/* right container */}
                        <Col sm={12} md={3} style={{display:'flex', flexDirection:'column', gap:'10px', justifyContent:'space-between'}}>
                            <div className='customClassRow_QPS'>
                                <div className='containerHeader_QPS'>Groups</div>
                                <PersonSearchIcon style={{fontSize:'calc(4em + 1dvw)'}}/>
                                <Typography className='containerCaption_QPS'>You have yet to find any group. Connect with others</Typography>
                                <button className='primaryBTN'>Connect</button>
                            </div>
                            <div id='journalContainer_QPS' className='customClassRow_QPS' style={{justifyContent:'space-between'}}>
                                <div className='containerHeader_QPS'>Journal</div>
                                <Typography className='containerCaption_QPS'>View journal entries.</Typography>
                                <button className='primaryBTN'>Browse</button>
                            </div>
                            <div className='customClassRow_QPS'>
                                <div className='containerHeader_QPS'>Consultation</div>
                                <div style={{fontSize:'calc(4em + 1dvw)'}}>0</div>
                                <Typography className='containerCaption_QPS'>Consultations conducted.</Typography>
                                <button className='primaryBTN'>History</button>
                            </div>
                        </Col>





                    </Row>
                </Container>
            </div>

            

           
            
            
        </div>
    );
}

export default QueueingPage;
