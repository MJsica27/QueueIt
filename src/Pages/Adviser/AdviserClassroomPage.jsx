import React, { useEffect, useState } from 'react';
import vector from '../../Assets/Vector.png';
import { Stack } from 'react-bootstrap';
// import AdviserClassroomNavigation from '../../Components/Navbar/AdviserClassroomNavigation';
import AdviserNavbar from '../../Components/Navbar/AdviserNavbar';
import AdviserGroupCard from '../../Components/Card/Adviser/AdviserGroupCard';
import { useLocation } from 'react-router-dom';
import data from './data.json';   
import backIcon from '../../Assets/icons/arrow.png';

const AdviserClassroomPage = () => {
    const location = useLocation();
    const classroom = location.state;
    const [groups, setGroups] = useState([]);
 
    useEffect(() => {
        const classroomGroups = data.filter(group => group.classID === classroom.classID);
        setGroups(classroomGroups);
    }, [classroom.classID]);

    return (
        <div
            className="m-0 vh-100"
            style={{
                backgroundImage: `url(${vector})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundColor: '#fff',
                height: '95vh'
            }}
        >
            <AdviserNavbar />
            <div 
                className="container d-flex align-items-center justify-content-center"> 
            <div
                className="shadow-lg"
                style={{ 
                    background: 'rgba(255, 255, 255, 0.95)', 
                    color: '#333', 
                    maxWidth: '2000px', 
                    width: '2500px', 
                    overflow: 'hidden',
                    height: '82vh', 
                    borderRadius: '20px 20px 0 0',  
                }}
            >  
                    <div className='d-flex align-items-center'
                        style={{
                            fontWeight: 'bold',
                            backgroundColor: '#b9ff66',
                            color: '#fff',
                            height: '50px',
                            width: '100%',
                            fontSize: '20px',
                            padding: '0 20px',
                            borderRadius: '20px 20px 0 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    > 
                        <span>
                            <img
                            src={backIcon}
                            alt="back"
                            style={{ width: '25px', height: '25px', marginRight: '10px' }}
                            />
                            {classroom.subjectName} - {classroom.section}</span>
                        <span>
                            <span style={{ fontWeight: 'normal' }}>Classcode:</span> {classroom.classCode}
                        </span>
                    </div>

                    <Stack
                        direction="column"
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            margin: '35px'
                        }}
                        gap={3}
                    >
                        {/* <AdviserClassroomNavigation /> */}

                        {groups.length === 0 ? (
                            <p>No active groups found.</p>
                        ) : (
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start' }}>
                                {groups.map((group) => (
                                    <AdviserGroupCard
                                        key={group.groupID}
                                        group={group}
                                    />
                                ))}
                            </div>
                        )}
                    </Stack>
                </div>
            </div> 
            </div>
    );
}

export default AdviserClassroomPage;
