import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import AdminNavbar from '../Components/Navbar/AdminNavbar';
import AdviserNavbar from '../Components/Navbar/AdviserNavbar';
import StudentNavbar from '../Components/Navbar/StudentNavbar';

export default function ProfilePage() {
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
  const [loading, setLoading] = useState(true); // New loading state
  const [successfulSave, setSuccessfulSave] = useState(null);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [saveResult, setSaveResult] = useState(null);
  const [passwordError, setPasswordError] = useState(''); // Error message state
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (storedUser) {
      console.log('User is logged in:', storedUser);
      setUser(storedUser);
    }
    setLoading(false); 
  }, []);

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

  const renderNavbar = () => {
    switch (user.role) {
      case 'ADMIN':
        return <AdminNavbar />;
      case 'ADVISER':
        return <AdviserNavbar />;
      case 'STUDENT':
        return <StudentNavbar />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return <div>User does not exist.</div>;
  }
  return (
    <div className="m-0"
      style={{
        minHeight: '100vh',
        background: '#FCFFF8',
        color: '#333333', 
      }}>
      {renderNavbar()}

      <div className="container"
        style={{
          background: '#FFFFFF',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          width: '85%',
          position: 'relative',
          marginBottom: '50px',
          marginTop: '50px',
          padding: '20px 40px'
        }}>
        <h2>Personal Information</h2>

        <div style={{ paddingLeft: '5%', paddingRight: '5%' }}>
          {/* Profile Picture */}
          <div className="row mb-4">
            <div className="col-md-6 mb-4 mt-5">
              <img
                src={user.profilePicture || 'https://placehold.co/100x100'}
                alt={`${user.firstname}'s profile`}
                className="img-fluid rounded-circle"
                style={{ width: '100px', height: '100px' }}
              />
            </div>
            <div className="col-md-6 mb-5 mt-5" style={{ textAlign: 'right' }}>
              <button
                style={{
                  borderRadius: '8px',
                  width: '93px',
                  height: '37px',
                  backgroundColor: '#B9FF66',
                  border: 'none',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DEFFB8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#B9FF66'}
                onClick={handleEditClick} // Handle Edit click
              >
                Edit
              </button>
            </div>
          </div>

          {/* Two columns for First Name and Last Name */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
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
              <label className="form-label">Last Name</label>
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
            <label className="form-label">Email Address</label>
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
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => handlePasswordChange('current', e.target.value)}
                  className="form-control"
                  style={{ borderRadius: '8px' }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => handlePasswordChange('new', e.target.value)}
                  className="form-control"
                  style={{ borderRadius: '8px' }}
                />
                <label className="form-label">Confirm New Password</label>
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
                width: '130px',
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
                width: '130px',
                height: '37px',
                backgroundColor: '#B9FF66',
                border: 'none',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DEFFB8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#B9FF66'}
            >
              Save Changes
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
              <h4>Cancel Editing</h4><hr />
              <p>Are you sure? Changes will not be saved.</p>
              <button
                style={{
                  borderRadius: '5px',
                  width: '150px',
                  height: '37px',
                  backgroundColor: 'white',
                  borderColor: 'lightGray',
                  transition: 'background-color 0.3s ease',
                  marginRight: '80px',
                  marginTop: '20px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DEFFB8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                onClick={() => handleCancelPopupClose(false)}>Continue Editing</button>
              <button
                style={{
                  borderRadius: '5px',
                  width: '80px',
                  height: '37px',
                  backgroundColor: 'white',
                  borderColor: 'lightGray',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DEFFB8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
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
            >
              <h4>Confirm Changes</h4><hr />
              <p>Are you sure you want to save these changes?</p>
              <button
                style={{
                  borderRadius: '5px',
                  width: '150px',
                  height: '37px',
                  backgroundColor: 'white',
                  borderColor: 'lightGray',
                  transition: 'background-color 0.3s ease',
                  marginRight: '40px',
                  marginTop: '20px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DEFFB8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                onClick={() => handleSaveChangesConfirm(false)}>Continue Editing</button>
              <button
                style={{
                  borderRadius: '5px',
                  width: '80px',
                  height: '37px',
                  backgroundColor: 'white',
                  borderColor: 'lightGray',
                  transition: 'background-color 0.3s ease',
                  marginTop: '20px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DEFFB8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                onClick={() => handleSaveChangesConfirm(true)}>Yes</button>
            </div>
          </div>
        )}

        {/* Success or Error Message After Save */}
        {showResultPopup && (
          <div style={popupStyle}>
            <div style={modalContentStyle}>
              <h4>{successfulSave ? 'Success' : 'Profile Update Failed'}</h4><hr />
              <p>{saveResult}</p>
              <button style={buttonStyle} onClick={handleResultPopupClose}>Okay</button>
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
  borderRadius: '5px',
  width: '80px',
  height: '37px',
  backgroundColor: 'white',
  borderColor: 'lightGray',
  transition: 'background-color 0.3s ease',
  marginTop: '20px',
};  