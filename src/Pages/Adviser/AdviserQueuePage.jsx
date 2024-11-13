import React, { useState } from 'react';
import { Typography } from '@mui/material';
import AdviserNavbar from '../../Components/Navbar/AdviserNavbar'; 


// temporary rani ari nag testing pako
function getDate() {
  const today = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[today.getMonth()]; // getMonth() returns 0-11
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month} ${date}, ${year}`;
}


export default function AdviserQueuePage() {

  const [currentDate, setCurrentDate] = useState(getDate());
  return (
    <div className="m-0 vh-100" style={{ background: '#b9ff66', color: '#333333'  }}>
      <AdviserNavbar />
        <div style={{ background: '#fff', height: '90vh',  padding: '20px',  display: 'flex', justifyContent: 'center'}}> 
          
          {/*<<<<<left side-----<<<<<*/}
          <div style={{ background: '#fff', width: '450px', margin:'1px 5px 0px 0px'}}> 

            {/*-----left upper-----*/}
            <div style={{ background: '#f7f7f7', width: 'auto',height: '300px', marginBottom:'10px', padding: '5px 0 0 15px', borderRadius: '5px' }}>
              <Typography variant='subtitle2' fontWeight='bold' color='gray'>Queue</Typography>
              <p>{currentDate}</p>
            </div>

            {/*-----left lower-----*/}
            <div style={{ background: '#f7f7f7', width: 'auto',height: '320px',  padding: '5px 0 0 15px', borderRadius: '5px' }}>
              <Typography variant='subtitle2' fontWeight='bold' color='gray'>Up next</Typography>
            </div>
          </div>

          {/*>>>>>right side>>>>>*/}
          <div style={{ background: '#fff', width: '950px', margin:'1px 0px 0px 5px'}}> 
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
