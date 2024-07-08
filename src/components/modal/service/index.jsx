import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { forwardRef, cloneElement } from "react";
import { TextField, Button } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { service } from "@service";
import { serviceValidationSchema } from "@validation";

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
  console.log(item, "item");

  const initialValues = {
    name: item?.name ? item?.name : "",
    price: item?.price ? item?.price : "",
  };

  const handleSubmit = async values => {
    if (item) {
      const payload = { id: item.id, ...values };
      try {
        const response = await service.uptade(payload);
        if (response.status === 200) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await service.create(values);
        if (response.status === 201) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
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
              Create Service
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={serviceValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name="name"
                    type="text"
                    as={TextField}
                    label="Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="price"
                    type="number"
                    as={TextField}
                    label="Price"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="price"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Button
                    type="submit"
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
