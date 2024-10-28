import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


const QueueCardContainer = () => {

    const [stompClient, setStompClient] = useState(null);
    const [adviser, setAdviser] = useState({
        "user": {
            "userID": 1,
            "username": "iceman",
            "firstname": "ice",
            "lastname": "man",
            "photoURL": "test",
            "role": null
        },
        "availableTime": null,
        "expertise": null,
        "ready": false
    });

    useEffect(() => {
        const socket = new SockJS('http:/localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({},()=>{
            client.subscribe(`/topic/queueStatus/adviser/${adviser.user.userID}`,(message)=>{
                const receivedMessage = JSON.parse(message.body);
                setAdviser(receivedMessage);
            })
        })

        setStompClient(client);
        return () => {
            if(client.connected){
                client.disconnect();
            }
        };
    }, []);

    return (
        <Container
            className='fluid w-75'
            style={{
                borderRadius:'20px',
                border:'solid 1px black',
                overflow:'hidden'
            }}
        >
            <Row className='p-2' style={{backgroundColor:'#b9ff66', borderBottom:'solid 1px black', fontWeight:'bold'}}>
                Teacher name
            </Row>
            <Row>
                <Col md={8} className='p-2'>
                    Content Row
                
                </Col>  
                <Col md={4} className='d-flex align-items-center justify-content-center p-2' style={{borderLeft:'solid 1px black'}}>
                    {adviser.ready?<button>Queue now</button>:<Typography>Not available</Typography>}
                </Col>
            </Row>
        </Container>
    );
}

export default QueueCardContainer;
