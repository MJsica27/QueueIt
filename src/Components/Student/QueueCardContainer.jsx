import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


const QueueCardContainer = ({adviserID}) => {
    const [adviser, setAdviser] = useState(null);

    useEffect(() => {
        fetchAdviser();
    }, []);

    const fetchAdviser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user/getAdviser?userID=${adviserID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            switch (response.status) {
                case 200:
                    const data = await response.json();
                    setAdviser(data); // Update the adviser state
                    break;
                case 404:
                    const message = await response.text();
                    toast.error(message);
                    break;
                default:
                    toast.error("Something went wrong while fetching adviser details.");
            }
        } catch (error) {
            toast.error("An error occurred: " + error.message);
        }
    };

    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS('http:/localhost:8080/ws');
        const client = Stomp.over(socket);
        client.debug = ()=>{};
        client.connect({},()=>{
            client.subscribe(`/topic/queueStatus/adviser/${adviser?adviser.user.userID:<></>}`,(message)=>{
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
            <Row className='p-2' style={{backgroundColor:'#b9ff66', borderBottom:'solid 1px black'}}>
                <Typography style={{fontWeight:'bold', fontSize:'15px'}} variant='caption'>{adviser?adviser.user.firstname:<></>} {adviser?adviser.user.lastname:<></>}</Typography>
            </Row>
            <Row>
                <Col md={8} className='p-2'>
                    Content Row
                
                </Col>  
                <Col md={4} className='d-flex align-items-center justify-content-center p-2' style={{borderLeft:'solid 1px black'}}>
                    {adviser?adviser.ready?<button>Queue now</button>:<Typography>Not available</Typography>:<></>}
                </Col>
            </Row>
        </Container>
    );
}

export default QueueCardContainer;
