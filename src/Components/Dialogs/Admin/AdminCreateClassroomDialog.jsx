import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AdminCreateClassroomDialog({ open, onChange, onClose, onCreate, formData, handleInputChange, generateClassCode }) {
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
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="subjectCode"
          label="Subject Code"
          fullWidth
          value={formData.subjectCode}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="section"
          label="Section"
          fullWidth
          value={formData.section}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="adviserID"
          label="Assigned Adviser"
          fullWidth
          value={formData.adviserID}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="classCode"
          label="Class Code"
          fullWidth
          value={formData.classCode || generateClassCode()}
          InputProps={{ readOnly: true }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="requiresMentor"
              checked={formData.requiresMentor}
              onChange={onChange}
              color="primary"
            />
          }
          label="Requires Mentor"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={onCreate} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
}
