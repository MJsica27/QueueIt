import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserNavbar from '../Components/Navbar/UserNavbar';
import Cropper from 'react-easy-crop';
import AdviserBackgroundPage from '../Components/Backgound.jsx/AdviserBackgroundPage';


export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [editable, setEditable] = useState(false);
  const [newFirstName, setNewFirstName] = useState(user.firstname || '');
  const [newLastName, setNewLastName] = useState(user.lastname || '');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successfulSave, setSuccessfulSave] = useState(null);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [saveResult, setSaveResult] = useState(null);
  const [passwordError, setPasswordError] = useState('');
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1); // 1:1 aspect ratio for profile picture

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    const canvas = document.createElement('canvas');
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext('2d');
    const imageElement = new Image();
    imageElement.src = image;
    imageElement.onload = () => {
      ctx.drawImage(
        imageElement,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      canvas.toBlob((blob) => {
        const croppedImageUrl = URL.createObjectURL(blob);
        setCroppedImage(croppedImageUrl);
        setUser(prev => ({ ...prev, photoURL: croppedImageUrl })); // Update user state with cropped image
        setCropperOpen(false);
      }, 'image/jpeg');
    };
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      console.log('User is logged in:', storedUser);
      setUser(storedUser);
    } else {
      console.log('No user is logged in');
      navigate('/');
    }
    setLoading(false);
  }, [navigate]);

  const handleEditClick = () => {
    setEditable(true);
    setNewFirstName(user.firstname);
    setNewLastName(user.lastname);
  };

  const handleChangePasswordClick = () => {
    setShowChangePassword(true);
  };

  const handleCancelClick = () => {
    setShowCancelPopup(true);
  };

  const handleCancelPopupClose = (confirm) => {
    if (confirm) {
      window.location.reload();
    }
    setShowCancelPopup(false);
  };

  const handleSaveChangesClick = () => {
    if (!isSaveDisabled) {
      console.log('Saving changes');
      setShowSavePopup(true);
    }
  };

  // Password validation
  const handlePasswordChange = (type, value) => {
    if (type === 'current') setCurrentPassword(value);
    if (type === 'new') setNewPassword(value);
    if (type === 'confirm') setConfirmPassword(value);
  };
  useEffect(() => {
    const hasPasswordInput = currentPassword || newPassword || confirmPassword;
    const passwordsMatch = newPassword === confirmPassword;
    const newPasswordValid = newPassword.length >= 8;
    const isFormValid = !hasPasswordInput || (passwordsMatch && newPasswordValid);

    setIsSaveDisabled(!isFormValid);

    if (hasPasswordInput && !newPasswordValid) {
      setPasswordError('Password must be at least 8 characters.');
    } else if (hasPasswordInput && !passwordsMatch) {
      setPasswordError('Passwords do not match.');
    } else {
      setPasswordError('');
    }
  }, [currentPassword, newPassword, confirmPassword]);

  const handleSaveChangesConfirm = async (confirm) => {
    if (confirm) {
      if ((newPassword && newPassword !== '') && (confirmPassword && confirmPassword !== '') && newPassword !== confirmPassword) {
        alert('New passwords do not match.');
        return;
      }

      const userUpdateData = {
        firstname: user.firstname,
        lastname: user.lastname,
        password: newPassword || '',
      };

      try {
        console.log("Passed Current Password:", currentPassword);

        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/user/modifyProfile?userID=${user.userID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            passedCurrentPassword: currentPassword,
            userUpdateData,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save changes.');
        }

        const updatedUserData = await response.json();

        const updatedUser = {
          ...user,
          firstname: updatedUserData.firstname || user.firstname,
          lastname: updatedUserData.lastname || user.lastname,
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('Updated user data in localStorage:', updatedUser);
        setUser(updatedUser);
        setSaveResult('Profile updated successfully.');
        setSuccessfulSave(true);
        setEditable(false);
        setShowChangePassword(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } catch (error) {
        console.error('Error:', error);
        setSaveResult(<>An error occurred while saving changes.<br />Inputted current password is incorrect.</>);
        setSuccessfulSave(false);
      }
      setShowResultPopup(true);
      setShowSavePopup(false);
      //setShowChangePassword(false);
    } else {
      setShowSavePopup(false);
    }
  };

  const handleResultPopupClose = () => {
    setShowResultPopup(false);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User does not exist.</div>;
  }
  return (
    <div className="m-0"
      style={{
        color: '#333333',
      }}>
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

      <UserNavbar />

      <div className="container"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          width: '85%',
          position: 'relative',
          marginBottom: '50px',
          marginTop: '50px',
          padding: '20px 40px',
          borderColor:  'black',
          borderWidth: '1px',
        }}>
        <h2 style={{ fontWeight: 'bold' }}>Personal Information</h2>

        <div style={{ paddingLeft: '5%', paddingRight: '5%' }}>
          {/* Profile Picture */}
          <div className="row mb-4">
            <div className="col-md-6 mb-4 mt-5">
              <img
                src={croppedImage || user.photoURL || 'https://placehold.co/100x100'}
                alt={`${user.firstname}'s profile`}
                className="img-fluid rounded-circle"
                style={{ width: '100px', height: '100px', cursor: editable ? 'pointer' : 'default' }}
                onClick={() => editable && document.getElementById('fileInput').click()}
              />
              <input type="file" id="fileInput"
                style={{ display: 'none' }}
                accept="image/jpeg, image/png"
                onChange={handleImageUpload}
              />
            </div>
            <div className="col-md-6 mb-5 mt-5" style={{ textAlign: 'right' }}>
              <button
                style={{
                  borderRadius: '8px',
                  width: '93px',
                  height: '37px',
                  color: 'white',
                  backgroundColor: editable ? '#CFC0FF' : '#7D57FC',
                  border: 'none',
                  transition: 'background-color 0.3s ease',
                  // opacity: editable ? 0.7 : 1,
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#CFC0FF'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = editable ? '#CFC0FF' : '#7D57FC'}
                onClick={handleEditClick} // Handle Edit click
                disabled={editable}
              >
                Edit
              </button>
            </div>
          </div>
          {cropperOpen && (
            <div style={modalStyle}>
              <div style={modalContentStyle}>
                <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                  />
                </div>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <button
                  style={{color:'black', marginRight:'20px', width: '80px',  height: '37px', borderRadius:'10px'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#CFC0FF'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    onClick={() => setCropperOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    style={buttonStyle}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#CFC0FF'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7D57FC'}
                    onClick={() => handleCropComplete(crop, { x: crop.x, y: crop.y, width: 100, height: 100 })} // Adjust the width and height as needed
                  >
                    Crop
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Two columns for First Name and Last Name */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label" style={{ fontWeight: 'bold' }}>First Name</label>
              <input
                type="text"
                value={user.firstname}
                readOnly={!editable}
                onChange={(e) => setUser(prev => ({ ...prev, firstname: e.target.value }))}
                className="form-control"
                style={{ borderRadius: '8px' }}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" style={{ fontWeight: 'bold' }}>Last Name</label>
              <input
                type="text"
                value={user.lastname}
                readOnly={!editable}
                onChange={(e) => setUser(prev => ({ ...prev, lastname: e.target.value }))}
                className="form-control"
                style={{ borderRadius: '8px' }}
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <label className="form-label" style={{ fontWeight: 'bold' }}>Email Address</label>
            <input
              type="text"
              value={user.username}
              readOnly={true} // Email remains uneditable
              className="form-control"
              style={{ borderRadius: '8px' }}
            />
          </div>

          {/* Change Password Button */}
          {editable && !showChangePassword && (
            <div style={{ textAlign: 'left' }}>
              <button
                onClick={handleChangePasswordClick}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'black',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'lightgray'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
              >
                Change Password
              </button>
            </div>
          )}

          {/* Change Password Fields */}
          {showChangePassword && (
            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{ fontWeight: 'bold' }}>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => handlePasswordChange('current', e.target.value)}
                  className="form-control"
                  style={{ borderRadius: '8px' }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{ fontWeight: 'bold' }}>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => handlePasswordChange('new', e.target.value)}
                  className="form-control"
                  style={{ borderRadius: '8px' }}
                />
                <label className="form-label" style={{ fontWeight: 'bold' }}>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                  className="form-control"
                  style={{ borderRadius: '8px' }}
                />
                {passwordError && <small style={{ color: 'red' }}>{passwordError}</small>}
              </div>
            </div>
          )}
        </div>

        {/* Cancel and Save Changes Buttons */}
        {editable && (
          <div style={{ textAlign: 'right' }}>
            <button
              onClick={handleCancelClick}
              style={{
                borderRadius: '8px',
                width: '100px',
                height: '37px',
                backgroundColor: 'white',
                borderColor: 'lightGray',
                transition: 'background-color 0.3s ease',
                marginRight: '20px',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'lightGray'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChangesClick}
              disabled={isSaveDisabled}
              style={{
                borderRadius: '8px',
                width: '100px',
                height: '37px',
                color: 'white',
                backgroundColor: '#7D57FC',
                border: 'none',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#CFC0FF'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7D57FC'}
            >
              Save
            </button>
          </div>
        )}

        {/* Cancel Popup */}
        {showCancelPopup && (
          <div
            style={{
              display: 'block',
              position: 'fixed',
              zIndex: 1050,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'auto',
              display: 'flex',
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: '5px',
                padding: '20px',
                paddingTop: '30px', paddingBottom: '30px',
                width: '400px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                textAlign: 'center'
              }}
            >
              <h4 style={{ color: '#7D57FC', fontWeight:'bold' }}>Cancel Editing</h4>
              <p>Are you sure? Changes will not be saved.</p>
              <button
                style={{
                  borderRadius: '5px',
                  width: '150px',
                  height: '37px',
                  backgroundColor: 'white',
                  borderColor: 'lightGray',
                  transition: 'background-color 0.3s ease',
                  marginRight: '10px',
                  marginTop: '20px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#CFC0FF'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                onClick={() => handleCancelPopupClose(false)}>Continue Editing</button>
              <button
                style={{
                  borderRadius: '5px',
                  width: '80px',
                  height: '37px',
                  backgroundColor: '#7D57FC',
                  borderColor: 'lightGray',
                  color:'white',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#CFC0FF'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7D57FC'}
                onClick={() => handleCancelPopupClose(true)}>Yes</button>
            </div>
          </div>
        )}

        {/* Save Changes Popup */}
        {showSavePopup && (
          <div
            style={{
              display: 'block',
              position: 'fixed',
              zIndex: 1050,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'auto',
              display: 'flex',
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: '5px',
                padding: '20px',
                paddingTop: '30px', paddingBottom: '30px',
                width: '400px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                textAlign: 'center'
              }}
            ><h4 style={{ color: '#7D57FC', fontWeight: 'bold' }}>Confirm Changes</h4>
              
              <p>Are you sure you want to save these changes?</p>
              <button
                style={{
                  borderRadius: '5px',
                  width: '150px',
                  height: '37px',
                  backgroundColor: 'white',
                  borderColor: 'lightGray',
                  transition: 'background-color 0.3s ease',
                  marginRight: '10px',
                  marginTop: '20px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#CFC0FF'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                onClick={() => handleSaveChangesConfirm(false)}>Continue Editing</button>
              <button
                style={{
                  borderRadius: '5px',
                  width: '80px',
                  height: '37px',
                  backgroundColor: '#7D57FC',
                  color: 'white',
                  borderColor: 'lightGray',
                  transition: 'background-color 0.3s ease',
                  marginTop: '20px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#CFC0FF'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7D57FC'}
                onClick={() => handleSaveChangesConfirm(true)}>Yes</button>
            </div>
          </div>
        )}

        {/* Success or Error Message After Save */}
        {showResultPopup && (
          <div style={popupStyle}>
            <div style={modalContentStyle}>
              <h4 style={{ color: '#7D57FC', fontWeight:'bold' }}>{successfulSave ? 'Success' : 'Profile Update Failed'}</h4>
              <p>{saveResult}</p>
              <button style={buttonStyle} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#CFC0FF'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7D57FC'}
              onClick={handleResultPopupClose}>Okay</button>
            </div >
          </div >
        )}
      </div>
      <div style={{ height: '1px', }}>
      </div>
    </div>
  );
}

const popupStyle = {
  display: 'block',
  position: 'fixed',
  zIndex: 1050,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
};

const modalContentStyle = {
  backgroundColor: '#fff',
  borderRadius: '5px',
  padding: '20px',
  paddingTop: '30px',
  paddingBottom: '30px',
  width: '400px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
};

const buttonStyle = {
  borderRadius: '10px',
  width: '80px',
  height: '37px',
  backgroundColor: '#7D57FC',
  color: '#fff',
  borderColor: 'lightGray',
  transition: 'background-color 0.3s ease',
  marginTop: '20px',
  // '&:hover': {color: '#CFC0FF', }
};

const modalStyle = {
  display: 'block',
  position: 'fixed',
  zIndex: 1050,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
};