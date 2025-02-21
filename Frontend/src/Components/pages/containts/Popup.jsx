import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Popup({ setToast, alert, subMesg }) {
  const notify = () => {
    if (alert) {
      toast.error(
        <>
          <strong>Error!</strong>
          <p>{subMesg}</p>
        </>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => setToast(false),
        }
      );
    } else {
      toast.success(
        <>
          <strong>Success!</strong>
          <p>{subMesg}</p>
        </>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => setToast(false),
        }
      );
    }
  };

  React.useEffect(() => {
    notify();
  }, []);

  return <ToastContainer />;
}

export default Popup;
