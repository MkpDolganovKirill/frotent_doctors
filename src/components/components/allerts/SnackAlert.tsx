import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { type, vertical, horizontal } from '../../../types/enums'

interface SnackErrorAlertProps {
  messageAlert: string,
  type: type,
  open: boolean,
  handleClose: () => void,
  vertical: vertical,
  horizontal: horizontal
};

const SnackAlert = ({ messageAlert, type, open, handleClose, vertical, horizontal }: SnackErrorAlertProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={type}
        sx={{ width: '100%' }}
      >
        {messageAlert}
      </Alert>
    </Snackbar>
  )
};

export default SnackAlert;