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
import { type, vertical, horizontal } from '../../../../types/enums';
import axios from 'axios';
import SnackAlert from '../../../components/allerts/SnackAlert';
import { useNavigate } from 'react-router-dom';

interface OrdersListProps {
  orders: IOrdersData[],
  doctors: IDoctorsData[],
  updateOrders: () => void,
  deleteOrder: (id: number) => void
};

const OrderList: FC<OrdersListProps> = ({ orders, doctors, updateOrders, deleteOrder }) => {
  const dateToString = (date: string): string => date.slice(0, 10).split('-').reverse().join('.');

  const navigate = useNavigate();
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
      patient: '',
      ordersdate: '',
      complaints: '',
      doctorid: 0,
      fullname: ''
    }
  });
  const [alertSnack, setAlertSnack] = useState({
    messageAlert: '',
    type: type.error,
    open: false,
    vertical: vertical.top,
    horizontal: horizontal.center
  });

  const validateValues = (newValues: any) => {
    if (
      newValues.values.fullname &&
      newValues.values.ordersdate &&
      new Date(newValues.values.ordersdate).getTime() / 8.64e+7 >= Math.floor(new Date().getTime() / 8.64e+7) &&
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
      setDialogEdit({
        ...dialogEdit,
        open: false,
        values: {
          id: 0,
          patient: '',
          doctorid: 0,
          ordersdate: '',
          complaints: '',
          fullname: ''
        }
      });
      setInvalid(true);
      updateOrders();
    }).catch(err => {
      if (!err.response) return setAlertSnack({
        messageAlert: 'Подключение к серверу отсутствует',
        type: type.error,
        open: true,
        vertical: vertical.top,
        horizontal: horizontal.center
      });
      if (err.response.data === "Uncorrect token!") return navigate('/auth/authorization', { replace: true });
    })
  }

  const deleteElement = () => {
    setDialog({ ...dialog, open: false, id: 0 });
    deleteOrder(dialog.id);
  }

  return (
    <div className='OrderList'>
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
            {orders.map((order: IOrdersData) => (
              <StyledTableRow key={order.id}>
                <StyledTableCell component="th" scope="row">
                  {order.patient}
                </StyledTableCell>
                <StyledTableCell align="center">{order.fullname}</StyledTableCell>
                <StyledTableCell align="center">{dateToString(order.ordersdate)}</StyledTableCell>
                <StyledTableCell align="center">{order.complaints}</StyledTableCell>
                <StyledTableCell align="center">
                  <div className="image-container">
                    <img className='icon' src={editImg} alt='edit' onClick={() => setDialogEdit({
                      ...dialogEdit,
                      open: true,
                      values: {
                        id: order.id,
                        patient: order.patient,
                        ordersdate: order.ordersdate,
                        doctorid: order.doctorid,
                        complaints: order.complaints,
                        fullname: order.fullname
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
        <SnackAlert
          messageAlert={alertSnack.messageAlert}
          type={alertSnack.type}
          open={alertSnack.open}
          vertical={alertSnack.vertical}
          horizontal={alertSnack.horizontal}
          handleClose={() => setAlertSnack({ ...alertSnack, open: false })}
        />
        <DialogEdit
          open={dialogEdit.open}
          editValues={dialogEdit.values}
          title={dialogEdit.title}
          description={dialogEdit.description}
          doctors={doctors}
          invalid={invalid}
          handleClose={() => setDialogEdit({
            ...dialogEdit, open: false, values: {
              id: 0,
              patient: '',
              ordersdate: '',
              doctorid: 0,
              complaints: '',
              fullname: ''
            }
          })}
          changeValues={changeValues}
          saveOnDb={saveOnDataBase}
        />
        <DialogConfirm
          title={dialog.title}
          description={dialog.description}
          open={dialog.open}
          handleClose={() => setDialog({ ...dialog, open: false, id: 0 })}
          agree={deleteElement}
        />
      </TableContainer>
    </div>
  );
};

export default OrderList;