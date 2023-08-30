import { toast } from "react-toastify";

const notifyToast = (message) =>
    toast(message, { hideProgressBar: true, position: "top-center" });

const successToast = (message) =>
    toast.success(message, { hideProgressBar: true, position: "top-center" });
const errorToast = (message) =>
    toast.error(message, { hideProgressBar: true, position: "top-center" });

const warningToast = (message) =>
    toast(message, { hideProgressBar: true, position: "top-center" });
const infoToast = (message) =>
    toast(message, { hideProgressBar: true, position: "top-center" });

export const notify = { successToast, errorToast, warningToast, infoToast };

export default notifyToast;
