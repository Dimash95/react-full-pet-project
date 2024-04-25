import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegistrationForm } from "../../types/form";
import { registrationSchema } from "../../schema/registration-schema";
import axios, { AxiosError } from "axios";
import style from "./registration.module.css";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegistrationForm>({ mode: "onBlur", resolver: yupResolver(registrationSchema) });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegistrationForm> = async (data) => {
    try {
      await axios.post("https://api.escuelajs.co/api/v1/users/", data);
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
      <h1>Registration</h1>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.info}>
          <div className={style.labelErrorWrapper}>
            <label>Name</label>
            <p className={style.error}>{errors.name?.message}</p>
          </div>
          <input type="text" {...register("name")} />
        </div>
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
        <div className={style.info}>
          <div className={style.labelErrorWrapper}>
            <label>Avatar</label>
            <p className={style.error}>{errors.avatar?.message}</p>
          </div>
          <input type="url" {...register("avatar")} />
        </div>
        {error && <p className={style.error}>{error}</p>}
        <button className={style.btn} type="submit" disabled={!isValid}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
