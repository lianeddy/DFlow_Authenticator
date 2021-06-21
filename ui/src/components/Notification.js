import Swal from "sweetalert2";

const ErrorNotification = (text) => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text,
  });
};

const SuccessNotification = (text) => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text,
  });
};

export { ErrorNotification, SuccessNotification };
