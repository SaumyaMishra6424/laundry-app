import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

function Dashboard() {
  const [data, setData] = useState({
    total: 0,
    revenue: 0,
    statusCount: {}
  });

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "orders"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let total = 0;
      let revenue = 0;
      let statusCount = {};

      snapshot.forEach((doc) => {
        const d = doc.data();
        total++;
        revenue += d.total;
        statusCount[d.status] = (statusCount[d.status] || 0) + 1;
      });

      setData({ total, revenue, statusCount });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="card">
      <h2>Dashboard</h2>

      <div className="dashboard-grid">
        <div className="stat-box">Orders: {data.total}</div>
        <div className="stat-box">Revenue: ₹{data.revenue}</div>

        {Object.keys(data.statusCount).map((status) => (
          <div key={status} className="stat-box">
            {status}: {data.statusCount[status]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;