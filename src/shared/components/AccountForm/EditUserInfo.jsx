import React, { useState, useEffect, useMemo } from "react";

import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Timer from "@/shared/components/Timer/Timer";
import LoaderUi from "@/shared/components/LoaderUi/LoaderUi";
import { getUserDetail } from "@/shared/store/slices/getUserSlice";
import { axiosInstance } from "@/shared/api/axios";
import { userEndpoints } from "@/shared/api/endpoints";
import { notify } from "@/shared/utils/notifyToast";
import imgPlaceholder from "@/shared/assets/images/user-profile-new.svg";
import "./AccountForm.scss";
import Image from "next/image";

const EditUserInfo = (props) => {
    //User values from profile api
    const { name, email, mobile, img, isVerifiedEmail, isVerifiedMobile } =
        useSelector((state) => state.getUserSlice);
    //State for profile picture
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicUrl, setProfilePicUrl] = useState(null);
    //States for Mobile
    const [showResendOtpMobile, setShowResendOtpMobile] = useState(false);
    const [showMobileTimer, setShowMobileTimer] = useState(false);
    const [showMobileOtpInput, setShowMobileOtpInput] = useState(false);
    const [isMobileVarified, setIsMobileVarified] = useState(false);
    //States for Email
    const [showResendOtpEmail, setShowResendOtpEmail] = useState(false);
    const [showEmailTimer, setShowEmailTimer] = useState(false);
    const [showEmailOtpInput, setShowEmailOtpInput] = useState(false);
    const [isEmailVarified, setIsEmailVarified] = useState(false);
    //State for submit button
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const dispatch = useDispatch();

    //Schema for react hook form
    const SCHEMA = useMemo(() => {
        return yup.object().shape({
            fullName: yup
                .string()
                .required("Please enter full name")
                .matches(
                    /^[aA-zZ\s]+$/,
                    "Only alphabets are allowed for this field "
                ),
            mobile: yup
                .string()
                .required()
                .matches(/^[0-9]+$/, "Only numbers are allowed for this field ")
                .min(10, "Minimum 10 digits")
                .max(10, "Maximum 10 digits"),
            mobileOtp: showMobileOtpInput
                ? yup.string().required("OTP must be 4 digits.")
                : yup.string(),
            email: yup
                .string()
                .email("Invalid email format")
                .required("Please enter email"),
            emailOtp: showEmailOtpInput
                ? yup.string().required("OTP must be 4 digits.")
                : yup.string(),
        });
    }, [showMobileOtpInput, showEmailOtpInput]);

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors, dirtyFields },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(SCHEMA),
    });

    //Change mobile, email to verified or vice verse based on profile api
    useEffect(() => {
        setValue("fullName", name);
        setValue("email", email);
        setValue("mobile", mobile);
        setIsMobileVarified(isVerifiedMobile);
        setIsEmailVarified(isVerifiedEmail);
    }, [isVerifiedEmail, isVerifiedMobile, name, email, mobile, setValue]);

    //Set mobile, email to verified or vice versa based on user input
    useEffect(() => {
        if (dirtyFields.mobile) {
            setIsMobileVarified(false);
        } else if (isVerifiedMobile) {
            setIsMobileVarified(true);
        }
        if (dirtyFields.email) {
            setIsEmailVarified(false);
        } else if (isVerifiedEmail) {
            setIsEmailVarified(true);
        }
    }, [
        dirtyFields.mobile,
        isVerifiedMobile,
        dirtyFields.email,
        isVerifiedEmail,
    ]);

    //Set the disable functionality to submit button
    useEffect(() => {
        if (
            profilePic ||
            (dirtyFields.mobile && isMobileVarified) ||
            (dirtyFields.email && isEmailVarified) ||
            dirtyFields.fullName
        ) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
        if (dirtyFields.mobile && !isMobileVarified) {
            setIsButtonDisabled(true);
        }
        if (dirtyFields.email && !isEmailVarified) {
            setIsButtonDisabled(true);
        }
    }, [
        dirtyFields.mobile,
        dirtyFields.email,
        dirtyFields.fullName,
        profilePic,
        isMobileVarified,
        isEmailVarified,
    ]);

    //Mobile change handlers
    const getMobileOtpHandler = () => {
        const newMobile = getValues("mobile");

        setShowMobileTimer(true);
        axiosInstance
            .post(userEndpoints.getMobileOtp, {
                mobile: newMobile,
                countryCode: "+91",
            })
            .then((res) => {
                setShowMobileOtpInput(true);
                notify.successToast(res.data.message);
            })
            .catch((error) => {
                notify.errorToast(error.response.data.message);
            });

        setTimeout(() => {
            setShowResendOtpMobile(true);
            setShowMobileTimer(false);
        }, 5000);
    };
    const verifyMobileOptHandler = () => {
        const newMobile = getValues("mobile");
        const otp = getValues("mobileOtp");

        axiosInstance
            .post(userEndpoints.verifyMobileOtp, {
                mobile: newMobile,
                otp: +otp,
            })
            .then((res) => {
                notify.successToast(res.data.message);
                setShowResendOtpMobile(false);
                setShowMobileOtpInput(false);
                setShowMobileTimer(false);
                setIsMobileVarified(true);
            })
            .catch((error) => {
                notify.errorToast(error.response.data.message);
            });
    };

    //Email change handlers
    const getEmailOtpHandler = () => {
        const newEmail = getValues("email");

        setShowEmailTimer(true);
        axiosInstance
            .post(userEndpoints.getEmailOtp, { email: newEmail })
            .then((res) => {
                setShowEmailOtpInput(true);
                notify.successToast(res.data.message);
            })
            .catch((error) => {
                notify.errorToast(error.response.data.message);
            });

        setTimeout(() => {
            setShowResendOtpEmail(true);
            setShowEmailTimer(false);
        }, 5000);
    };
    const verifyEmailOptHandler = () => {
        const newEmail = getValues("email");
        const otp = getValues("emailOtp");

        axiosInstance
            .post(userEndpoints.verifyEmailOtp, {
                email: newEmail,
                otp: +otp,
            })
            .then((res) => {
                notify.successToast(res.data.message);
                setShowResendOtpEmail(false);
                setShowEmailOtpInput(false);
                setShowEmailTimer(false);
                setIsEmailVarified(true);
            })
            .catch((error) => {
                notify.errorToast(error.response.data.message);
            });
    };

    // Pro file picture Change
    const profilePicChangeHandler = (event) => {
        const profilePic = event.target.files[0];

        setProfilePic(profilePic);
        setProfilePicUrl(URL.createObjectURL(profilePic));
    };

    //Final form submit handler
    const onSubmitHandler = (data) => {
        const formData = new FormData();

        setIsLoading(true);
        formData.append("name", data.fullName);
        formData.append("email", data.email);
        formData.append("mobile", data.mobile);
        formData.append("countryCode", "+91");

        if (profilePic) {
            formData.append("image", profilePic);
        }

        axiosInstance
            .put(userEndpoints.updateProfile, formData)
            .then((res) => {
                setIsLoading(false);
                notify.successToast(res.data.message);
                props.onDoneClick();
                dispatch(getUserDetail());
                // router.push("/my-profile");
            })
            .catch((error) => {
                setIsLoading(false);
                // notify.errorToast(error.response.data.message);
            });
    };

    return (
        <div className="account-form-wrap">
            {isLoading && <LoaderUi />}
            <div className="form-wrap">
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="ltl-form-block">
                        <div
                            className="form-block add-profile edit"
                            style={{ position: "relative" }}
                        >
                            <input
                                type="file"
                                onChange={profilePicChangeHandler}
                                className="image-input"
                            />
                            {!img && !profilePicUrl ? (
                                // <img
                                //     src={imgPlaceholder.src}
                                //     alt="profile img"
                                // />
                                <Image
                                    src={imgPlaceholder.src}
                                    alt="profile img"
                                    priority
                                    width={126}
                                    height={126}
                                    title="profile-img"
                                />
                            ) : profilePicUrl ? (
                                // <img src={profilePicUrl} alt="profile img" />
                                <Image
                                    src={profilePicUrl}
                                    alt="profile img"
                                    priority
                                    width={126}
                                    height={126}
                                    title="profile-img"
                                />
                            ) : (
                                img && (
                                    <Image
                                        src={img}
                                        alt="profile img"
                                        priority
                                        width={126}
                                        height={126}
                                        title="profile-img"
                                    />
                                )
                                // <img src={img} alt="profile-img" />
                            )}
                        </div>
                        <div className="form-block">
                            <label className="input-label">Full Name</label>
                            <div className="error-field">
                                <input
                                    {...register("fullName")}
                                    className="form-control"
                                />
                                <span className="error-msg">
                                    {errors.fullName?.message}
                                </span>
                            </div>
                        </div>

                        <div className="form-block type-number">
                            <label className="input-label">Mobile</label>
                            <div className="form-group">
                                <div className="error-field">
                                    <input
                                        {...register("mobile")}
                                        className="form-control"
                                        type="number"
                                    />
                                    <span className="error-msg">
                                        {errors.mobile?.message}
                                    </span>
                                    {isMobileVarified ? (
                                        <span className="verified-number">
                                            Verified
                                        </span>
                                    ) : (
                                        (dirtyFields.mobile ||
                                            showResendOtpMobile) &&
                                        !errors.mobile &&
                                        !showMobileTimer && (
                                            <div className="otp-wrap signup-otp">
                                                <button
                                                    type="button"
                                                    className="send-otp"
                                                    aria-label="send otp"
                                                    role="button"
                                                    onClick={
                                                        getMobileOtpHandler
                                                    }
                                                >
                                                    {showResendOtpMobile
                                                        ? "Resend Otp"
                                                        : dirtyFields?.mobile
                                                        ? "Get OTP"
                                                        : ""}
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                                {showMobileTimer && <Timer />}
                            </div>
                            {showMobileOtpInput && (
                                <div
                                    className="form-group type-number"
                                    style={{
                                        marginTop: "26px",
                                        position: "relative",
                                    }}
                                >
                                    <div className="error-field">
                                        <input
                                            {...register("mobileOtp")}
                                            className="form-control"
                                            type="number"
                                        />
                                        <span className="error-msg">
                                            {errors.mobileOtp?.message}
                                        </span>
                                    </div>
                                    <div className="otp-wrap signup-otp">
                                        <button
                                            type="button"
                                            className="send-otp"
                                            aria-label="send otp"
                                            role="button"
                                            onClick={verifyMobileOptHandler}
                                        >
                                            Verify Otp
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="form-block">
                            <label className="input-label">Email</label>
                            <div className="form-group">
                                <div className="error-field">
                                    <input
                                        {...register("email")}
                                        className="form-control"
                                    />
                                    <span className="error-msg">
                                        {errors.email?.message}
                                    </span>
                                    {isEmailVarified ? (
                                        <span className="verified-number">
                                            Verified
                                        </span>
                                    ) : (
                                        (dirtyFields.email ||
                                            showResendOtpEmail) &&
                                        !errors.email &&
                                        !showEmailTimer && (
                                            <div className="otp-wrap signup-otp">
                                                <button
                                                    type="button"
                                                    className="send-otp"
                                                    onClick={getEmailOtpHandler}
                                                    aria-label="send otp"
                                                    role="button"
                                                >
                                                    {showResendOtpEmail
                                                        ? "Resend Otp"
                                                        : dirtyFields.email
                                                        ? "Get OTP"
                                                        : ""}
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                                {showEmailTimer && <Timer />}
                            </div>
                            {showEmailOtpInput && (
                                <div
                                    className="form-group"
                                    style={{
                                        marginTop: "26px",
                                        position: "relative",
                                    }}
                                >
                                    <div className="error-field">
                                        <input
                                            {...register("emailOtp")}
                                            className="form-control"
                                        />
                                        <span className="error-msg">
                                            {errors.emailOtp?.message}
                                        </span>
                                    </div>
                                    <div className="otp-wrap signup-otp">
                                        <button
                                            type="button"
                                            className="send-otp"
                                            onClick={verifyEmailOptHandler}
                                            aria-label="send otp"
                                            role="button"
                                        >
                                            Verify Otp
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isButtonDisabled}
                            className="form-btn"
                            aria-label="send otp"
                            role="button"
                        >
                            Done
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default EditUserInfo;
