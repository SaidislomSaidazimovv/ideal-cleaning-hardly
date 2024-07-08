import * as Yup from "yup";

// ============== Auth ============
export const signUpValidationSchema = Yup.object().shape({
  full_name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
    "Password must be at least 6 characters  and contain at least one uppercase"
  ),
  phone_number: Yup.string()
    .min(19, "Invalid phone number")
    .required("Phone is required"),
});

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
    "Password must be at least 6 characters  and contain at least one uppercase"
  ),
});

export const updatePassValidationSchema = Yup.object().shape({
  code: Yup.string().required().trim(),
});

export const ValidationForgotPassword = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});
// =========== Service ============

export const serviceValidationSchema = Yup.object().shape({
  name: Yup.string().required(" Name is required"),
  price: Yup.string().required("Price is required"),
});

//  =========== Order ============

export const orderValidationSchema = Yup.object().shape({
  client_full_name: Yup.string().required(" FullName is required"),
  client_phone_number: Yup.string()
    .min(19, "Invalid phone number")
    .required("Phone is required"),
  amount: Yup.string().required("Amount is required"),
  service_id: Yup.string().required("Service Id is required"),
});
