import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./login.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoginForm } from "../../types/form";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(4, "Password is too short"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({ mode: "onBlur", resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
      email: data.email,
      password: data.password,
    });
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    navigate("/react-full-pet-project/");
  };

  return (
    <div className={style.wrapper}>
      <h1>Login</h1>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.info}>
          <label>Email</label>
          <div>
            <input type="email" {...register("email")} />
            <p className={style.error}>{errors.email?.message}</p>
          </div>
        </div>
        <div className={style.info}>
          <label>Password</label>
          <div>
            <input type="password" {...register("password")} />
            <p className={style.error}>{errors.password?.message}</p>
          </div>
        </div>
        <button className={style.btn} type="submit" disabled={!isValid}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
