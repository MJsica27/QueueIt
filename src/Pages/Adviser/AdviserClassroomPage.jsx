import React, { useEffect, useState } from 'react';
import vector from '../../Assets/Vector.png';
import { Stack } from 'react-bootstrap';
import AdviserClassroomNavigation from '../../Components/Navbar/AdviserClassroomNavigation';
import AdviserNavbar from '../../Components/Navbar/AdviserNavbar';
import AdviserGroupCard from '../../Components/Card/AdviserGroupCard';
import { useLocation } from 'react-router-dom';
import data from './data.json';  

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
                backgroundColor: '#b9ff66',
                height: '95vh'
            }}
        >
            <AdviserNavbar />
            <div
                className="mx-5"
                style={{
                    background: 'rgba(238, 238, 238, 0.9)',
                    color: '#333333',
                    height: '570px',
                    borderRadius: '20px 20px 0 0',
                    padding: '25px',
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                <div
                    className="mx-5"
                    style={{
                        background: 'rgba(238, 238, 238, 0.9)',
                        color: '#333333',
                        height: '570px',
                        width: 'auto',
                        border: '1px solid black',
                        overflowY: 'auto',
                        borderRadius: '20px 20px 0 0'
                    }}
                >
                    <div
                        style={{
                            fontWeight: 'bold',
                            backgroundColor: '#b9ff66',
                            height: '45px',
                            width: '100%',
                            fontSize: '20px',
                            padding: '0px 15px',
                            borderBottom: '1px solid black',
                            borderRadius: '20px 20px 0 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <span>{classroom.subjectName} - {classroom.section}</span>
                        <span>
                            <span style={{ fontWeight: 'normal' }}>Classcode:</span> {classroom.classCode}
                        </span>
                    </div>

                    <Stack
                        direction="column"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '15px'
                        }}
                        gap={3}
                    >
                        <AdviserClassroomNavigation />

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
