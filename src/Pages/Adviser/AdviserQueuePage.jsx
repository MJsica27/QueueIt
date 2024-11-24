import React from 'react';
import { Typography } from '@mui/material';
import AdviserSetQueue from '../../Components/Adviser/AdviserSetQueue'; 
import UserNavbar from '../../Components/Navbar/UserNavbar';


export default function AdviserQueuePage() {

  
  return (
    <div className="m-0 vh-100" style={{ background: '#b9ff66', color: '#333333'  }}>
      <UserNavbar/>
        <div style={{ background: '#fff', height: '90vh',  padding: '20px',  display: 'flex', justifyContent: 'center'}}> 
          
          {/*<<<<<left side-----<<<<<*/}
          <div style={{ background: '#fff', width: '500px', margin:'1px 5px 0px 0px'}}> 

            {/*-----left upper-----*/}
            <div style={{ background: '#f7f7f7', width: 'auto',height: '300px', marginBottom:'10px', padding: '5px 0 0 15px', borderRadius: '5px' }}>
              <Typography variant='subtitle2' fontWeight='bold' color='gray'>Queue</Typography> 
              <AdviserSetQueue />
            </div>

            {/*-----left lower-----*/}
            <div style={{ background: '#f7f7f7', width: 'auto',height: '320px',  padding: '5px 0 0 15px', borderRadius: '5px' }}>
              <Typography variant='subtitle2' fontWeight='bold' color='gray'>Up next</Typography>
            </div>
          </div>

          {/*>>>>>right side>>>>>*/}
          <div style={{ background: '#fff', width: '900px', margin:'1px 0px 0px 5px'}}> 
            {/*-----right upper-----*/}
            <div style={{ background: '#f7f7f7', width: 'auto', height: '180px', marginBottom:'10px', padding: '5px 0 0 15px', borderRadius: '5px' }}>
              <Typography variant='subtitle2' fontWeight='bold' color='gray'>Currently Tending</Typography>
            </div>

            {/*-----right lower-----*/}
            <div style={{ background: '#f7f7f7', width: 'auto', height: '440px', borderRadius: '5px',   display: 'flex', justifyContent: 'center' }}>
              
                {/* notes */}
              <div style={{ background: '#f7f7f7', width: '750px', height: '440px', borderRadius: '5px', margin: '10px 0 0 15px'}}>
                <Typography variant='subtitle2' fontWeight='bold' color='gray'>Note</Typography>
                <div style={{ background: '#fff', borderRadius: '5px', width: '740px', height: '400px',  }}>

                </div>
              </div>
               
                {/* Attendance */}
              <div style={{ background: '#d9d9d9', width: '250px', height: '440px', marginLeft:'10px', padding:'10px', borderRadius: '0 5px 5px 0'}}>
                <Typography variant='subtitle1' fontWeight='bold' color='white'>Attendance</Typography>
              </div>

              <div>
                
              </div>
            </div>

          </div>
        </div>
    </div>
  )
}
