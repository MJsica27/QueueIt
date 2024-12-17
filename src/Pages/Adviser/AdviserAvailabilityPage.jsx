import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AdviserNavbar from '../../Components/Navbar/UserNavbar';
import AdviserBackgroundPage from '../../Components/Backgound/AdviserBackgroundPage';
import { Box, Card, CardContent, Typography, Button, CardMedia, Modal, TextField, Fade } from '@mui/material';
import Grid from '@mui/material/Grid2';
import EditIcon from '@mui/icons-material/Edit';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import illustration1 from '../../Assets/img/illustration1.png';
import illustration2 from '../../Assets/img/illustration2.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function AdviserAvailabilityPage() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [availableTime, setAvailableTime] = useState([]);
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [freeTime, setFreeTime] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [newEntry, setNewEntry] = useState({ week: '', date: '', start: '', end: '' });
  const [isWeekly, setIsWeekly] = useState(true);
  const [editingEntryIndex, setEditingEntryIndex] = useState(null);
  const [fade, setFade] = useState(true);
  // const itemsPerPage = 4;
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isWeeklyDelete, setIsWeeklyDelete] = useState(true);
  const navigate = useNavigate();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isDeletedSuccessfully, setIsDeletedSuccessfully] = useState(false);
  const [isUpdatedSuccessfully, setIsUpdatedSuccessfully] = useState(false); // Track update success
  const [isAddedSuccessfully, setIsAddedSuccessfully] = useState(false);
  const [isAdding, setIsAdding] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userID = user.userID;
  const token = localStorage.getItem('token');

  const theme = createTheme({
    palette: {
      primary: {
        light: 'lightGray',
        main: '#7D57FC',
        dark: '#B1EC20',
        contrastText: '#000',
      },
      secondary: {
        light: '#9B7CFF',
        main: '#7D57FC',
        dark: '#5D32ED',
        contrastText: '#fff',
      },
    },
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/');
    }
  }, [navigate]);

  const fetchAdviserData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/getAdviser?userID=${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      const parsedAvailableTime = JSON.parse(data.availableTime || '[]');

      setAvailableTime(parsedAvailableTime);
      splitData(parsedAvailableTime);
    } catch (error) {
      console.error('Error fetching adviser data:', error);
    }
  };

  const splitData = (data) => {
    const weekly = data.filter((item) => item.week);
    const free = data.filter((item) => item.date);

    const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const sortedWeekly = weekly.sort((a, b) => dayOrder.indexOf(a.week) - dayOrder.indexOf(b.week));

    const sortedFreeTime = free.sort((a, b) => new Date(a.date) - new Date(b.date));

    setWeeklySchedule(sortedWeekly);
    setFreeTime(sortedFreeTime);
  };

  const openAddForm = () => {
    setIsAdding(true); // Set to true for adding
  };
  const openUpdateForm = (index) => {
    setIsAdding(false); // Set to false for updating
    setEditingEntryIndex(index); // Set the index of the entry to update
  };

  const handleAddEntry = async () => {
    const isAdded = true;
    const formattedDate = formatDate(newEntry.date);
    const formattedStartTime = convertTo24HourFormat(newEntry.start);
    const formattedEndTime = convertTo24HourFormat(newEntry.end);
    // const isSuccess = true;

    let updatedData;

    if (isWeekly) {
      if (editingEntryIndex !== null) {
        updatedData = weeklySchedule.map((entry, index) =>
          index === editingEntryIndex
            ? { week: newEntry.week, start: formattedStartTime, end: formattedEndTime }
            : entry
        );
      } else {
        updatedData = [...weeklySchedule, { week: newEntry.week, start: formattedStartTime, end: formattedEndTime }];
      }
      setWeeklySchedule(updatedData);
    } else {
      if (editingEntryIndex !== null) {
        updatedData = freeTime.map((entry, index) =>
          index === editingEntryIndex
            ? { date: formattedDate, start: formattedStartTime, end: formattedEndTime }
            : entry
        );
      } else {
        updatedData = [...freeTime, { date: formattedDate, start: formattedStartTime, end: formattedEndTime }];
      }
      setFreeTime(updatedData);
    }

    setOpenModal(false);
    setNewEntry({ week: '', date: '', start: '', end: '' });
    setEditingEntryIndex(null);

    if (isAdded) {
      setSuccessMessage('Added Successfully');
      setIsUpdatedSuccessfully(true);
      setOpenSuccessModal(true);
    } else {
      setSuccessMessage('Adding of Schedule Failed');
      setIsUpdatedSuccessfully(false);
      setOpenSuccessModal(true);
    }
  };
  const handleDeleteEntry = async (index) => {
    // Your logic for deleting an entry
    const isDeleted = true; // Replace with actual deletion logic

    if (isDeleted) {
      setSuccessMessage('Deleted Successfully');
      setIsDeletedSuccessfully(true);
    } else {
      setSuccessMessage('Card Deletion Unsuccessfully');
      setIsDeletedSuccessfully(false);
    }
    setOpenSuccessModal(true); // Open the modal after deletion attempt
  };

  const handleUpdateEntry = async (index) => {
    // const isUpdated = true; // Replace with actual update logic
    const isAdded = true;
    const formattedDate = formatDate(newEntry.date);
    const formattedStartTime = convertTo24HourFormat(newEntry.start);
    const formattedEndTime = convertTo24HourFormat(newEntry.end);
    // const isSuccess = true;

    let updatedData;

    if (isWeekly) {
      if (editingEntryIndex !== null) {
        updatedData = weeklySchedule.map((entry, index) =>
          index === editingEntryIndex
            ? { week: newEntry.week, start: formattedStartTime, end: formattedEndTime }
            : entry
        );
      } else {
        updatedData = [...weeklySchedule, { week: newEntry.week, start: formattedStartTime, end: formattedEndTime }];
      }
      setWeeklySchedule(updatedData);
    } else {
      if (editingEntryIndex !== null) {
        updatedData = freeTime.map((entry, index) =>
          index === editingEntryIndex
            ? { date: formattedDate, start: formattedStartTime, end: formattedEndTime }
            : entry
        );
      } else {
        updatedData = [...freeTime, { date: formattedDate, start: formattedStartTime, end: formattedEndTime }];
      }
      setFreeTime(updatedData);
    }

    setOpenModal(false);
    setNewEntry({ week: '', date: '', start: '', end: '' });
    setEditingEntryIndex(null);

    if (isAdded) {
      setSuccessMessage('Updated Successfully');
      setIsUpdatedSuccessfully(true);
      setOpenSuccessModal(true);
    } else {
      setSuccessMessage('Card Update Unsuccessfully');
      setIsUpdatedSuccessfully(false);
      setOpenSuccessModal(true);
    }

    // if (isUpdated) {
    //   setSuccessMessage('Updated Successfully');
    //   setIsUpdatedSuccessfully(true); // Set to true for successful update
    // } else {
    //   setSuccessMessage('Card Update Unsuccessfully');
    //   setIsUpdatedSuccessfully(false); // Set to false for unsuccessful update
    // }
    setOpenSuccessModal(true); // Open the modal after update attempt
  };

  const handleAction = () => {
    if (isAdding && editingEntryIndex === null) {
      console.log("Calling handleAddEntry");
      handleAddEntry(); // Call add function if in add mode
    } else {
      console.log("Calling handleUpdateEntry with index:", editingEntryIndex);
      handleUpdateEntry();
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    setIsDeletedSuccessfully(false);
    setIsUpdatedSuccessfully(false);
    setIsAddedSuccessfully(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const convertTo24HourFormat = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = String(Number(hours) + 12);
    } else if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const convertToRawFormat = (formattedDate, formattedTime) => {
    const date = new Date(formattedDate);
    if (!formattedTime) {
      throw new Error("formattedTime is undefined");
    }

    const [time, ampm] = formattedTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (ampm === 'PM' && hours !== 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;

    return {
      date: date.toISOString().split('T')[0],
      time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
    };
  };

  const handleSaveAvailability = async () => {
    const combinedData = [
      ...weeklySchedule.map(entry => ({
        ...entry,

        start: entry.start,
        end: entry.end,
      })),
      ...freeTime.map(entry => ({
        ...entry,

        date: entry.date,
        start: entry.start,
        end: entry.end,
      })),
    ];

    try {
      const response = await fetch(`http://localhost:8080/user/setAdviserAvailability?userID=${userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ availableTime: combinedData }),
      });

      if (response.ok) {
        setAvailableTime(combinedData);
        splitData(combinedData);
        setEditMode(false);
      } else {
        console.error('Failed to save availability');
      }
    } catch (error) {
      console.error('Error saving availability:', error);
    }
  };

  useEffect(() => {
    fetchAdviserData();
  }, []);

  const handleOpenModal = (isWeekly) => {
    setIsWeekly(isWeekly);
    setOpenModal(true);
    setEditingEntryIndex(null);
    setNewEntry({ week: '', date: '', start: '', end: '' });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingEntryIndex(null);
    setNewEntry({ week: '', date: '', start: '', end: '' });
  };

  // const nextGroup = () => {
  //   setFade(false);
  //   setTimeout(() => {
  //     if (currentGroupIndex < Math.floor(weeklySchedule.length / itemsPerPage)) {
  //       setCurrentGroupIndex(currentGroupIndex + 1);
  //     }
  //     setFade(true);
  //   }, 500);
  // };

  const prevGroup = () => {
    setFade(false);
    setTimeout(() => {
      if (currentGroupIndex > 0) {
        setCurrentGroupIndex(currentGroupIndex - 1);
      }
      setFade(true);
    }, 500);
  };

  const currentCards = weeklySchedule;

  const handleCardClick = (index, isWeekly, fromDeleteIcon = false) => {
    if (!editMode || fromDeleteIcon) return;

    const timeSlot = isWeekly ? weeklySchedule[index] : freeTime[index];
    const startIn24Hour = convertTo24HourFormat(timeSlot.start);
    const endIn24Hour = convertTo24HourFormat(timeSlot.end);

    setNewEntry({
      week: isWeekly ? timeSlot.week : '',
      date: isWeekly ? '' : formatDateToISO(timeSlot.date),
      start: startIn24Hour,
      end: endIn24Hour,
    });

    setIsWeekly(isWeekly);
    setOpenModal(true);
    setEditingEntryIndex(index);
  };

  const isFormValid = () => {
    const { week, date, start, end } = newEntry;
    return (isWeekly ? week : date) && start && end;
  };

  const formatDateToISO = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [illustrationWidth, setIllustrationWidth] = useState(80);
  const [containerWidth, setContainerWidth] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  const illustrationRef = useRef(null);
  const containerRef = useRef(null);

  const handleImageLoad = () => {
    if (illustrationRef.current) {
      setIllustrationWidth(illustrationRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    // Calculate the width of the illustration after it has loaded
    const handleResize = () => {
      if (illustrationRef.current || containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setContainerWidth(containerWidth);
        setIllustrationWidth(illustrationRef.current.offsetWidth);
      }
    };

    handleImageLoad();
    // Set the initial width
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <div className="m-0 vh-100" style={{ color: '#000' }}>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1, // Ensure it stays behind other content
          }}
        >
          <AdviserBackgroundPage />
        </div>
        <AdviserNavbar />
        <div
          style={{
            backgroundColor: 'white',
            borderStyle: 'solid',
            borderColor: 'black',
            borderWidth: '1px',
            margin: '2% 6% 1% 6%', // Adjust margins as needed
            borderRadius: '10px', // Optional: for rounded corners
            padding: '2% 4% 2% 4%', // Optional: for inner spacing
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Optional: for a subtle shadow
          }}
        >
          <div style={{ height: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1" align="center">
                Plot your available time
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}
              >
                Weekly Schedule
              </Typography>

              <Box
                sx={{
                  backgroundColor: '#7D57FC',
                  width: '100%',
                  borderRadius: '10px',
                  padding: '20px',
                  position: 'relative',
                  overflow: 'visible',
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                {editMode ? (
                  <Button
                    title="Save Changes"
                    variant="contained"
                    sx={{ position: 'absolute', borderRadius: '10px', backgroundColor: '#CCFC57', color: 'black' }}
                    onClick={handleSaveAvailability}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    title="Edit"
                    variant="contained"
                    sx={{ position: 'absolute', borderRadius: '10px', backgroundColor: '#CCFC57', color: 'black' }}
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </Button>
                )}
                <Box
                  sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    padding: '0 10px',
                    paddingTop: '50px', // Adjust padding to position cards below the button
                    maxWidth: 'calc(100% - 400px)',
                    '&::-webkit-scrollbar': {
                      height: '8px', // Height of the scrollbar
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#9778FF',
                      borderRadius: '10px', // Optional: rounded corners for the scrollbar thumb
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'transparent', // Background of the scrollbar track
                    },
                    scrollbarColor: '#9778FF',
                  }}
                >
                  <Fade in={fade} timeout={500}>
                    <Box sx={{ display: 'flex' }}>
                      {currentCards.map((timeSlot, index) => {
                        return (
                          <Box key={index} sx={{ display: 'inline-block', width: '185px', padding: '10px 0' }}>
                            <Card
                              sx={{ textAlign: 'left', backgroundColor: '#FBFFF1', borderRadius: '10px', position: 'relative', width: '170px', height: '192px' }}
                              onClick={() => handleCardClick(index, true)}
                            >
                              <Box
                                component="img"
                                src={require('../../Assets/img/img4.png')} // Adjust the path as necessary
                                alt="Top Right Image"
                                sx={{
                                  position: 'absolute',
                                  top: '15px',
                                  right: '5px',
                                  width: '55px', // Set the size of the image
                                  height: 'auto', // Maintain aspect ratio
                                }}
                              />
                              <CardContent sx={{ padding: '8px' }}>
                                <Box
                                  sx={{
                                    position: 'absolute',
                                    bottom: '10px', // Adjust as needed
                                    left: '10px', // Adjust as needed
                                    color: 'black', // Change text color if needed
                                  }}
                                >
                                  <Typography variant="h5" sx={{ margin: '0px' }}>
                                    {timeSlot.week}
                                  </Typography>
                                  <Typography variant="body2">
                                    {formatTime(timeSlot.start)} - {formatTime(timeSlot.end)}
                                  </Typography>
                                </Box>
                              </CardContent>
                              {editMode && (
                                <Box title='Delete Schedule' sx={{ position: 'absolute', top: '5px' }}>
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent the click from bubbling up
                                      setDeleteIndex(index); // Set the index to be deleted
                                      setIsWeeklyDelete(true); // Set the delete type
                                      setOpenDeleteModal(true); // Open the delete modal
                                    }}
                                    sx={{
                                      cursor: 'pointer',
                                      color: 'black',
                                      fontSize: '0.75rem',
                                      textDecoration: 'underline',
                                      textTransform: 'none', // Prevent uppercase transformation
                                      padding: '0', // Remove default padding
                                      '&:hover': {
                                        fontWeight: 'bold',
                                        textDecoration: 'underline',
                                      },
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </Box>
                              )}
                            </Card>
                          </Box>
                        );
                      })}
                      {editMode && (
                        <Box
                          sx={{
                            display: 'inline-block',
                            width: '185px',
                            padding: '10px 0',
                          }}
                        >
                          <Button
                            variant="outlined"
                            sx={{
                              width: '170px',
                              height: '192px',
                              color: '#333333',
                              borderColor: '#333333',
                            }}
                            onClick={() => handleOpenModal(true)}
                          >
                            <AddIcon />
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Fade>
                </Box>
                {/* Add the illustration image on the right side */}
                <Box
                  sx={{
                    position: 'absolute', // Use absolute positioning
                    right: '-6%', // Move the image out of the box
                    top: '50%', // Center vertically
                    transform: 'translateY(-50%)', // Adjust for vertical centering
                    zIndex: 3,
                    pointerEvents: 'none',
                  }}
                >
                  <Box
                    component="img"
                    src={illustration1} // Replace with the correct path to your image
                    alt="Illustration"
                    sx={{
                      maxWidth: 'none', // Set the width of the illustration
                      height: 'auto', // Maintain aspect ratio
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </div>


          <Box
            sx={{
              marginTop: '20px',
              backgroundColor: 'white',
              borderRadius: '20px',
              paddingTop: '30px',
              position: 'relative',
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', marginBottom: '35px' }}
            >
              Free Time

            </Typography>

            <Box
              ref={containerRef}
              sx={{
                backgroundColor: '#CCFC57',
                width: '100%',
                borderRadius: '10px',
                padding: '20px',
                position: 'relative',
                overflow: 'visible',
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
              }}
            >
              {/* This Box is for the Edit button */}
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                {editMode ? (
                  <Button
                    title="Save Changes"
                    variant="none"
                    sx={{ float: 'right', borderRadius: '10px', backgroundColor: '#7D57FC', color: 'white' }}
                    onClick={handleSaveAvailability}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    title="Edit"
                    variant="none"
                    sx={{ float: 'right', borderRadius: '10px', backgroundColor: '#7D57FC', color: 'white' }}
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </Button>
                )}
              </Box>
              <div>
                <Box
                  sx={{
                    position: 'absolute',
                    left: '-4%',
                    top: '43%',
                    transform: 'translateY(-50%)',
                    zIndex: 3,
                    pointerEvents: 'none',
                  }}
                >
                  <Box
                    component="img"
                    src={illustration2}
                    alt="Illustration"
                    ref={illustrationRef}
                    onLoad={handleImageLoad}
                    sx={{
                      maxWidth: 'none',
                      height: 'auto',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'relative',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    padding: '0 10px',
                    marginLeft: `${illustrationWidth - 80}px`,
                    maxWidth: `${containerWidth - illustrationWidth + 30}px`,
                    '&::-webkit-scrollbar': { height: '8px' },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#E8FFAF',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-track': { background: 'transparent' },
                    scrollbarColor: '#9778FF',
                  }}
                >
                  <Fade in={fade} timeout={500}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      {freeTime.map((timeSlot, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'inline-block',
                            width: '200px',
                            padding: '10px 0',
                          }}
                        >
                          <Card
                            sx={{
                              textAlign: 'left',
                              backgroundColor: '#FBFFF1',
                              borderRadius: '10px',
                              position: 'relative',
                              width: '185px',
                              height: '192px',
                              marginRight: '15px',
                            }}
                            onClick={() => handleCardClick(index, false)}
                          >
                            <Box
                              component="img"
                              src={require('../../Assets/img/img4.png')}
                              alt="Top Right Image"
                              sx={{
                                position: 'absolute',
                                top: '15px',
                                right: '5px',
                                width: '55px',
                                height: 'auto',
                              }}
                            />
                            <CardContent sx={{ padding: '8px' }}>
                              <Box
                                sx={{
                                  position: 'absolute',
                                  bottom: '10px',
                                  left: '10px',
                                  color: 'black',
                                }}
                              >
                                <Typography sx={{ margin: '0px', fontSize: '1.18em' }}>
                                  {formatDate(timeSlot.date)}
                                </Typography>
                                <Typography variant="body2">
                                  {formatTime(timeSlot.start)} - {formatTime(timeSlot.end)}
                                </Typography>
                              </Box>
                            </CardContent>
                            {editMode && (
                              <Box
                                title="Delete Schedule"
                                sx={{ position: 'absolute', top: '5px' }}
                              >
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent the click from bubbling up
                                    setDeleteIndex(index); // Set the index to be deleted
                                    setIsWeeklyDelete(false); // Set the delete type
                                    setOpenDeleteModal(true); // Open the delete modal
                                  }}
                                  sx={{
                                    cursor: 'pointer',
                                    color: 'black',
                                    textDecoration: 'underline',
                                    textTransform: 'none', // Prevent uppercase transformation
                                    padding: '0', // Remove default padding
                                    fontSize: '0.75rem', // Set the font size to a smaller value (e.g., 12px)
                                    '&:hover': {
                                      fontWeight: 'bold',
                                      textDecoration: 'underline', // Optional: underline on hover
                                    },
                                  }}
                                >
                                  Remove
                                </Button>
                              </Box>
                            )}
                          </Card>
                        </Box>
                      ))}
                      {editMode && (
                        <Box
                          sx={{
                            display: 'inline-block',
                            width: '185px',
                            padding: '10px 0',
                          }}
                        >
                          <Button
                            variant="outlined"
                            sx={{
                              width: '170px',
                              height: '192px',
                              color: '#333333',
                              borderColor: '#333333',
                            }}
                            onClick={() => handleOpenModal(false)}
                          >
                            <AddIcon />
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Fade>
                </Box>
              </div>
            </Box>
          </Box>


          <Modal open={openModal} onClose={handleCloseModal}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                backgroundColor: '#fff',
                boxShadow: 24,
                p: 4,
                borderRadius: '10px',
              }}
            >
              <Typography variant="h5" component="h2" sx={{ mb: 2, color: '#7D57FC', fontWeight: 'bold', textAlign: 'center' }}>
                {isWeekly ? 'Weekly Schedule' : 'Free Time'}
              </Typography>
              {isWeekly ? (
                <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
                  {['S', 'M', 'T', 'W', 'TH', 'F', 'S'].map((day, index) => (
                    <Button
                      //color="secondary"
                      key={index}
                      variant={newEntry.week === ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][index] ? 'contained' : 'outlined'}
                      onClick={() => setNewEntry({ ...newEntry, week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][index] })}
                      sx={{
                        borderRadius: '50%',
                        minWidth: '40px',
                        minHeight: '40px',
                        padding: '0',
                        fontSize: '16px',
                        backgroundColor: 'secondary',
                        borderColor: 'black',
                        color: 'black'
                      }}
                    >
                      {day}
                    </Button>
                  ))}
                </Box>
              ) : (
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  sx={{ mb: 2 }}
                  required
                />
              )}
              <TextField
                fullWidth
                label="Start Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={newEntry.start}
                onChange={(e) => setNewEntry({ ...newEntry, start: e.target.value })}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="End Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={newEntry.end}
                onChange={(e) => setNewEntry({ ...newEntry, end: e.target.value })}
                sx={{ mb: 2 }}
                required
              />
              <Box display="flex" justifyContent="center" mt={3}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCloseModal}
                  sx={{
                    backgroundColor: 'white',
                    borderColor: 'white',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: '#AB92FF',
                    },
                  }}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  // color="secondary"
                  onClick={handleAction}
                  disabled={!isFormValid()}
                  sx={{
                    backgroundColor: '#7D57FC',
                    marginLeft: '5px',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#AB92FF',
                    },
                  }}
                >
                  {editingEntryIndex !== null ? 'Update' : 'Add'}
                </Button>
              </Box>
            </Box>
          </Modal>

          <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 430,
                backgroundColor: '#fff',
                boxShadow: 24,
                p: 5,
                borderRadius: '10px',
                textAlign: 'center'
              }}
            >
              <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', marginBottom: '3px', color: 'secondary.main' }}>
                Delete Schedule
              </Typography>
              <Typography variant="body1" sx={{ paddingBottom: '20px' }}>
                Are you sure you want to delete this schedule?
              </Typography>
              <Box display="flex" justifyContent="center" mt={3}>
                <Button
                  variant="outlined"
                  color="black"
                  onClick={() => setOpenDeleteModal(false)}
                  sx={{ borderColor: 'white', '&:hover': { backgroundColor: 'secondary.light', } }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ borderColor: 'secondary.main', marginLeft: '5px', color: 'white', '&:hover': { backgroundColor: 'secondary.light' } }}
                  onClick={() => {
                    let isDeleted = false;
                    if (isWeeklyDelete) {
                      const updatedWeeklySchedule = [...weeklySchedule];
                      updatedWeeklySchedule.splice(deleteIndex, 1);
                      setWeeklySchedule(updatedWeeklySchedule);
                      isDeleted = true;
                    } else {
                      const updatedFreeTime = [...freeTime];
                      updatedFreeTime.splice(deleteIndex, 1);
                      setFreeTime(updatedFreeTime);
                      isDeleted = true;
                    }
                    handleDeleteEntry(deleteIndex);
                    setOpenDeleteModal(false);
                    if (isDeleted) {
                      setSuccessMessage('Deleted Successfully');
                    } else {
                      setSuccessMessage('Card Deletion Unsuccessfully');
                    }
                    setOpenSuccessModal(true);
                  }}
                >
                  Delete
                </Button>

              </Box>
            </Box>
          </Modal>
          {/* Success/Failure Modal */}
          <Modal open={openSuccessModal} onClose={handleCloseSuccessModal}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                backgroundColor: '#fff',
                boxShadow: 24,
                p: 4,
                borderRadius: '10px',
                textAlign: 'center',
              }}
            >
              {isDeletedSuccessfully || isUpdatedSuccessfully || isAddedSuccessfully ? (
                <CheckCircleOutlineIcon sx={{ fontSize: '4rem', color: 'secondary.main' }} />
              ) : (
                <ErrorOutlineIcon sx={{ fontSize: '4rem', color: 'error.main' }} />
              )}
              <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                {successMessage}
              </Typography>
              <Button
                variant="contained"
                onClick={handleCloseSuccessModal}
                sx={{
                  backgroundColor: '#7D57FC',
                  borderRadius: '10px',
                  marginTop: '30px',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'secondary.light',
                  },
                }}
              >
                Close
              </Button>
            </Box>
          </Modal>
        </div>
      </div>
    </ThemeProvider>
  );
}