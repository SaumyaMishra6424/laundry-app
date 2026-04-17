import React from "react";
import { updateOrderStatus } from "../services/orderService";

const OrderRow = ({ order }) => {
  const shortId = order.id.slice(0, 6).toUpperCase();

  return (
    <tr>
      <td>#{shortId}</td>
      <td>₹{order.totalAmount}</td>
      <td>
        <select
          value={order.status}
          onChange={(e) =>
            updateOrderStatus(order.id, e.target.value)
          }
        >
          <option value="RECEIVED">RECEIVED</option>
          <option value="PROCESSING">PROCESSING</option>
          <option value="READY">READY</option>
          <option value="DELIVERED">DELIVERED</option>
        </select>
      </td>
    </tr>
  );
};

export default OrderRow;