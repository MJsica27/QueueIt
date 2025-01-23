import { Col, Container, Row } from "react-bootstrap";
import AdviserBackgroundPage from "../Components/Backgound/AdviserBackgroundPage";
import UserNavbar from "../Components/Navbar/UserNavbar";
import RichTextEditor from "../Components/Utils/RichTextEditor";
import { TextField, Typography } from "@mui/material";
import '../../src/Static/rts.css'
import BackButton from "../Components/Buttons/BackButton";
import { useContext, useEffect, useState } from "react";
import {BASE_URL} from '../../src/Global_vars/Urls.js'
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import JournalCard from "../Components/Card/JournalCard.jsx";
import { UserContext } from "../Components/User/UserContext.jsx";
import { capitalizeFirstLetter } from "../Components/Utils/Utils.js";

export default function JournalPage(){
    const location = useLocation();
    const {studentID, classID} = useParams()
    const [title, setTitle] = useState(0);
    const [body,setBody] = useState("");
    const [journals, setJournals] = useState([]);
    const user = useContext(UserContext).user
    const fetchJournals = async ()=>{
        try{
            const response = await fetch(`${BASE_URL}/note/getStudentJournal?studentID=${studentID}&classID=${classID}`)
            if(response.ok){
                const data = await response.json();
                console.log('Fetched journals:',data);
                setJournals(data)
            }
        }catch(err){
            toast.error("Failed to fetch journals.")
        }
    }

    const createJournal = async ()=>{
        if(title > 0 && title < 17){
            if(!body){
                toast.error("Week journal must not be empty.")
            }else{
                try{
                    const response = await fetch(`${BASE_URL}/note/createJournal`,{
                        method:'POST',
                        headers:{
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({
                            studentID: studentID,
                            classID: classID,
                            weekNumber: title,
                            body:body
                        })
                    })
        
                    switch(response.status){
                        case 200:
                            const journal = await response.json()
                            toast.success("Journal entry successfully recorded.")
                            let temp = [...journals, journal];
                            setJournals(temp)
                            
                            setTitle();
                            setBody("");
                            break;
                        case 404:
                            toast.error("Student or Classroom not found.");
                            break;
                        case 400:
                            toast.error("Invalid Journal Entry.");
                            break;
                        case 500:
                            toast.error("Server Error");
                            break;
                    }
                }catch(err){
                    console.log(err)
                }
            }
        }else{
            toast.error("Valid week entry for this semester is 1 to 16")
        }
    }

    useEffect(()=>{
        fetchJournals();
    },[])
    return (
        <div style={{height:'100dvh', display:'flex',flexDirection:'column'}}>
            <UserNavbar/>
            <AdviserBackgroundPage/>
            <Container fluid style={{flex:1, padding:'1% 6%'}}>
                <Row style={{height:'100%'}}>
                    <Col md={3}>
                        <div style={{height:'100%', backgroundColor:'#7D57FC', borderRadius:'15px', padding:'2em'}}>
                            <div style={{display:'flex', gap:'10px', alignSelf:'center', paddingBlock:'1em', alignItems:'center', flexDirection:'column'}}>
                                <div style={{display:'flex', gap:'15px', alignItems:'center', width:'100%'}}><BackButton/> <Typography variant='h6' color='white' fontWeight={100} style={{fontSize:'calc(0.5em + 1dvw)', textAlign:'center'}}>Back</Typography></div>
                                {journals.map((journal)=>(
                                    <JournalCard journal={journal}/>
                                ))}
                            </div>
                        </div>
                    </Col>
                    <Col md={9} style={{border:'solid 1px black', padding:'2em', display:'flex', backgroundColor:'white', borderRadius:'15px' }}>
                        <div style={{display:'flex', flexDirection:'column', flexGrow:1}}>
                            <TextField inputProps={{min:1, max:16}} placeholder="Journal Week Number" className="mb-2 w-100" type="number" value={title} onChange={(e)=>{setTitle(e.target.value); console.log(e.target.value)}}/>
                            <RichTextEditor setBody={setBody} body={body} createNote={createJournal}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}