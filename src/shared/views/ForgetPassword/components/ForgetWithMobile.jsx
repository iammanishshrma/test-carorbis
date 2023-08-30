import React, { useEffect, useState, useMemo } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Timer from "@/shared/components/Timer/Timer";
import { axiosInstance } from "@/shared/api/axios";
import { userEndpoints } from "@/shared/api/endpoints";
import { notify } from "@/shared/utils/notifyToast";
import ChangePassword from "./ChangePassword";

const ForgetWithMobile = () => {
    const [showResendOtpMobile, setShowResendOtpMobile] = useState(false);
    const [showMobileTimer, setShowMobileTimer] = useState(false);
    const [showMobileOtpInput, setShowMobileOtpInput] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showGetOtp, setShowGetOtp] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const SCHEMA = useMemo(() => {
        return yup.object().shape({
            mobile: yup
                .string()
                .required("Please enter mobile.")
                .matches(/^[0-9]+$/, "Only numbers are allowed for this field ")
                .min(10, "Minimum 10 digits")
                .max(10, "Maximum 10 digits"),
            otp: showMobileOtpInput
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
    }, [showMobileOtpInput]);

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors },
    } = useForm({ mode: "onChange", resolver: yupResolver(SCHEMA) });

    // Handling the get opt button(toggle)
    useEffect(() => {
        const enteredMobile = watch("mobile");
        const enteredMobileOtp = watch("otp");
        if (!errors.mobile && enteredMobile.length > 0) {
            setShowGetOtp(true);
        } else {
            setShowGetOtp(false);
        }

        if (!errors.email && !errors.otp && enteredMobileOtp?.length === 4) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [errors.mobile, errors.otp, watch("mobile"), watch("otp")]);

    // Function to get the OTP
    const getOtpHandler = () => {
        axiosInstance
            .post(userEndpoints.resetPasswordMobile, {
                mobile: getValues("mobile"),
                countryCode: "+91",
            })
            .then((res) => {
                notify.successToast(res.data.status);
                setShowMobileTimer(true);
                setShowMobileOtpInput(true);

                setTimeout(() => {
                    setShowMobileTimer(false);
                    setShowResendOtpMobile(true);
                }, 5000);
            })
            .catch((error) => {
                notify.errorToast(error.response.data.message);
            });
    };

    // Function to verify OTP
    const submitHandler = (data) => {
        const payload = {
            mobile: data.mobile,
            countryCode: "+91",
            otp: +data.otp,
        };
        axiosInstance
            .post(userEndpoints.verityResetPasswordMobile, payload)
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
                        enteredMobile={getValues("mobile")}
                        onBack={() => setShowChangePassword(false)}
                    />
                ) : (
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="form-block">
                            <label className="input-label">Mobile</label>
                            <div className="form-group type-number forget-pass-wrp">
                                <div className="error-field">
                                    <i className="icon-mobile"></i>
                                    <input
                                        {...register("mobile")}
                                        name="mobile"
                                        type="number"
                                        className="form-control"
                                        placeholder="Mobile"
                                    />
                                    <span className="error-msg">
                                        {errors.mobile?.message}
                                    </span>
                                    {(showGetOtp || showResendOtpMobile) &&
                                        !errors.mobile &&
                                        !showMobileTimer && (
                                            <div className="otp-wrap signup-otp">
                                                <button
                                                    type="button"
                                                    className="send-otp"
                                                    onClick={getOtpHandler}
                                                    aria-label="OTP send"
                                                    role="button"
                                                >
                                                    {showResendOtpMobile
                                                        ? "Resend Otp"
                                                        : showGetOtp
                                                        ? "Get OTP"
                                                        : ""}
                                                </button>
                                            </div>
                                        )}
                                </div>
                                {showMobileTimer && <Timer />}
                            </div>
                            {showMobileOtpInput && (
                                <div
                                    className="form-group type-number"
                                    style={{ marginTop: "26px" }}
                                >
                                    <div className="error-field">
                                        <input
                                            {...register("otp")}
                                            placeholder={
                                                "Please enter the OTP recieved on mobile."
                                            }
                                            className="form-control"
                                            type="number"
                                        />
                                        <span className="error-msg">
                                            {errors.otp?.message}
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

export default ForgetWithMobile;
