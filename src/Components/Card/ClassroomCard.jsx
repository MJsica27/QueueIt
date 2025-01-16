import { Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { randomPerson } from "../Utils/PersonPicker";
import AdviserClassroomCardButton from "../IconButtonGroup/AdviserClassroomCardButtons";

export default function ClassroomCard({classroom}){

    const user = JSON.parse(localStorage.getItem('user'))

    console.log(user.role)

    return(
        <Col xs={12} md={12} lg={6} xl={4}>
            <NavLink
                to={`/adviserclassroompage`}
                state={classroom}
                style={{ 
                    textDecoration: 'none', 
                    color: 'black',
                    // flex:'1 1 33.33%',
                }}
                >
                    <div
                        style={{
                            border:'solid 1px black',
                            boxShadow: '15px 15px 0px 0.1px rgba(0, 0, 0,1)',
                            borderRadius:'10px',
                            padding:'2em',
                            maxWidth:'100%',
                            height:'350px',
                            position:'relative',
                            display:'flex',
                            flexDirection:'column',
                        }}
                    >
                        {/* Title Section */}
                        <div style={{fontSize:'clamp(1.5rem, 2vw + 0.5rem, 2.5rem)', fontWeight:'bold', zIndex:1, position:'relative'}}>
                            {classroom ? classroom.subjectName : 'Classroom Name'}
                        </div>
                        <img src={randomPerson()} alt="randomPerson" style={{aspectRatio:1, height:'80%', bottom:0, right:0,position:'absolute', zIndex:0}}/>
                        {console.log(classroom)}
                        {user?.role =="ADVISER"?<AdviserClassroomCardButton classID={classroom.classID}/>:<>Hello World</>}
                    </div>
                    
            </NavLink>
        </Col>
    )
}