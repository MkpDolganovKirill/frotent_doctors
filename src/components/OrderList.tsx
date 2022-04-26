import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IOrdersData } from '../types/types';

interface OrdersListProps {
  orders: IOrdersData[],
  updateOrders: () => void
}

const OrderList: FC<OrdersListProps> = ({ orders, updateOrders }) => {
  return (
    <div>
      {orders.map((order) => {
        return (
          <div key={order.id}>
            {order.fullname} заказал доктора {order.doctorid} на дату {order.ordersdate} c жалобами {order.complaints}
          </div>
        )
      })}
    </div>
  )
};

export default OrderList;