import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { forwardRef, cloneElement, useState, useEffect } from "react";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { service, order } from "@service";
import { orderValidationSchema } from "@validation";
import { useMask } from "@react-input/mask";

const Fade = forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Index({ open, handleClose, item }) {
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await service.get();
      if (response.status === 200 && response?.data?.services) {
        setData(response?.data?.services);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const initialValues = {
    client_full_name: "",
    client_phone_number: "",
    amount: "",
    service_id: "",
  };

  const handleSubmit = async values => {
    const client_phone_number = values.client_phone_number.replace(/\D/g, "");
    const payload = {
      ...values,
      client_phone_number: `+${client_phone_number}`,
    };

    try {
      const response = await order.create(payload);
      if (response.status === 201) {
        window.location.reload();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              className="text-center"
              id="spring-modal-title"
              variant="h5"
              component="h2"
            >
              Create Order
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={orderValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name="client_full_name"
                    type="text"
                    as={TextField}
                    label="Full Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="client_full_name"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="client_phone_number"
                    type="tel"
                    as={TextField}
                    label="Phone Number"
                    fullWidth
                    inputRef={inputRef}
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="client_phone_number"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="amount"
                    type="number"
                    as={TextField}
                    label="Amount"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="amount"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="service_id"
                    type="text"
                    as={Select}
                    label="Service Id "
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="service_id"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  >
                    {data.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Field>
                  <Button
                    type="sumbit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                  >
                    {isSubmitting ? "Submitting" : "Save"}
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
