import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  updateDoc,
  doc,
  query,
  where,
  onSnapshot
} from "firebase/firestore";

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "orders"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id, status) => {
    const ref = doc(db, "orders", id);
    await updateDoc(ref, { status });
  };

  return (
    <div className="card">
      <h2>Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div key={order.docId} className="order">
          <p>{order.name} - {order.phone}</p>
          <p>Total: ₹{order.total}</p>
          <p>Status: {order.status}</p>

          <select
            value={order.status}
            onChange={(e) => updateStatus(order.docId, e.target.value)}
          >
            <option>RECEIVED</option>
            <option>PROCESSING</option>
            <option>READY</option>
            <option>DELIVERED</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default OrderList;