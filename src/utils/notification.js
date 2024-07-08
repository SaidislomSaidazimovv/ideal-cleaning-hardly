import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flip } from "react-toastify";

const Notification = ({ title, type, transition }) => {
  return toast(title, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip,
    type: type,
  });
};

export default Notification;
