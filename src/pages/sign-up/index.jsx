import { Button, IconButton, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMask } from "@react-input/mask";
import { useState } from "react";
import { auth } from "@service";
import { SignUpModal } from "@modal";
import { signUpValidationSchema } from "@validation";
import { ErrorMessage, Field, Form, Formik } from "formik";
// import { Navigate, useNavigate } from "react-router-dom";
const Index = () => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });
  const initialValues = {
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
  };

  const handleSubmit = async values => {
    localStorage.setItem("email", values.email);
    const phone_number = values.phone_number.replace(/\D/g, "");
    const payload = { ...values, phone_number: `+${phone_number}` };
    try {
      const response = await auth.sign_up(payload);
      if (response.status === 200) {
        setOpen(true);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SignUpModal open={open} handleClose={() => setOpen(false)} />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5 ">
          <h1 className="text-center my-6 text-[50px]">Register</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={signUpValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="full_name"
                  type="text"
                  as={TextField}
                  label="Ismingizni kiriting"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="full_name"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="phone_number"
                  type="tel"
                  as={TextField}
                  label="Telefon raqamingiz"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  inputRef={inputRef}
                  helperText={
                    <ErrorMessage
                      name="phone_number"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? "Submitting" : "Submit"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Index;
