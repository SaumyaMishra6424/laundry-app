import React from "react";
import OrderRow from "./OrderRow";

const OrderTable = ({ orders }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <OrderRow key={order.id} order={order} />
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;