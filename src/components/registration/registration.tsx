import { useState } from "react";
import axios from "axios";
import style from "./registration.module.css";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "../../types/axios-error";

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.post("https://api.escuelajs.co/api/v1/users/", userData);
      navigate("/react-full-pet-project/");
    } catch (err) {
      setError((err as AxiosError).response?.data?.message || "An error occurred during registration.");
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.info}>
        <label>Name</label>
        <input type="text" name="name" value={userData.name} onChange={handleChange} />
      </div>
      <div className={style.info}>
        <label>Email</label>
        <input type="email" name="email" value={userData.email} onChange={handleChange} />
      </div>
      <div className={style.info}>
        <label>Password</label>
        <input type="password" name="password" value={userData.password} onChange={handleChange} />
      </div>
      <div className={style.info}>
        <label>Avatar</label>
        <input type="text" name="avatar" value={userData.avatar} onChange={handleChange} />
      </div>
      {error && <p>{error}</p>}
      <button className={style.btn} type="submit">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
