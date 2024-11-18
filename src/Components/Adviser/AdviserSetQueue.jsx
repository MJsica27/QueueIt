import React, { useState } from 'react';  
import TextField from '@mui/material/TextField';
import TodayIcon from '@mui/icons-material/Today';
import BasicTimePicker from '../Utils/BasicTimePicker'; 
import Select from 'react-select';  
import Button from '@mui/material/Button'; 

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

  const options = [
    { value: 'all', label: 'Select All' },
    {
      label: 'Own Classroom',
      options: [
        { value: '1', label: 'Mobile Dev' },
        { value: '2', label: 'OOP 1' },
        { value: '3', label: 'OOP 2' },
        { value: '4', label: 'App Dev' },
      ],
    },
    {
      label: 'Mentored',
      options: [
        { value: '5', label: 'Capstone 1' },
        { value: '6', label: 'Captone 2' },
        { value: '7', label: 'Soft Eng' },
      ],
    },
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

  return (
    <div style={{ marginTop: '5px', width: '98%', padding: '0px 5px 0px 5px' }}>
      {/* date&time container */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Calendar Icon */}
        <TodayIcon style={{ color: '#505050', fontSize: '30px' }} />

        {/* Current Date */}
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#505050' }}>{currentDate}</span>

        {/* Time Picker */}
        <div style={{ marginLeft: 'auto' }}>
          <BasicTimePicker />
        </div>
      </div>

      {/* Dropdown */}
      <div style={{ marginTop: '10px' }}>
        <Select
          options={options}
          isMulti 
          placeholder="Select allowed sections to queue."
          label="Framework"
          styles={customStyles}  
        />
      </div>

      {/* TextField */}
      <div style={{ marginTop: '10px', backgroundColor:'#fff' }}>
        <TextField
          id="outlined-multiline-static"
          label="Notes"
          multiline
          rows={2} 
          fullWidth  
        />
      </div>

      {/* Button aligned to the right */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <Button    
        // onClick={handleOnClick} 
          variant="contained" 
          style={{ 
            background: '#b9ff66', 
            color: '#000', 
            textTransform: 'none', 
            fontWeight: 'bold'
          }}
        > 
          Open
        </Button>
      </div> 
    </div>
  );
}
