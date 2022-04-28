import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { FC } from 'react';
import '../../../Styles/components/allerts/DialogEdit.scss';

interface DialogConfirmProps {
  title: string,
  description: string,
  open: boolean,
  handleClose: () => void,
  agree: () => void
}

const DialogConfirm: FC<DialogConfirmProps> = ({ title, description, open, handleClose, agree }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Нет</Button>
        <Button onClick={agree} autoFocus>
          Да
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogConfirm