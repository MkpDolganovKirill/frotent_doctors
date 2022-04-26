import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IOrdersData } from '../../../types/types';
import CreateOrder from '../subsidiaries/mainPage/CreateOrder';
import OrderList from '../subsidiaries/mainPage/OrderList';

const MainPage = () => {

  const navigate = useNavigate();

  const [ordersData, setOrdersData] = useState<IOrdersData[]>([{
    id: 0,
    fullname: '',
    ordersdate: '',
    doctorid: 0,
    complaints: ''
  }]);

  const [updateFlag, setUpdateFlag] = useState<boolean>(true);

  const updateOrders = () => {
    setUpdateFlag(true);
  };

  useEffect(() => {
    getOrders();
    setUpdateFlag(false);
  }, [updateFlag]);

  const getOrders = async () => {
    await axios.get('http://localhost:8080/getAllUserOrders', {
      headers: {
        'accesstoken': `${localStorage.getItem('token')}`
      }
    }).then(res => {
      setOrdersData(res.data);
    }).catch(err => {
      if (!err.response) return console.log('lost connection!');
      if (err.response.data === "Uncorrect token!") return navigate('/', { replace: true });
    });
  };

  return (
    <div className='MainPage'>
      <CreateOrder updateOrders={updateOrders}/>
      <OrderList orders={ordersData} updateOrders={updateOrders}/>
    </div>
  );
};

export default MainPage;