import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdviserNavbar from '../../Components/Navbar/UserNavbar';
import { Box, Card, CardContent, Typography, Button, CardMedia, Modal, TextField, Fade } from '@mui/material';
import Grid from '@mui/material/Grid2';
import EditIcon from '@mui/icons-material/Edit';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
 
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
  const itemsPerPage = 4;
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null); 
  const [isWeeklyDelete, setIsWeeklyDelete] = useState(true);
  const navigate = useNavigate();
 
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userID = user.userID;
  const token = localStorage.getItem('token');

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
          Authorization: `Bearer ${token}`,
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
 
  const handleAddEntry = async () => {
    const formattedDate = formatDate(newEntry.date);
    const formattedStartTime = convertTo24HourFormat(newEntry.start);
    const formattedEndTime = convertTo24HourFormat(newEntry.end);
 
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
          Authorization: `Bearer ${token}`,
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
    setNewEntry({ week: '', date: '', start: '', end: '' });
  };
 
  const nextGroup = () => {
    setFade(false);
    setTimeout(() => {
      if (currentGroupIndex < Math.floor(weeklySchedule.length / itemsPerPage)) {
        setCurrentGroupIndex(currentGroupIndex + 1);
      }
      setFade(true);
    }, 500);
  };
 
  const prevGroup = () => {
    setFade(false);
    setTimeout(() => {
      if (currentGroupIndex > 0) {
        setCurrentGroupIndex(currentGroupIndex - 1);
      }
      setFade(true);
    }, 500);
  };
 
  const currentCards = weeklySchedule.slice(currentGroupIndex * itemsPerPage, (currentGroupIndex + 1) * itemsPerPage);
 
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
 
  return (
    <div className="m-0 vh-100" style={{ color: '#000' }}>
      <AdviserNavbar />
      <div style={{ height: '100vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '45px 0 0 70px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
            <Box sx={{ flex: '0 0 28%', padding: '80px 20px 50px 20px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Plot your available time</Typography>
                {!editMode && (
                  <Button title="Edit" variant="none" sx={{ marginTop: '-10px', marginBottom: '0', borderRadius: '80px' }} onClick={() => setEditMode(true)}>
                    <EditIcon fontSize="small" />
                  </Button>
                )}
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: '0px' }}>Weekly Schedule</Typography>
              <Typography variant="body2" sx={{ marginTop: '5px', opacity: '0.3', marginTop: '0px' }}>Anyone can view your availability.</Typography>
 
              {editMode && (
                <Box sx={{ marginTop: '20px' }}>
                  <Button variant="outlined" onClick={() => handleOpenModal(true)} sx={{ color: 'black', borderColor: 'gray' }}>Add Time</Button>
                  <Button title="Save Changes" variant="outlined" onClick={handleSaveAvailability} sx={{ marginLeft: '10px', color: 'black', borderColor: 'gray' }}>Done</Button>
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'left', marginTop: '100px' }}>
                <Button disabled={currentGroupIndex === 0} onClick={prevGroup} sx={{ color: currentGroupIndex === 0 ? 'gray' : 'inherit' }}>
                  <ArrowCircleLeftOutlinedIcon />
                </Button>
                <Button disabled={currentGroupIndex >= Math.floor(weeklySchedule.length / itemsPerPage)} onClick={nextGroup} sx={{ color: currentGroupIndex >= Math.floor(weeklySchedule.length / itemsPerPage) ? 'gray' : 'inherit' }} >
                  <ArrowCircleRightOutlinedIcon />
                </Button>
              </Box>
            </Box>
 
            <Box sx={{ flex: '1', padding: '20px 0 0 0', color: 'white', position: 'relative' }}>
              <Box
                sx={{
                  backgroundColor: '#333333',
                  position: 'absolute',
                  top: 0,
                  left: '10%',
                  width: '100%',
                  height: '100%',
                  borderRadius: '80px 0px 0px  0px',
                  zIndex: -100,
                }}
              />
 
              <Box
                sx={{
                  display: 'flex',
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  padding: '0 10px',
                  gap: '10px',
                  width: '100%',
                  position: 'relative',
                  zIndex: 1,
                  paddingTop: '45px',
                }}
              >
                <Fade in={fade} timeout={500}>
                  <Box sx={{ display: 'flex', gap: '10px' }}>
                    {currentCards.map((timeSlot, index) => {
                      const dayAbbreviation = {
                        Sunday: 'SUN',
                        Monday: 'MON',
                        Tuesday: 'TUE',
                        Wednesday: 'WED',
                        Thursday: 'THU',
                        Friday: 'FRI',
                        Saturday: 'SAT',
                      }[timeSlot.week] || '';
 
                      return (
                        <Box key={index} sx={{ display: 'inline-block', width: '200px', paddingTop: '10px' }}>
                          <Card sx={{ textAlign: 'left', backgroundColor: '#fff', borderRadius: '10px', position: 'relative' }}
                            onClick={() => handleCardClick(index, true)} >
                            <CardMedia component="img" height="100" image="image.jpg" alt="Weekly Schedule" />
                            <Box
                              sx={{
                                position: 'absolute',
                                top: '20%',
                                right: '0%',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                cursor: editMode ? 'pointer' : 'default',
                              }}
                              title={editMode ? "Edit Card" : ""}
                            >
                              <Typography sx={{ margin: 0, fontSize: '64px', letterSpacing: '5px' }}>
                                {dayAbbreviation}
                              </Typography>
                            </Box>
                            <CardContent sx={{ padding: '8px' }}>
                              <Typography variant="body1" sx={{ margin: '0px' }}>
                                {timeSlot.week}
                              </Typography>
                              <Typography variant="body2">
                                {formatTime(timeSlot.start)} - {formatTime(timeSlot.end)}
                              </Typography>
                            </CardContent>
                            {editMode && ( 
                              <Box title='Delete Schedule' sx={{ position: 'absolute', top: '5px', right: '5px' }}>
                                <DeleteIcon
                                  title='Delete Schedule'
                                  fontSize='small'
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteIndex(index);
                                    setIsWeeklyDelete(true); 
                                    setOpenDeleteModal(true);
                                  }}
                                  sx={{ cursor: 'pointer', color: 'white' }}
                                />
                              </Box>
                            )}
                          </Card>
                        </Box>
                      );
                    })}
                  </Box>
                </Fade>
              </Box>
            </Box>
          </Box>
        </Box>
 
        <Box sx={{ marginTop: '20px', backgroundColor: 'white', borderRadius: '20px', padding: '20px' }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
            Free Time
            {editMode ? (
              <Button title="Save Changes" variant="none" sx={{ float: 'right', borderRadius: '80px' }} onClick={handleSaveAvailability}>
                <DoneIcon fontSize="small" />
              </Button>
            ) : (
              <Button title="Edit" variant="none" sx={{ float: 'right', borderRadius: '80px' }} onClick={() => setEditMode(true)}>
                <EditIcon fontSize="small" />
              </Button>
            )}
          </Typography>
          <Grid container spacing={3} sx={{ marginTop: '15px', justifyContent: 'center' }}>
            {freeTime.map((timeSlot, index) => (
              <Box key={index} sx={{ display: 'inline-block', position: 'relative' }}>
                <Card
                  sx={{
                    width: '210px',
                    height: "100px",
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: editMode ? 'pointer' : 'default',
                  }}
                  onClick={() => handleCardClick(index, false)}
                  title={editMode ? "Edit Card" : ""}
                >
                  <CardMedia
                    component="img"
                    height="100"
                    image="image.jpg"
                    alt="Free Time"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.3
                    }}
                  />
                  <CardContent sx={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                  }}>
                    <Typography sx={{ fontWeight: 'bold', margin: 0, letterSpacing: '2px', fontSize: '16px' }}>
                      {formatDate(timeSlot.date)}
                    </Typography>
                    <Typography variant="body2" sx={{ margin: 0, }}>
                      {formatTime(timeSlot.start)} - {formatTime(timeSlot.end)}
                    </Typography>
                  </CardContent>
                  {editMode && ( 
                    <Box title='Delete Schedule' sx={{ position: 'absolute', top: '1px', right: '5px', zIndex: '5' }}>
                      <DeleteIcon
                        title='Delete Schedule'
                        fontSize='small'
                        onClick={(e) => {
                          e.stopPropagation(); 
                          setDeleteIndex(index);
                          setIsWeeklyDelete(false); 
                          setOpenDeleteModal(true);
                        }}
                        sx={{ cursor: 'pointer', color: 'white' }}
                      />
                    </Box>
                  )}
                </Card>
              </Box>
            ))}
            {editMode && (
              <Grid xs={12} sm={6} md={4}>
                <Button variant="outlined" sx={{ width: '100%', height: '100px', color: '#333333', borderColor: '#333333' }} onClick={() => handleOpenModal(false)}>
                  <AddIcon />
                </Button>
              </Grid>
            )}
          </Grid>
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
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              {isWeekly ? 'Weekly Schedule' : 'Free Time'}
            </Typography>
            {isWeekly ? (
              <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
                {['S', 'M', 'T', 'W', 'TH', 'F', 'S'].map((day, index) => (
                  <Button
                    color="success"
                    key={index}
                    variant={newEntry.week === ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][index] ? 'contained' : 'outlined'}
                    onClick={() => setNewEntry({ ...newEntry, week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][index] })}
                    sx={{
                      borderRadius: '50%',
                      minWidth: '40px',
                      minHeight: '40px',
                      padding: '0',
                      fontSize: '16px',
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
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button variant="outlined" color="success" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleAddEntry}
                disabled={!isFormValid()}
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
              width: 300,
              backgroundColor: '#fff',
              boxShadow: 24,
              p: 4,
              borderRadius: '10px',
            }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Delete Schedule
            </Typography>
            <Typography variant="body1">
              Are you sure you want to delete this schedule?
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  if (isWeeklyDelete) {
                    const updatedWeeklySchedule = [...weeklySchedule];
                    updatedWeeklySchedule.splice(deleteIndex, 1);
                    setWeeklySchedule(updatedWeeklySchedule);
                  } else {
                    const updatedFreeTime = [...freeTime];
                    updatedFreeTime.splice(deleteIndex, 1);
                    setFreeTime(updatedFreeTime);
                  }
                  setOpenDeleteModal(false);
                }}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                color="black"
                onClick={() => setOpenDeleteModal(false)}
              >
                No
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
}