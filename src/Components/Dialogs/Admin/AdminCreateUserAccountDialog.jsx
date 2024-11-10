import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';

export default function AdminCreateUserAccountDialog({
  open,
  handleClose,
  formData,
  handleChange,
  handleSubmit,
  loading
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Account</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          name="username"
          label="Username"
          type="text"
          fullWidth
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="firstname"
          name="firstname"
          label="Firstname"
          type="text"
          fullWidth
          value={formData.firstname}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="lastname"
          name="lastname"
          label="Lastname"
          type="text"
          fullWidth
          value={formData.lastname}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="role"
          name="role"
          select
          label="Role"
          value={formData.role}
          fullWidth
          onChange={handleChange}
        >
          <MenuItem value="Adviser">Adviser</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
