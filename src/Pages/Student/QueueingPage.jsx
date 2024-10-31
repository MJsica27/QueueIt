import vector from '../../Assets/Vector.png'
import { Container, Row, Stack } from 'react-bootstrap';
import StudentNavbar from '../../Components/Navbar/StudentNavbar';
import StudentQueueNavigation from '../../Components/Navbar/StudentQueueNavigation';
import { Typography } from '@mui/material';
import QueueCardContainer from '../../Components/Student/QueueCardContainer';
import { useLocation, useParams } from 'react-router-dom';

const QueueingPage = () => {
    const params = useParams();
    const location = useLocation();
    return (
        // The background
        <div
            style={{
                backgroundImage:`url(${vector})`,
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundColor:'#b9ff66',
                height:'100dvh'
            }}
        >
            <Container
                className='p-0 fluid'
                style={{
                }}
            >
                {/* Navigation row */}
                <Row>
                    <StudentNavbar/>
                </Row>
                {/* White container */}
                <Row className='border p-2'
                    style={{
                        backgroundColor:'white',
                        borderRadius:'20px'
                    }}
                >
                    <Stack direction='column' style={{display:'flex', alignItems:'center'}} gap={3} className='mt-3'>
                        <StudentQueueNavigation/>
                        <Typography>Capstone</Typography>
                        <QueueCardContainer/>
                    </Stack>
                </Row>
            </Container>
            
        </div>
    );
}

export default QueueingPage;
