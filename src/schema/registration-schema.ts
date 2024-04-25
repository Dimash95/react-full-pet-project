import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[A-Za-z]+$/, "Name is invalid"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(4, "Password is too short"),
  avatar: yup.string().url("Invalid URL").required("Avatar is required"),
});
