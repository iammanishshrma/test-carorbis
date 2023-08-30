import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { userEndpoints } from "@/shared/api/endpoints";
import { axiosInstance } from "@/shared/api/axios";

import LoaderUi from "@/shared/components/LoaderUi/LoaderUi";
import Timer from "@/shared/components/Timer/Timer";
import SocialLogin from "@/shared/components/SocialLogin/SocialLogin";
import "react-toastify/dist/ReactToastify.css";
import "../SignIn/SignIn.scss";
import "./SignUp.scss";
import { notify } from "@/shared/utils/notifyToast";

const SignUp = () => {
    const router = useRouter();
    const getIp = useSelector((state) => state.systemIpSlice?.systemIp);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [submitOtp, setSubmitOtp] = useState(false);
    const [isValidOtp, setIsValidOtp] = useState(false);
    const [value, setValue] = useState(true);
    const [resend, setResend] = useState(false);
    const [GetMobEnter, setMobEnter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [isPasswordShowing, setIsPasswordShowing] = useState(false);
    const [isCPasswordShowing, setIsCPasswordShowing] = useState(false);

    const schema = yup.object().shape({
        firstName: yup
            .string()
            .required("Please enter user name")
            .matches(/^[A-Za-z\s]+$/, "Must contain character"),
        email: yup
            .string()
            .email("Invalid email format")
            .required("Please enter email"),
        password: yup
            .string()
            .required("Please enter password")
            .test(
                "test-name",
                "Minimum 4 and max 20 character allowed",
                function (value) {
                    const nameRegix = /^.{4,20}$/; // Change this regex based on requirement
                    let isValidEMail = nameRegix.test(value);
                    if (!isValidEMail) {
                        return false;
                    }
                    return true;
                }
            ),
        // .oneOf([yup.ref("confirmPwd")], "Passwords does not match"),
        confirmPwd: yup
            .string()
            .required("Please enter password")
            .oneOf([yup.ref("password")], "Passwords does not match"),
        mobile: yup
            .string()
            .required("Please enter phone number")
            .test("test-name", "Enter valid phone nubmer", function (value) {
                const phoneRegex = /^[0-9]{10}$/; // Change this regex based on requirement
                let isValidPhone = phoneRegex.test(value);
                if (!isValidPhone) {
                    return false;
                }
                return true;
            }),
        otp: yup
            .string()
            .required("Please enter four digit otp")
            .test(
                "test-name",
                "Please enter four digit number otp",
                function (value) {
                    const phoneRegex = /^[0-9]{4}$/; // Change this regex based on requirement
                    let IsValidOtp = phoneRegex.test(value);
                    if (!IsValidOtp) {
                        setIsValidOtp(false);
                        return false;
                    } else {
                        setIsValidOtp(true);
                        return true;
                    }
                }
            ),
    });
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    const watchAllFields = watch();
    const password = getValues().password;
    const cPassword = getValues().confirmPwd;
    useEffect(() => {
        if (password !== cPassword) {
            setError("password", {
                type: "custom",
                message: "Passwords does not match",
            });
            setError("confirmPwd", {
                type: "custom",
                message: "Passwords does not match",
            });
        } else {
            clearErrors("password");
            clearErrors("confirmPwd");
        }
    }, [password, cPassword, setError]);

    //* function to send otp
    //@param Need api route and payload as parameter
    const sendTop = (route, payload) => {
        setIsLoading(true);
        setIsOtpSent(false);
        axiosInstance
            .post(route, payload)
            .then((res) => {
                setIsLoading(false);
                notify.successToast(res?.data?.message);
                setIsOtpSent(true);
            })
            .catch((error) => {
                setIsLoading(false);
                notify.errorToast(error?.response?.data?.message);
            });
    };

    // Send Otp
    let errorArr = Object.keys(errors).filter((item) => item !== "otp");

    useEffect(() => {
        if (
            !errorArr.length &&
            getVal.firstName &&
            getVal.email &&
            getVal.password &&
            getVal.confirmPwd &&
            getVal.mobile
        ) {
            setMobEnter(true);
            if (isValidOtp) {
                setIsValidOtp(true);
            }
        } else {
            if (!isValidOtp || isValidOtp) {
                setIsValidOtp(false);
            }
            setMobEnter(false);
        }
    }, [watchAllFields]);

    const sendOtp = (e) => {
        e.preventDefault();
        const payload = { countryCode: "+91", mobile: getValues().mobile };
        sendTop(userEndpoints.getOtp, payload);
    };

    // Resend/submit button show/hide on send otp failure
    useEffect(() => {
        if (isOtpSent) {
            setValue(false);
            setSubmitOtp(true);
            setTimeout(() => {
                setResend(true);
            }, 5000);
        }
    }, [isOtpSent]);

    // Resend otp
    let getVal = getValues();
    const resendOtp = () => {
        const payload = { countryCode: "+91", mobile: getValues().mobile };
        sendTop(userEndpoints.resendOtp, payload);

        setValue(false);
        setResend(false);
        setTimeout(() => {
            setResend(true);
        }, 5000);
    };

    //* Toggle show password
    const togglePassword = () => {
        setIsPasswordShowing((prev) => !prev);
    };

    //* Toggle show confirm password
    const toggleConfirmPassword = () => {
        setIsCPasswordShowing((prev) => !prev);
    };

    //*  User sign-up
    const onSubmitHandler = (data) => {
        setIsLoading(true);
        let userData = {
            name: data.firstName,
            email: data.email,
            password: data.password,
            mobile: data.mobile,
            otp: parseInt(data.otp),
            countryCode: "+91",
            ip_address: getIp,
        };

        axiosInstance
            .post(userEndpoints.SignUp, userData)
            .then((res) => {
                setTimeout(() => {
                    router.push("/sign-in");
                }, 1000);
                notify.successToast(res?.data?.message);
                setIsLoading(false);
            })
            .catch((error) => {
                notify.errorToast(error?.response?.data?.message);
                setIsLoading(false);
            });
    };

    return (
        <>
            <section className="login">
                {isLoading && <LoaderUi />}
                <div className="container">
                    <div className="login-content">
                        <div className="login-box">
                            <h2>Sign Up</h2>
                            <div className="login-form">
                                <form onSubmit={handleSubmit(onSubmitHandler)}>
                                    <div className="form-group">
                                        <i className="icon-user"></i>
                                        <input
                                            {...register("firstName")}
                                            placeholder="Name"
                                            className="form-control"
                                        />
                                        <span className="error-msg">
                                            {errors.firstName?.message}
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <i className="icon-mail"></i>
                                        <input
                                            {...register("email")}
                                            placeholder="Email"
                                            className="form-control"
                                            type="email"
                                        />
                                        <span className="error-msg">
                                            {errors.email?.message}
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <i className="icon-password"></i>
                                        <input
                                            {...register("password")}
                                            placeholder="Password"
                                            type={
                                                isPasswordShowing
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="form-control"
                                        />
                                        <span className="error-msg">
                                            {errors.password?.message}
                                        </span>
                                        <i
                                            className={`icon-eye ${
                                                isPasswordShowing
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={togglePassword}
                                        ></i>
                                    </div>
                                    <div className="form-group">
                                        <i className="icon-password"></i>
                                        <input
                                            {...register("confirmPwd")}
                                            placeholder="Confirm password"
                                            type={
                                                isCPasswordShowing
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="form-control"
                                        />
                                        <span className="error-msg">
                                            {errors.confirmPwd?.message}
                                        </span>
                                        <i
                                            className={`icon-eye ${
                                                isCPasswordShowing
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={toggleConfirmPassword}
                                        ></i>
                                    </div>
                                    <div className="form-group type-number">
                                        <i className="icon-mobile"></i>
                                        <input
                                            {...register("mobile")}
                                            placeholder="Mobile number"
                                            className="form-control"
                                            type="number"
                                        />
                                        <span className="error-msg">
                                            {errors.mobile?.message}
                                        </span>
                                        {GetMobEnter ? (
                                            <div className="otp-wrap signup-otp">
                                                {resend || value ? (
                                                    <button
                                                        className="send-otp"
                                                        aria-label="OTP send"
                                                        role="button"
                                                        onClick={
                                                            value
                                                                ? sendOtp
                                                                : resend
                                                                ? resendOtp
                                                                : null
                                                        }
                                                    >
                                                        {value
                                                            ? "Get OTP"
                                                            : resend
                                                            ? "Resend OTP"
                                                            : null}
                                                    </button>
                                                ) : null}
                                            </div>
                                        ) : null}
                                        {!(value || resend) ? <Timer /> : null}
                                    </div>
                                    {submitOtp ? (
                                        <div className="otp-val singup-otp type-number">
                                            <div className="form-group">
                                                <input
                                                    {...register("otp")}
                                                    placeholder="OTP"
                                                    className="form-control otp-control"
                                                    type="number"
                                                />
                                                <span className="error-msg">
                                                    {errors.otp?.message}
                                                </span>
                                            </div>
                                        </div>
                                    ) : null}
                                    {isValidOtp && (
                                        <div className="btn-wrap">
                                            <input
                                                type="submit"
                                                disabled={!isValidOtp}
                                                className="login-btn"
                                                value="Submit"
                                            />
                                        </div>
                                    )}
                                </form>
                                <SocialLogin />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUp;
