import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../AccountForm/AccountForm.scss";
import "./SupportForm.scss";

const SupportForm = () => {
    let schema = yup.object().shape({
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
        email: yup
            .string()
            .email("Invalid email format")
            .required("Please enter email"),
        subject: yup.string().required("Please enter subject"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            fullName: "Andrew",
            mobile: "7555097801",
            email: "robert@yopmail.com",
            subject: "type subject",
        },
        resolver: yupResolver(schema),
    });
    const onSubmitHandler = (data) => {
        // console.log({ data });
        reset();
    };
    return (
        <div className="account-form-wrap support-form-wrap">
            <div className="form-wrap">
                <h2>Help & Support</h2>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="ltl-form-block">
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
                            <div className="error-field">
                                <input
                                    {...register("mobile")}
                                    className="form-control"
                                    type="number"
                                />
                                <span className="error-msg">
                                    {errors.mobile?.message}
                                </span>
                            </div>
                        </div>
                        <div className="form-block">
                            <label className="input-label">Email</label>
                            <div className="error-field">
                                <input
                                    {...register("email")}
                                    className="form-control"
                                    type="email"
                                />
                                <span className="error-msg">
                                    {errors.email?.message}
                                </span>
                            </div>
                        </div>
                        <div className="form-block">
                            <label className="input-label">Subject</label>
                            <div className="error-field">
                                <input
                                    {...register("subject")}
                                    className="form-control"
                                />
                                <span className="error-msg">
                                    {errors.subject?.message}
                                </span>
                            </div>
                        </div>
                        <div className="form-block textarea-wrapper">
                            <div className="text-area-element form-control">
                                <textarea
                                    rows="5"
                                    cols="0"
                                    placeholder="Type here"
                                    className="text-area"
                                ></textarea>
                            </div>
                            <span className="min-word">800 words maximum</span>
                        </div>
                        <button type="submit" className="form-btn" aria-label="Submit" role="button">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default SupportForm;
