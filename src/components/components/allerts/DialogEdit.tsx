import React, { FC } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SelectChangeEvent } from '@mui/material';
import { IDoctorsData, IOrdersData } from '../../../types/types';
import Buttons from '../buttons/Buttons';
import DateInput from '../inputs/DateInput';
import InputSelect from '../inputs/InputSelect';
import InputValue from '../inputs/InputValue';
import { typesButtons } from '../../../types/enums';

interface DialogEditProps {
  open: boolean,
  handleClose: () => void,
  saveOnDb: () => void,
  title: string,
  doctors: IDoctorsData[],
  invalid: boolean,
  description: string,
  editValues: IOrdersData,
  changeValues: (id: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void
}

const DialogEdit: FC<DialogEditProps> = ({ open, handleClose, title, description, invalid, editValues, changeValues, doctors, saveOnDb }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
        <div className='create-input'>
          <InputValue
            id='patient'
            type='text'
            value={editValues.patient}
            onChange={changeValues}
            labelText='Имя'
            placeholder='Введите ваше имя'
          />
        </div>
        <div className='create-input'>
          <InputSelect
            id='doctorId'
            value={editValues.doctorId}
            doctors={doctors}
            onChange={changeValues}
            label='Врач:'
          />
        </div>
        <div className='create-input-date'>
          <DateInput
            id='ordersdate'
            value={editValues.ordersdate}
            onChange={changeValues}
            label='Дата приема'
          />
        </div>
        <div className='create-input-conplaints'>
          <InputValue
            id='complaints'
            type='text'
            value={editValues.complaints}
            onChange={changeValues}
            labelText='Жалобы'
            placeholder='Введите ваши жалобы'
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Buttons text='Отменить' types={typesButtons.button} onClick={handleClose} />
        <Buttons text='Сохранить' types={typesButtons.button} disabled={invalid} onClick={saveOnDb} />
      </DialogActions>
    </Dialog>
  )
}

export default DialogEdit;