import React, { FC, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import { StyledTableRow, StyledTableCell } from '../../../../types/styledElements';
import { IDoctorsData, IOrdersData } from '../../../../types/types';
import editImg from '../../../../images/edit.svg';
import deleteImg from '../../../../images/delete.svg';
import '../../../../Styles/pages/subsidiaries/mainPage/OrderList.scss';
import DialogConfirm from '../../../components/allerts/DialogConfirm';
import DialogEdit from '../../../components/allerts/DialogEdit';
import { SelectChangeEvent } from '@mui/material';
import axios from 'axios';

interface OrdersListProps {
  orders: IOrdersData[],
  doctors: IDoctorsData[],
  updateOrders: () => void,
  deleteOrder: (id: number) => void
};

const OrderList: FC<OrdersListProps> = ({ orders, doctors, updateOrders, deleteOrder }) => {

  const dateToString = (date: string): string => date.slice(0, 10).split('-').reverse().join('.');

  const [invalid, setInvalid] = useState(false);

  const [dialog, setDialog] = useState({
    open: false,
    id: 0,
    title: '',
    description: ''
  });

  const [dialogEdit, setDialogEdit] = useState({
    open: false,
    title: 'Изменение приема',
    description: 'Введите данные, которые вы хотите изменить и нажмите "Подтвердить"',
    values: {
      id: 0,
      fullname: '',
      ordersdate: '',
      complaints: '',
      doctorid: 0
    }
  });

  const validateValues = (newValues: any) => {
    if (
      newValues.values.fullname &&
      newValues.values.ordersdate &&
      new Date(newValues.values.ordersdate).getTime() > new Date().getTime() &&
      newValues.values.complaints &&
      newValues.values.doctorid
    ) {
      setInvalid(false);
    } else {
      setInvalid(true);
    };
  };

  const changeValues = (id: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>) => {
    let value = event.target.value;
    const newValues = { ...dialogEdit, values: { ...dialogEdit.values, [id]: value } };
    setDialogEdit(newValues);
    validateValues(newValues);
  };

  const saveOnDataBase = async () => {
    await axios.patch('http://localhost:8080/updateUserOrder', {
      ...dialogEdit.values
    }, {
      headers: {
        accesstoken: `${localStorage.getItem('token')}`
      }
    }).then(() => {
      console.log('я зашел в результат');
      setDialogEdit({
        ...dialogEdit,
        open: false,
        values: {
          id: 0,
          fullname: '',
          doctorid: 0,
          ordersdate: '',
          complaints: ''
        }
      });
      setInvalid(true);
      updateOrders();
    }).catch(err => {
      console.log({ ...err });
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Имя пациента</StyledTableCell>
            <StyledTableCell align="center">Врач</StyledTableCell>
            <StyledTableCell align="center">Дата приема</StyledTableCell>
            <StyledTableCell align="center" >Жалобы</StyledTableCell>
            <StyledTableCell align="center">Управление</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order.id}>
              <StyledTableCell component="th" scope="row">
                {order.fullname}
              </StyledTableCell>
              <StyledTableCell align="center">{doctors.find((el) => {
                return el.id === order.doctorid ? true : false
              })?.fullname}</StyledTableCell>
              <StyledTableCell align="center">{dateToString(order.ordersdate)}</StyledTableCell>
              <StyledTableCell align="center">{order.complaints}</StyledTableCell>
              <StyledTableCell align="center">
                <div className="image-container">
                  <img className='icon' src={editImg} alt='edit' onClick={() => setDialogEdit({
                    ...dialogEdit,
                    open: true,
                    values: {
                      id: order.id,
                      fullname: order.fullname,
                      ordersdate: order.ordersdate,
                      doctorid: order.doctorid,
                      complaints: order.complaints
                    }
                  })} />
                  <img className='icon' src={deleteImg} alt='delete' onClick={() => setDialog({
                    open: true,
                    id: order.id,
                    title: 'Удаление приема',
                    description: 'Вы уверены, что хотите удалить данный прием?'
                  })} />
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <DialogEdit
        open={dialogEdit.open}
        editValues={dialogEdit.values}
        title={dialogEdit.title}
        description={dialogEdit.description}
        doctors={doctors}
        invalid={invalid}
        handleClose={() => setDialogEdit({ ...dialogEdit, open: false })}
        changeValues={changeValues}
        saveOnDb={saveOnDataBase}
      />
      <DialogConfirm
        title={dialog.title}
        description={dialog.description}
        open={dialog.open}
        handleClose={() => setDialog({ ...dialog, open: false, id: 0 })}
        agree={() => deleteOrder(dialog.id)}
      />
    </TableContainer>
  );
};

export default OrderList;