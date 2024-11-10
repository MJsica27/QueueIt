import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function CreateClassroomDialog({
  open,
  formData,
  loading,
  onClose,
  onChange,
  onCreate,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Classroom</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="subjectName"
          label="Subject Name"
          fullWidth
          value={formData.subjectName}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="subjectCode"
          label="Subject Code"
          fullWidth
          value={formData.subjectCode}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="section"
          label="Section"
          fullWidth
          value={formData.section}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="classCode"
          label="Class Code"
          fullWidth
          value={formData.classCode}
          InputProps={{ readOnly: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onCreate} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
