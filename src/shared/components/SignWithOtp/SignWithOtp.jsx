import React, { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import { GetLogin, loginWithPhone } from "@/shared/store/slices/SignInSlice";
import LoaderUi from "@/shared/components/LoaderUi/LoaderUi";
import Timer from "@/shared/components/Timer/Timer";
import SocialLogin from "../SocialLogin/SocialLogin";
import "./SignWithOtp.scss";
const SignWithOtp = (props) => {
    const [showResend, setResend] = useState(false);
    const [setMob, getMob] = useState();
    const [getOtpBox, setOtpBox] = useState(true);
    const router = useRouter();
    const openEmail = () => {
        props.clickShow(true);
    };
    const loader = useSelector((state) => state.SignInSlice.loading);
    const getOtpRes = useSelector((state) => state.SignInSlice.sucessStatus);
    const getIp = useSelector((state) => state.systemIpSlice?.systemIp);
    const dispatch = useDispatch();
    const [data, setData] = useState("");
    let schema = useMemo(
        () =>
            yup.object().shape({
                mobile: getOtpBox
                    ? yup
                          .string("Enter phone number")
                          .required("Phone number is required")
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
                          )
                    : yup.string(),
                otp: getOtpBox
                    ? yup.string()
                    : yup
                          .string()
                          .required("Please enter four digit otp")
                          .test(
                              "test-name",
                              "Please enter four digit number otp",
                              function (value) {
                                  const phoneRegex = /^[0-9]{4}$/; // Change this regex based on requirement
                                  let IsValidOtp = phoneRegex.test(value);
                                  if (!IsValidOtp) {
                                      //setIsValidOtp(false);
                                      return false;
                                  } else {
                                      //setIsValidOtp(true);
                                      return true;
                                  }
                              }
                          ),
            }),
        [getOtpBox]
    );
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
    const onSubmitData = (data) => {
        setData(JSON.stringify(data));
        getMob(data);
        if (getOtpBox) {
            data.countryCode = "+91";
            dispatch(loginWithPhone(data));
        } else {
            const newData = {
                mobile: setMob.mobile,
                ip_address: getIp,
                otp: parseInt(data.otp),
                countryCode: "+91",
            };
            dispatch(GetLogin(newData, router, props.navigateTo));
        }
    };
    useEffect(() => {
        if (getOtpRes == "success") {
            setOtpBox(false);
            setTimeout(() => {
                setResend(true);
            }, 5000);
            reset();
        }
    }, [getOtpRes]);
    useEffect(() => {
        setOtpBox(true);
    }, []);
    const resendOtp = () => {
        setResend(false);
        dispatch(loginWithPhone({ mobile: setMob.mobile, countryCode: "+91" }));
    };
    const changeNumber = () => {
        setResend(false);
        setOtpBox(true);

        reset({ mobile: setMob.mobile, countryCode: "+91" });
    };
    return (
        <section className="login">
            {loader && <LoaderUi />}
            <div className="container">
                <div className="login-content">
                    <div className="login-box">
                        <h2>{getOtpBox ? "Login with mobile" : "Enter otp"}</h2>
                        <div className="login-form">
                            <form onSubmit={handleSubmit(onSubmitData)}>
                                {getOtpBox ? (
                                    <>
                                        <div className="form-group type-number">
                                            <i className="icon-mobile"></i>
                                            <input
                                                {...register("mobile")}
                                                placeholder="Mobile"
                                                className="form-control"
                                                type="number"
                                            />
                                            <span className="error-msg">
                                                {errors.mobile?.message}
                                            </span>
                                        </div>
                                        <div className="btn-wrap">
                                            <input
                                                type="submit"
                                                className="login-btn"
                                                value="Submit"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="forge-pwd click-here-wrp">
                                            OTP sent to {setMob.mobile}
                                            <button
                                                type={"button"}
                                                className="click-here"
                                                onClick={changeNumber}
                                                aria-label="Change number"
                                                role="button"
                                            >
                                                Click here change
                                            </button>
                                        </div>
                                        <div className="form-group resend-otp-field">
                                            <div className="form-otp-wrp">
                                                <div className="input-otp-wrp">
                                                    <i className="icon-password"></i>
                                                    <input
                                                        {...register("otp")}
                                                        type="text"
                                                        placeholder="Otp "
                                                        className="form-control"
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                {showResend ? (
                                                    <div className="otp-wrap signup-otp">
                                                        <button
                                                            className="send-otp"
                                                            type="button"
                                                            onClick={resendOtp}
                                                            aria-label="Resend OTP"
                                                            role="button"
                                                        >
                                                            Resend OTP
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="otp-timer">
                                                        <Timer />
                                                    </div>
                                                )}
                                            </div>
                                            <span className="error-msg error-signin">
                                                {errors.otp?.message}
                                            </span>
                                        </div>
                                        <div className="btn-wrap">
                                            <input
                                                type="submit"
                                                className="login-btn"
                                                value="Submit"
                                            />
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                        <div className="forge-pwd click-here-wrp">
                            Login with email?{" "}
                            <button
                                className="click-here"
                                onClick={openEmail}
                                aria-label="Click here"
                                role="button"
                            >
                                Click here
                            </button>
                        </div>
                        {/* <div className="forge-pwd">
                            <Link
                                href="/forget-password"
                                className="click-here"
                                aria-label="Forget password"
                            >
                                Forgot your password?
                            </Link>
                        </div> */}
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignWithOtp;
