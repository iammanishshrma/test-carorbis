import React, { useMemo, useState, useEffect } from "react";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";

import Timer from "@/shared/components/Timer/Timer";
import { axiosInstance } from "@/shared/api/axios";
import { userEndpoints } from "@/shared/api/endpoints";
import { notify } from "@/shared/utils/notifyToast";
import { userLogin } from "@/shared/store/slices/checkLoginSlice";
import "../SignIn/SignIn.scss";
import "../SignUp/SignUp.scss";

const SocialSignUp = (props) => {
    const { userData } = props;

    const [showResendOtpMobile, setShowResendOtpMobile] = useState(false);
    const [showMobileTimer, setShowMobileTimer] = useState(false);
    const [showGetOtp, setShowGetOtp] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const router = useRouter();

    const dispatch = useDispatch();

    const SCHEMA = useMemo(() => {
        return yup.object({
            email: userData?.email
                ? yup.string()
                : yup
                      .string()
                      .email("Invalid email format")
                      .required("Please enter email"),
            mobile: yup
                .string()
                .required("Please enter phone number")
                .test(
                    "test-name",
                    "Enter valid phone nubmer",
                    function (value) {
                        const phoneRegex = /^[0-9]{10}$/; // Change this regex based on requirement
                        let isValidPhone = phoneRegex.test(value);
                        if (!isValidPhone) {
                            return false;
                        }
                        return true;
                    }
                ),
            otp: yup.string().required().min(4),
        });
    }, [userData]);

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(SCHEMA),
    });

    useEffect(() => {
        const enteredMobile = watch("mobile");
        const enteredMobileOtp = watch("otp");
        if (!errors.mobile && enteredMobile.length > 0) {
            setShowGetOtp(true);
        } else {
            setShowGetOtp(false);
        }

        if (!errors.otp && enteredMobileOtp?.length === 4) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    }, [errors.mobile, errors.otp, watch]);

    // Function to get the OTP
    const getOtpHandler = () => {
        const getOtpEndpoint = showResendOtpMobile
            ? userEndpoints.resendOtp
            : userEndpoints.getOtp;
        axiosInstance
            .post(getOtpEndpoint, {
                mobile: getValues("mobile"),
                countryCode: "+91",
            })
            .then((res) => {
                notify.successToast(res.data.status);
                setShowMobileTimer(true);

                setTimeout(() => {
                    setShowMobileTimer(false);
                    setShowResendOtpMobile(true);
                }, 5000);
            })
            .catch((error) => {
                notify.errorToast(error.response.data.message);
            });
    };

    const submitHandler = (data) => {
        if (data.email?.length === 0) {
            delete data.email;
        }
        const payload = { ...data, ...userData };
        payload["countryCode"] = "+91";

        axiosInstance
            .post(userEndpoints.socialSignUp, payload)
            .then((res) => {
                dispatch(userLogin({ token: res.data.data.token }));
                router.push("/");
            })
            .catch((error) => console.log(error));
    };
    return (
        <section className="login">
            <div className="container">
                <div className="login-content">
                    <div className="login-box">
                        <h2>Sign Up</h2>
                        <div className="login-form">
                            <div className="form-group">
                                <i className="icon-email"></i>
                                <input
                                    disabled
                                    className="form-control"
                                    defaultValue={userData?.name}
                                />
                            </div>
                            {userData?.email && (
                                <div className="form-group">
                                    <i className="icon-mail"></i>
                                    <input
                                        disabled
                                        className="form-control"
                                        defaultValue={userData?.email}
                                    />
                                </div>
                            )}
                            <form onSubmit={handleSubmit(submitHandler)}>
                                {!userData?.email && (
                                    <div className="form-group">
                                        <i className="icon-mail"></i>
                                        <input
                                            {...register("email")}
                                            placeholder="email"
                                            className="form-control"
                                            type="email"
                                        />
                                        <span className="error-msg">
                                            {errors.email?.message}
                                        </span>
                                    </div>
                                )}

                                <div className="form-block">
                                    <div className="form-group">
                                        <i className="icon-mobile"></i>
                                        <div className="error-field">
                                            <input
                                                {...register("mobile")}
                                                name="mobile"
                                                placeholder="mobile"
                                                type="text"
                                                className="form-control"
                                            />
                                            <span className="error-msg">
                                                {errors.mobile?.message}
                                            </span>
                                            {(showGetOtp ||
                                                showResendOtpMobile) &&
                                                !errors.mobile &&
                                                !showMobileTimer && (
                                                    <div className="otp-wrap signup-otp">
                                                        <button
                                                            type="button"
                                                            className="send-otp"
                                                            onClick={
                                                                getOtpHandler
                                                            }
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
                                    <div
                                        className="form-group"
                                        style={{ marginTop: "26px" }}
                                    >
                                        <i className="icon-password"></i>

                                        <div className="error-field">
                                            <input
                                                {...register("otp")}
                                                placeholder={
                                                    "Please enter the OTP recieved on mobile."
                                                }
                                                className="form-control"
                                            />
                                            <span className="error-msg">
                                                {errors.otp?.message}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="btn-wrap">
                                    <input
                                        type="submit"
                                        disabled={!isButtonDisabled}
                                        className="login-btn"
                                        value="Submit"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialSignUp;
