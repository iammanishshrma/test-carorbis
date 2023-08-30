import React, { useState } from "react";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { axiosInstance } from "@/shared/api/axios";
import { userEndpoints } from "@/shared/api/endpoints";
import { notify } from "@/shared/utils/notifyToast";
import "../../../ForgetPassword/ForgetPassword.scss";

const SCHEMA = yup.object({
    oldPassword: yup.string().required("Old password is required"),
    password: yup.string().required("Password is required").min(8),
    cPassword: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("password")], "Your passwords do not match."),
});

const ChangePassword = (props) => {
    const [togglePassword, setTogglePassword] = useState(false);
    const [toggleOldPassword, setToggleOldPassword] = useState(false);
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

    // Functions to show hide the password
    const togglePasswordHandler = () => setTogglePassword((prev) => !prev);
    const toggleCPasswordHandler = () => setToggleCPassword((prev) => !prev);
    const toggleOldPasswordHandler = () =>
        setToggleOldPassword((prev) => !prev);

    // Fucntion to submit the passwords
    const submitHandler = (data) => {
        const payload = {
            oldPassword: data.oldPassword,
            newPassword: data.password,
        };

        axiosInstance
            .post(userEndpoints.userChangePassword, payload)
            .then((res) => {
                notify.successToast(res.data.message);
                router.push("/my-profile");
            })
            .catch((error) => {
                notify.errorToast(error.response.data.message);
            });
    };

    return (
        <div
            className="forget-password"
            style={{ padding: 0, background: "transparent" }}
        >
            <div className="account-form-wrap">
                <div className="form-wrap">
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="form-block">
                            <label className="input-label" htmlFor="">
                                Old password
                            </label>
                            <div className="form-group">
                                <i className="icon-password"></i>
                                <input
                                    style={{ padding: "14px 40px 12px" }}
                                    {...register("oldPassword")}
                                    type={
                                        toggleOldPassword ? "text" : "password"
                                    }
                                    placeholder="Old password "
                                    className="form-control"
                                />
                                {errors.oldPassword && (
                                    <span className="error-msg">
                                        {errors.oldPassword?.message}
                                    </span>
                                )}
                                <i
                                    className={`icon-eye ${
                                        toggleOldPassword ? "active" : ""
                                    }`}
                                    onClick={toggleOldPasswordHandler}
                                ></i>
                            </div>
                        </div>

                        <div className="form-block">
                            <label className="input-label">Password</label>
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
                                    className={`icon-eye ${
                                        togglePassword ? "active" : ""
                                    }`}
                                    onClick={togglePasswordHandler}
                                ></i>
                            </div>
                        </div>
                        <div className="form-block">
                            <label className="input-label">Password</label>
                            <div className="form-group">
                                <i className="icon-password"></i>
                                <input
                                    style={{ padding: "14px 40px 12px" }}
                                    {...register("cPassword")}
                                    type={toggleCPassword ? "text" : "password"}
                                    placeholder="Confirm Password "
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
