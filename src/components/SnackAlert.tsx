import React from 'react';
import { Alert, Snackbar } from '@mui/material';

enum vertical {
  top = 'top',
  bottom = 'bottom'
};

enum horizontal {
  left = 'left',
  center = 'center',
  right = 'right'
};

enum type {
  success = 'success',
  error = 'error',
  info = 'info',
  warning = 'warning'
};

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