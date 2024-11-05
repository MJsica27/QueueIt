import { Typography } from '@mui/material';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../../Static/StudentQueueNavigation.css';

export default function AdviserClassroomNavigation() {
    return (
        <Container className='fluid w-25 p-3' style={{
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
                        Groups
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
                        All Students
                    </Typography>
                </Col> 
            </Row>
        </Container>
    );
}
 
