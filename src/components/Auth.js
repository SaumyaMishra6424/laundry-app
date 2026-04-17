import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function Auth({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAuth = async () => {
    try {
      let userCredential;

      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        showToast("Login Successful", "success");
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        showToast("Successfully Registered", "success");
      }
       setUser(userCredential.user);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        showToast("Please register yourself", "info");
      } else {
        showToast("Invalid email or password", "error");
      }
    }
  };

  return (
    
    <div className="auth-container">
      
      <div className="auth-card">
        <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <button onClick={handleAuth}>
          {isLogin ? "Sign In" : "Sign Up"}
        </button>

        <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </p>
      </div>

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

export default Auth;