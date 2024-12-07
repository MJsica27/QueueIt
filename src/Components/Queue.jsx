import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { UserContext } from './User/UserContext';
import { Typography } from '@mui/material';

const Queue = ({teams, groupID, holdQueue, cancelQueue, onHoldTeams, admitTeam, requeue, loading}) => {
    const user = useContext(UserContext).user;
    return (
        <>
            {teams.map((team,index)=>(
                <div id='queueingTeamContainer' key={index} style={{backgroundColor:onHoldTeams.find(onHoldTeam => onHoldTeam.groupID === team.groupID)?'rgba(255,165,0,0.3)':'transparent'}}>
                    <div id='indexNumber'>{index+1}</div>
                    <div id="queueingTeamMiniProfile"></div>
                    <div id="queueingTeamInformationLive">
                        <div id='queueingTeamNameLive'>{team.groupName}</div>
                        <div id='queueingTeamSectionLive'>{`${team.subjectCode} - ${team.section}`}</div>
                        {user?user.role == "ADVISER"?
                            <>
                                {onHoldTeams.find(onHoldTeam => onHoldTeam.groupID === team.groupID) ? 
                                    <Typography variant='caption' fontStyle='poppins' fontSize='1dvw' fontWeight='bold' color='white' style={{alignSelf:'end', justifySelf:'end'}}>On Hold</Typography> :
                                    <Button disabled={loading} size='sm' style={{paddingInline:'1.5em', border:'none'}} className='buttonCustom' onClick={() => { admitTeam(team.groupID) }}>Admit</Button>
                                }
                            </>
                            :
                            <>
                                {groupID == team.groupID?
                                    <>
                                        {onHoldTeams.find(onHoldTeam=>onHoldTeam.groupID===team.groupID)?
                                            <>
                                                <Button disabled={loading} size='sm' style={{paddingInline:'1.5em', border:'none'}} className='buttonCustom' onClick={requeue}>Requeue</Button>
                                            </>
                                            :
                                            <>
                                                <Button disabled={loading} size='sm' style={{paddingInline:'1.5em', backgroundColor:'#FFD466', border:'none'}} className='buttonCustom' onClick={holdQueue}>Hold</Button>
                                                
                                            </>
                                        }
                                        <Button disabled={loading} size='sm' style={{marginLeft:'5px', paddingInline:'1em', backgroundColor:'#FF6666', border:'none'}} className='buttonCustom' onClick={cancelQueue}>Cancel</Button>
                                        
                                    </>
                                    :
                                    <></>
                                }
                        </>:<></>}
                    </div>
                </div>
            ))}
        </>
    );
}

export default Queue;
