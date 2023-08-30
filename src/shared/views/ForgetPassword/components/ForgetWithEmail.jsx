import React, { useEffect, useState, useMemo } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Timer from "@/shared/components/Timer/Timer";
import { axiosInstance } from "@/shared/api/axios";
import { userEndpoints } from "@/shared/api/endpoints";
import { notify } from "@/shared/utils/notifyToast";
import ChangePassword from "./ChangePassword";

const ForgetWithEmail = () => {
    const [showResendOtpEmail, setShowResendOtpEmail] = useState(false);
    const [showEmailTimer, setShowEmailTimer] = useState(false);
    const [showEmailOtpInput, setShowEmailOtpInput] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showGetOtp, setShowGetOtp] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const SCHEMA = useMemo(() => {
        return yup.object().shape({
            email: yup.string().email("Please enter a valid email."),
            emailOtp: showEmailOtpInput
                ? yup
                      .string()
                      .required("Please enter otp")
                      .matches(
                          /^[0-9]+$/,
                          "Only numbers are allowed for this field "
                      )
                      .min(4, "Minimum 4 digits")
                      .max(4, "Maximum 4 digits")
                : yup.string(),
        });
    }, [showEmailOtpInput]);

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors },
    } = useForm({ mode: "onChange", resolver: yupResolver(SCHEMA) });

    // Handling the get opt button(toggle)
    useEffect(() => {
        const enteredEmail = watch("email");
        const enteredEmailOtp = watch("emailOtp");

        if (!errors.email && enteredEmail?.length > 0) {
            setShowGetOtp(true);
        } else {
            setShowGetOtp(false);
        }

        if (
            !errors.email &&
            !errors.emailOtp &&
            enteredEmailOtp?.length === 4
        ) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [errors.email, errors.emailOtp, watch("email"), watch("emailOtp")]);

    //Fucntion to get OTP
    const getOtpHandler = () => {
        axiosInstance
            .post(userEndpoints.resetPasswordEmail, {
                email: getValues("email"),
            })
            .then((res) => {
                notify.successToast(res.data.status);
                setShowEmailTimer(true);
                setShowEmailOtpInput(true);

                setTimeout(() => {
                    setShowEmailTimer(false);
                    setShowResendOtpEmail(true);
                }, 5000);
            })
            .catch((error) => {
                notify.errorToast(error.response.data.message);
            });
    };

    // Function to verify the OTP
    const submitHandler = (data) => {
        const payload = { email: data.email, otp: +data.emailOtp };
        axiosInstance
            .post(userEndpoints.verityResetPasswordEmail, payload)
            .then((res) => {
                notify.successToast(res.data.message);
                setShowChangePassword(true);
            })
            .catch((error) => {
                notify.errorToast(error.response.data.message);
            });
    };

    return (
        <div className="forget-form">
            <div className="form-wrap">
                {showChangePassword ? (
                    <ChangePassword
                        enteredEmail={getValues("email")}
                        onBack={() => setShowChangePassword(false)}
                    />
                ) : (
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="form-block">
                            <label className="input-label">Email</label>
                            <div className="form-group forget-pass-wrp">
                                <div className="error-field">
                                    <i className="icon-mail"></i>
                                    <input
                                        {...register("email")}
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                    <span className="error-msg check">
                                        {errors.email?.message}
                                    </span>
                                    {(showGetOtp || showResendOtpEmail) &&
                                        !errors.email &&
                                        !showEmailTimer && (
                                            <div className="otp-wrap signup-otp">
                                                <button
                                                    type="button"
                                                    className="send-otp"
                                                    onClick={getOtpHandler}
                                                    aria-label="OTP send"
                                                    role="button"
                                                >
                                                    {showResendOtpEmail
                                                        ? "Resend Otp"
                                                        : showGetOtp
                                                        ? "Get OTP"
                                                        : ""}
                                                </button>
                                            </div>
                                        )}
                                </div>
                                {showEmailTimer && <Timer />}
                            </div>
                            {showEmailOtpInput && (
                                <div
                                    className="form-group type-number"
                                    style={{ marginTop: "26px" }}
                                >
                                    <div className="error-field">
                                        <input
                                            {...register("emailOtp")}
                                            placeholder={
                                                "Please enter the OTP recieved on email."
                                            }
                                            className="form-control"
                                            type="number"
                                        />
                                        <span className="error-msg">
                                            {errors.emailOtp?.message}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="btn-wrap">
                            <button
                                disabled={isButtonDisabled}
                                type="submit"
                                className="login-btn"
                                aria-label="Submit"
                                role="button"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgetWithEmail;
