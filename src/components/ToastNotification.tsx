import React from 'react'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


type ToastType = "success"| "error"


const showToast = (message: string, type: ToastType) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 3000, 
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "colored",
  });
};

const ToastNotification:React.FC = () => {
  return <ToastContainer />
}

export {ToastNotification, showToast}