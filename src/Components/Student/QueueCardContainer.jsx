import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';



const QueueCardContainer = ({adviserID}) => {
    const [adviser, setAdviser] = useState(null);

    

    return (
        <Container
            className='fluid w-75 shadow rounded'
            style={{
                overflow:'hidden',
                border:'solid 1px rgba(0,0,0,0.05)',
            }}
        >
            <Row className='p-2' style={{ borderBottom:'solid 1px rgba(0,0,0,0.1)'}}>
                <Typography style={{fontWeight:'bold', fontSize:'15px'}} variant='caption'>{adviser?adviser.user.firstname:<></>} {adviser?adviser.user.lastname:<></>}</Typography>
            </Row>
            <Row>
                <Col md={8} className='p-2'>
                    {adviser?adviser.availableTime?
                    //if adviser set his/her available time
                    <></>
                    :
                    <>No available time</>
                    :<></>}
                
                </Col>  
                <Col md={4} className='d-flex align-items-center justify-content-center p-2' style={{borderLeft:'solid 1px rgba(0,0,0,0.1)'}}>
                    {adviser?adviser.ready?<button>Queue now</button>:<Typography>Not available</Typography>:<></>}
                </Col>
            </Row>
        </Container>
    );
}

export default QueueCardContainer;
