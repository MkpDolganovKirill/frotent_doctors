import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IDoctorsData, IOrdersData } from '../../../types/types';
import CreateOrder from '../subsidiaries/mainPage/CreateOrder';
import OrderList from '../subsidiaries/mainPage/OrderList';
import doctorImg from '../../../images/doctor.svg';
import SnackAlert from '../../components/allerts/SnackAlert';
import { type, vertical, horizontal } from '../../../types/enums';
import '../../../Styles/pages/global/MainPage.scss';

const pad = (number: number) => number < 10 ? '0' + number : number;

const MainPage = () => {

  const navigate = useNavigate();

  const [ordersData, setOrdersData] = useState<IOrdersData[]>([]);
  const [doctorsList, setDoctorsList] = useState<IDoctorsData[]>([{
    id: 0,
    fullname: ''
  }]);
  const [updateFlag, setUpdateFlag] = useState<boolean>(true);
  const [alertSnack, setAlertSnack] = useState({
    messageAlert: '',
    type: type.error,
    open: false,
    vertical: vertical.top,
    horizontal: horizontal.center
  });

  const updateOrders = () => {
    setUpdateFlag(!updateFlag);
  };

  useEffect(() => {
    getOrders();
    getDoctors();
  }, [updateFlag]);

  const getDoctors = async () => {
    await axios.get('http://localhost:8080/getAllDoctors').then(res => {
      setDoctorsList(res.data);
    }).catch(err => {
      if (err) return setAlertSnack({
        messageAlert: 'Подключение к серверу отсутствует',
        type: type.error,
        open: true,
        vertical: vertical.top,
        horizontal: horizontal.center
      });
    })
  }

  const getOrders = async () => {
    await axios.get('http://localhost:8080/getAllUserOrders', {
      headers: {
        'accesstoken': `${localStorage.getItem('token')}`
      }
    }).then(res => {
      const refactor = res.data.map((elem: IOrdersData) => {
        const date = new Date(elem.ordersdate);
        return {
          ...elem,
          ordersdate: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
        }
      })
      setOrdersData(refactor);
    }).catch(err => {
      if (!err.response) return setAlertSnack({
        messageAlert: 'Подключение к серверу отсутствует',
        type: type.error,
        open: true,
        vertical: vertical.top,
        horizontal: horizontal.center
      });
      if (err.response.data === "Uncorrect token!") return navigate('/', { replace: true });
    });
  };

  const deleteOrder = async (id: number) => {
    await axios.delete(`http://localhost:8080/deleteUsersOrder?id=${id}`, {
      headers: {
        'accesstoken': `${localStorage.getItem('token')}`
      }
    }).then(() => {
      updateOrders();
    }).catch(err => {
      if (!err.response) return setAlertSnack({
        messageAlert: 'Подключение к серверу отсутствует',
        type: type.error,
        open: true,
        vertical: vertical.top,
        horizontal: horizontal.center
      });
      if (err.response.data === "Uncorrect token!") return navigate('/', { replace: true });
    })
  }

  return (
    <div className='MainPage'>
      <CreateOrder doctors={doctorsList} lostConnect={() => setAlertSnack({
        messageAlert: 'Подключение к серверу отсутствует',
        type: type.error,
        open: true,
        vertical: vertical.top,
        horizontal: horizontal.center
      })} updateOrders={updateOrders} />
      {ordersData.length > 0
        ?
        <OrderList orders={ordersData} doctors={doctorsList} updateOrders={updateOrders} deleteOrder={deleteOrder} />
        :
        <div className='not-orders'>
          <img src={doctorImg} alt='doctor' />
          <h2>У вас пока нет приемов</h2>
        </div>}
      <SnackAlert
        messageAlert={alertSnack.messageAlert}
        type={alertSnack.type}
        open={alertSnack.open}
        vertical={alertSnack.vertical}
        horizontal={alertSnack.horizontal}
        handleClose={() => setAlertSnack({ ...alertSnack, open: false })}
      />
    </div>
  );
};

export default MainPage;