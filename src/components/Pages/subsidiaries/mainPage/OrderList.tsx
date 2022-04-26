import React, { FC } from 'react';
import { IOrdersData } from '../../../../types/types';

interface OrdersListProps {
  orders: IOrdersData[],
  updateOrders: () => void
};

const OrderList: FC<OrdersListProps> = ({ orders, updateOrders }) => {
  return (
    <div>
      <div>
        {orders.map((order) => {
          console.log(order, order.id, order.fullname, order.doctorid, order.ordersdate, order.complaints);
          return (
            <div key={order.id}>
              {order.fullname} заказал доктора {order.doctorid} на дату {order.ordersdate} c жалобами {order.complaints}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default OrderList;