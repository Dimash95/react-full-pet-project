import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import style from "./login.module.css";
import UserProfile from "../user-profile/user-profile";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
        email,
        password,
      });
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      // Redirect user or do something else upon successful login
      navigate("/react-full-pet-project/");
    } catch (err) {
      setError(err.response.data.message || "An error occurred during login.");
    }
  };

  return (
    <>
      {token ? (
        <UserProfile />
      ) : (
        <form className={style.form} onSubmit={handleLogin}>
          <div className={style.info}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={style.info}>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p>{error}</p>}
          <button type="submit">Login</button>
        </form>
      )}
    </>
  );
};

export default LoginForm;
