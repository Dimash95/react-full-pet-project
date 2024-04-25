import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema } from "../../schema/login-schema";
import axios, { AxiosError } from "axios";
import style from "./login.module.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({ mode: "onBlur", resolver: yupResolver(loginSchema) });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      navigate("/react-full-pet-project/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<{ message: string }>;
        if (serverError && serverError.response && serverError.response.data.message) {
          console.error("Error loading user profile", serverError.response.data.message);
          setError(serverError.response.data.message);
        } else {
          console.error("Error loading user profile", "An unknown error occurred");
          setError("An unknown error occurred");
        }
      }
    }
  };

  return (
    <div className={style.wrapper}>
      <h1>Login</h1>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.info}>
          <div className={style.labelErrorWrapper}>
            <label>Email</label>
            <p className={style.error}>{errors.email?.message}</p>
          </div>
          <input type="email" {...register("email")} />
        </div>
        <div className={style.info}>
          <div className={style.labelErrorWrapper}>
            <label>Password</label>
            <p className={style.error}>{errors.password?.message}</p>
          </div>
          <input type="password" {...register("password")} />
        </div>
        {error && <p className={style.error}>{error}</p>}
        <button className={style.btn} type="submit" disabled={!isValid}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
