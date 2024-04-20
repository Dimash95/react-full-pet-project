import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./login.module.css";
import { AxiosError } from "../../types/axios-error";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      navigate("/react-full-pet-project/");
    } catch (err: unknown) {
      setError((err as AxiosError).response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <>
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
        <button className={style.btn} type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
