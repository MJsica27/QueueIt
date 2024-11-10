import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions'; 
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';


export default function AdminDeleteClassroomDialog({ open, onClose, onDelete }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this classroom?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={onDelete} color="primary">Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
