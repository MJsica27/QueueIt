import React, { useContext, useEffect, useState } from 'react';  
import TextField from '@mui/material/TextField';
import TodayIcon from '@mui/icons-material/Today';
import BasicTimePicker from '../Utils/BasicTimePicker'; 
import Select from 'react-select';  
import Button from '@mui/material/Button'; 
import { UserContext } from '../User/UserContext';
import { toast } from 'react-toastify';

// Function to get the current date
function getDate() {
  const today = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month} ${date}, ${year}`;
}



export default function AdviserSetQueue() {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [classroomOptions, setClassroomOptions] = useState([]);
  const [time, setTime] = useState(null)
  const user = useContext(UserContext).user;
  const [minTime, setMinTime] = useState('');
  const [classID,setClassID] = useState(-1);
  const [message,setMessage] = useState("")
  const [adviser,setAdviser] = useState(null)
  useEffect(() => {
    if(user){
      fetchClassrooms();
      fetchAdviser();
      console.log(adviser)
    }
    // Function to get the current time in HH:MM format
    const getCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0'); // Add leading zero if needed
      const minutes = String(now.getMinutes()).padStart(2, '0'); // Add leading zero if needed
      return `${hours}:${minutes}`;
    };

    // Set the minimum time to the current time
    setMinTime(getCurrentTime());
  }, []);

  const fetchAdviser = async () => {
    try {
        const response = await fetch(`http://localhost:8080/user/getAdviser?userID=${user.userID}`, {
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
  const fetchClassrooms = async ()=>{
    try{
      const response = await fetch(`http://localhost:8080/classroom/ClassroomsByAdviser?userID=${user.userID}`)

      if(response.ok){
        const data = await response.json();
        let temp = []
        data.map((classroom)=>{
          temp.push({value:classroom.classID, label:`${classroom.subjectName} - ${classroom.section}`})
        })
        setClassroomOptions(temp)
      }
    }catch(err){
      console.log(err)
    }
  }

  

  const options = [
    { value: '-1', label: 'Select All' },
    {
      label: 'Your Classrooms',
      options:classroomOptions
    },
    // {
    //   label: 'Mentored',
    //   options: [
    //     { value: '5', label: 'Capstone 1' },
    //     { value: '6', label: 'Captone 2' },
    //     { value: '7', label: 'Soft Eng' },
    //   ],
    // },
  ];

  // para solid ang background ni select/dropdown
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#fff',  
      zIndex: 9999,  
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: '#fff', 
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: '#fff', 
    }),
  };

  const openQueueing = async () =>{
    if(time < minTime){
      toast.error("Please select valid time.")
    }else{
      try{
        const response = await fetch(`http://localhost:8080/queue/adviser/open`,{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              adviserID: user.userID,
              timeEnds: time,
              classID: classID,
              message: message
          }),
        })
  
        if (response.ok){          
          setAdviser({
            ...adviser,
            ready: true
          })
        }
      }catch(err){
        console.log(err)
      }
    }
  }

  const closeQueueing = async () =>{
    if(time < minTime){
      toast.error("Please select valid time.")
    }else{
      try{
        const response = await fetch(`http://localhost:8080/queue/adviser/close`,{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              adviserID: user.userID,
          }),
        })
  
        if (response.ok){          
          setAdviser({
            ...adviser,
            ready: false
          })
        }
      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <div style={{ marginTop: '5px', width: '98%', padding: '0px 5px 0px 5px' }}>
      {/* date&time container */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Calendar Icon */}
        <TodayIcon style={{ color: '#505050', fontSize: '1.5em' }} />

        {/* Current Date */}
        <span style={{ fontSize: '1em', fontWeight: 'bold', color: '#505050' }}>{currentDate}</span>

        {/* Time Picker */}
        <div style={{ marginLeft: 'auto' }}>
          {/* <BasicTimePicker setTime={setTime} /> */}
          <input type="time" min={minTime} onChange={(e)=>{setTime(e.target.value)}}/>
        </div>
      </div>

      {/* Dropdown */}
      <div style={{ marginTop: '4px' }}>
        <Select
          options={options}
          placeholder="Select allowed class to queue."
          label="Framework"
          styles={customStyles}
          onChange={(e)=>{setClassID(e.target.value)}}
        />
      </div>

      {/* TextField */}
      <div style={{ marginTop: '4px', backgroundColor:'#fff' }}>
        <TextField
          id="outlined-multiline-static"
          label="Notes"
          multiline
          rows={3} 
          fullWidth  
          onChange={(e)=>{setMessage(e.target.value)}}
        />
      </div>

      {/* Button aligned to the right */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        {adviser?
          <Button    
          // onClick={handleOnClick} 
            variant="contained" 
            style={{ 
              background: adviser.ready?'rgba(255,0,0,0.7)':'#b9ff66', 
              color: adviser.ready?'white':'#000', 
              textTransform: 'none', 
              fontWeight: 'bold'
            }}
  
            onClick={adviser.ready?closeQueueing:openQueueing}
          > 
            {adviser.ready?<>Close</>:<>Open</>}
          </Button>:<></>
        }
      </div> 
    </div>
  );
}
