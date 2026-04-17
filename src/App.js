import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
   if (!user) return <Auth setUser={setUser} />;
  return (
    
  
  <div className="home-dark">

    <div className="page-container">
      <div className="top-bar">
        <h1>Laundry Dashboard</h1>

        <button
          className="logout-btn"
          onClick={() => signOut(auth)}
        >
          Logout
        </button>
      </div>

      <Dashboard />
      <OrderForm />
      <OrderList />
    </div>

  </div>
);

}

export default App;
