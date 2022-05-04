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
import SortPanel from '../subsidiaries/mainPage/SortPanel';
import { SelectChangeEvent } from '@mui/material';


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
  const [sortStatus, setSortStatus] = useState({
    sortMethod: 'id',
    sortType: 'asc',
    dateWith: '',
    dateFor: ''
  });
  const [dateGap, setDateGap] = useState(false);

  const changeSortStatus = (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const target = e.target.value;
    if (field === 'sortMethod' && target === 'id') {
      setSortStatus({
        sortMethod: 'id',
        sortType: 'asc',
        dateWith: '',
        dateFor: ''
      });
      setDateGap(false);
    } else {
      setSortStatus({ ...sortStatus, [field]: target })
    };
  };

  const updateOrders = () => {
    setUpdateFlag(!updateFlag);
  };

  useEffect(() => {
    getOrders();
  }, [updateFlag, sortStatus]);

  const getOrders = async () => {
    await axios.get('http://localhost:8080/getAllUserOrders', {
      headers: {
        'accesstoken': `${localStorage.getItem('token')}`
      },
      params: {
        ...sortStatus
      }
    }).then(res => {
      const refactor = res.data.orders.rows.map((elem: IOrdersData) => {
        const date = new Date(elem.ordersdate);
        return {
          ...elem,
          ordersdate: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
        }
      })
      setOrdersData(refactor);
      setDoctorsList(res.data.doctors);
    }).catch(err => {
      if (!err.response) return setAlertSnack({
        messageAlert: 'Подключение к серверу отсутствует',
        type: type.error,
        open: true,
        vertical: vertical.top,
        horizontal: horizontal.center
      });
      if (err.response.data === "Uncorrect token!") return navigate('/auth/authorization', { replace: true });
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
      if (err.response.data === "Uncorrect token!") return navigate('/auth/authorization', { replace: true });
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
      <SortPanel
        values={sortStatus}
        changeValues={changeSortStatus}
        dateGap={dateGap}
        setDateGap={setDateGap}
        setStateValues={setSortStatus}
      />
      {ordersData.length > 0
        ?
        <div className="panels">
          <OrderList
            orders={ordersData}
            doctors={doctorsList}
            updateOrders={updateOrders}
            deleteOrder={deleteOrder}
          />
        </div>
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