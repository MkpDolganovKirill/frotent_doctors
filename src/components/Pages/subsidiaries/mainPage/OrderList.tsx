import React, { FC } from 'react';
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

interface OrdersListProps {
  orders: IOrdersData[],
  doctors: IDoctorsData[],
  updateOrders: () => void,
  deleteOrder: (id: number) => void
};

const OrderList: FC<OrdersListProps> = ({ orders, doctors, updateOrders, deleteOrder }) => {

  const dateToString = (date: string): string => date.slice(0,10).split('-').reverse().join('.');

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
                  <img className='icon' src={editImg} alt='edit'/>
                  <img className='icon' src={deleteImg} alt='delete' onClick={() => deleteOrder(order.id)}/>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderList;