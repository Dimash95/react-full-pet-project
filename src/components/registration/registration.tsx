import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { RegistrationForm } from "../../types/form";
import style from "./registration.module.css";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[A-Za-z]+$/, "Name is invalid"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(4, "Password is too short"),
  avatar: yup.string().url("Invalid URL").required("Avatar is required"),
});



const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegistrationForm>({ mode: "onBlur", resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegistrationForm> = async (data) => {
    await axios.post("https://api.escuelajs.co/api/v1/users/", data);
    navigate("/react-full-pet-project/");
  };

  return (
    <div className={style.wrapper}>
      <h1>Registration</h1>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.info}>
          <label>Name</label>
          <div>
            <input type="text" {...register("name")} />
            <p className={style.error}>{errors.name?.message}</p>
          </div>
        </div>
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
        <div className={style.info}>
          <label>Avatar</label>
          <div>
            <input type="url" {...register("avatar")} />
            <p className={style.error}>{errors.avatar?.message}</p>
          </div>
        </div>
        <button className={style.btn} type="submit" disabled={!isValid}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
