import React, { useEffect, useState } from "react";
import { listenOrders } from "../services/orderService";
import OrderTable from "../components/OrderTable";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  // Filters
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = listenOrders((data) => {
      setOrders(data);
      setFilteredOrders(data);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Apply filters
  useEffect(() => {
    let temp = [...orders];

    // Filter by status
    if (statusFilter !== "ALL") {
      temp = temp.filter(order => order.status === statusFilter);
    }

    // Filter by name or phone
    if (search.trim() !== "") {
      temp = temp.filter(order =>
        order.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        order.phone?.includes(search)
      );
    }

    setFilteredOrders(temp);
  }, [statusFilter, search, orders]);

  return (
    <div>
      <h2>Orders</h2>

      {/* 🔍 Filters UI */}
      <div style={{ marginBottom: "10px" }}>
        
        {/* Status Filter */}
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="ALL">All</option>
          <option value="RECEIVED">RECEIVED</option>
          <option value="PROCESSING">PROCESSING</option>
          <option value="READY">READY</option>
          <option value="DELIVERED">DELIVERED</option>
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or phone"
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </div>

      <OrderTable orders={filteredOrders} />
    </div>
  );
};

export default OrdersPage;