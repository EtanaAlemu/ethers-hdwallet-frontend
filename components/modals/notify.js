
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const succuss = (msg) => toast.success(msg);
export const error = (msg) => toast.error(msg);

export const info = (msg) => toast.info(msg, {
    position: toast.POSITION.BOTTOM_RIGHT
  });