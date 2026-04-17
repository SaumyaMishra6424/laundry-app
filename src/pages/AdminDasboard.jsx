import React, { useEffect, useState } from "react";
import { listenOrders } from "../services/orderService";

const AdminDashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const unsubscribe = listenOrders((orders) => {
      setTotalOrders(orders.length);

      let total = 0;
      orders.forEach(order => {
        total += order.totalAmount || 0;
      });

      setRevenue(total);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Orders: {totalOrders}</p>
      <p>Total Revenue: ₹{revenue}</p>
    </div>
  );
};

export default AdminDashboard;