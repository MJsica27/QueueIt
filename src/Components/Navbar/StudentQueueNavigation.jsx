import { Typography } from '@mui/material';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../../Static/StudentQueueNavigation.css';

const StudentQueueNavigation = () => {
    return (
        <Container className='fluid w-50 p-3' style={{
            backgroundColor:'#b9ff66',
            borderRadius:'20px'
        }}>
            <Row>
                <Col
                    style={{
                        textAlign:'center',
                        fontWeight:'bold',
                        cursor:'pointer'
                    }}
                    className='nav-custom'
                >
                    <Typography
                        variant='subtitle'
                        className='TypoSize'
                    >
                        Team
                    </Typography>
                </Col>
                <Col
                    style={{
                        textAlign:'center',
                        fontWeight:'bold',
                        cursor:'pointer'
                    }}
                    className='nav-custom'
                >
                    <Typography
                        variant='subtitle'
                        className='TypoSize'
                    >
                        Queue
                    </Typography>
                </Col>
                <Col
                    style={{
                        textAlign:'center',
                        fontWeight:'bold',
                        cursor:'pointer'
                    }}
                    className='nav-custom'
                >
                    <Typography
                        variant='subtitle'
                        className='TypoSize'
                    >
                        History
                    </Typography>
                </Col>
            </Row>
        </Container>
    );
}

export default StudentQueueNavigation;
