import React, { useState } from "react";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { axiosInstance } from "@/shared/api/axios";
import { userEndpoints } from "@/shared/api/endpoints";
import { notify } from "@/shared/utils/notifyToast";
import "../../ForgetPassword/ForgetPassword.scss";

const SCHEMA = yup.object({
    password: yup.string().required().min(8),
    cPassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Your passwords do not match."),
});

const ChangePassword = (props) => {
    const [togglePassword, setTogglePassword] = useState(false);
    const [toggleCPassword, setToggleCPassword] = useState(false);

    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(SCHEMA),
    });

    // Functions to show/hide the passwords
    const togglePasswordHandler = () => setTogglePassword((prev) => !prev);
    const toggleCPasswordHandler = () => setToggleCPassword((prev) => !prev);

    // Function to change the password via OTP recieved on mobile/email
    const submitHandler = (data) => {
        let payload = {
            newPassword: data.password,
        };

        // To reset password via OTP recieved on Mobile
        if (props.enteredMobile) {
            payload = { ...payload, mobile: props.enteredMobile };
            axiosInstance
                .post(userEndpoints.mobileChangePasswordReset, payload)
                .then((res) => {
                    notify.successToast(res.data.status);
                    router.push("/sign-in");
                })
                .catch((error) => {
                    console.log(error);
                    notify.errorToast(error?.response?.data?.message);
                });
        } else if (props.enteredEmail) {
            // To reset password via OTP recieved on email
            payload = { ...payload, email: props.enteredEmail };
            axiosInstance
                .post(userEndpoints.emailChangePasswordReset, payload)
                .then((res) => {
                    notify.successToast(res.data.status);
                    router.push("/sign-in");
                })
                .catch((error) => {
                    notify.errorToast(error.response.data.message);
                    if (
                        error.response.data.messsage === "YOUR OTP IS EXPIRED"
                    ) {
                        props.onBack();
                    }
                });
        }
    };
    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="forget-pass-wrap">
                <div className="form-group">
                    <i className="icon-password"></i>
                    <input
                        style={{ padding: "14px 40px 12px" }}
                        {...register("password")}
                        type={togglePassword ? "text" : "password"}
                        placeholder="Password "
                        className="form-control"
                    />
                    {errors.password && (
                        <span className="error-msg">
                            {errors.password?.message}
                        </span>
                    )}
                    <i
                        className={`icon-eye ${togglePassword ? "active" : ""}`}
                        onClick={togglePasswordHandler}
                    ></i>
                </div>
                <div className="form-group">
                    <i className="icon-password"></i>
                    <input
                        style={{ padding: "14px 40px 12px" }}
                        {...register("cPassword")}
                        type={toggleCPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="form-control"
                    />
                    {errors.cPassword && (
                        <span className="error-msg">
                            {errors.cPassword?.message}
                        </span>
                    )}
                    <i
                        className={`icon-eye ${
                            toggleCPassword ? "active" : ""
                        }`}
                        onClick={toggleCPasswordHandler}
                    ></i>
                </div>
                <div className="btn-wrap">
                    <button
                        type="submit"
                        className="login-btn"
                        aria-label="Submit"
                        role="button"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ChangePassword;
