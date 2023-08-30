import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";

import loadable from "@loadable/component";
const ScrollTopLoadable = loadable(() => import("../ScrollToTop/ScrollToTop"));
import FooterLogo from "@/shared/assets/images/footer-logo.svg";
import "./Footer.scss";
import { adminAxiosInstance, axiosInstance } from "@/shared/api/axios";
import { adminEndPoints, cmsEndPoints } from "@/shared/api/endpoints";
import { notify } from "@/shared/utils/notifyToast";
const array = require("lodash/array");

const SCHEMA = yup.object().shape({
    email: yup.string().required("Enter email to register.").email(),
});

const Footer = () => {
    const [activeAccordions, setActiveAccordions] = useState([]);
    const [firstBlock, setFirstBlock] = useState(null);
    const [secondBlock, setSecondBlock] = useState(null);
    const [thirdBlock, setThirdBlock] = useState(null);
    const [fourthBlock, setFourthBlock] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(SCHEMA),
    });

    useEffect(() => {
        axiosInstance
            .post(cmsEndPoints.getStaticBlocks, {
                identifier: "sellWithUs",
                languageId: Cookies.get("langId"),
            })
            .then((res) => {
                setFirstBlock(res.data.data[0]);
            });
        axiosInstance
            .post(cmsEndPoints.getStaticBlocks, {
                identifier: "usefullLinks",
                languageId: Cookies.get("langId"),
            })
            .then((res) => {
                setSecondBlock(res.data.data[0]);
            });
        axiosInstance
            .post(cmsEndPoints.getStaticBlocks, {
                identifier: "getToKnowUS",
                languageId: Cookies.get("langId"),
            })
            .then((res) => {
                setThirdBlock(res.data.data[0]);
            });
        axiosInstance
            .post(cmsEndPoints.getStaticBlocks, {
                identifier: "getInTouch",
                languageId: Cookies.get("langId"),
            })
            .then((res) => {
                setFourthBlock(res.data.data[0]);
            });
    }, []);
    const submitHandler = (data) => {
        adminAxiosInstance
            .post(adminEndPoints.addNewsLetter, data)
            .then((res) => {
                notify.successToast(res.data.message);
                reset();
            })
            .catch((error) => {
                notify.errorToast(error?.response?.data?.message);
                console.error(error);
            });
    };

    const toggleAccordionHandler = (item) => {
        setActiveAccordions((prev) => {
            if (prev.includes(item)) {
                return array.without(prev, item);
            } else {
                return [...prev, item];
            }
        });
    };

    return (
        <section className="footer" id={"footer"}>
            <div className="container">
                <div className="menu-wrapper">
                    <div className="footer-list">
                        <div className="accordion-footer">
                            <h5
                                onClick={() => {
                                    toggleAccordionHandler("sellWithUs");
                                }}
                            >
                                {firstBlock?.title}
                            </h5>
                            <span
                                className={`icon-arrow ${
                                    activeAccordions.includes("sellWithUs")
                                        ? "active"
                                        : ""
                                }`}
                            ></span>
                        </div>
                        <div
                            className={`list-wrap ${
                                activeAccordions.includes("sellWithUs")
                                    ? "active"
                                    : ""
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: firstBlock?.content,
                            }}
                        />
                    </div>
                    <div className="footer-list">
                        <div className="accordion-footer">
                            <h5
                                onClick={() => {
                                    toggleAccordionHandler("useFullLinks");
                                }}
                            >
                                {secondBlock?.title}
                            </h5>
                            <span
                                className={`icon-arrow ${
                                    activeAccordions.includes("useFullLinks")
                                        ? "active"
                                        : ""
                                }`}
                            ></span>
                        </div>
                        <div
                            className={`list-wrap ${
                                activeAccordions.includes("useFullLinks")
                                    ? "active"
                                    : ""
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: secondBlock?.content,
                            }}
                        />
                    </div>
                    <div className="footer-list">
                        <div className="accordion-footer">
                            <h5
                                onClick={() => {
                                    toggleAccordionHandler("getToKnowUs");
                                }}
                            >
                                {thirdBlock?.title}
                            </h5>
                            <span
                                className={`icon-arrow ${
                                    activeAccordions.includes("getToKnowUs")
                                        ? "active"
                                        : ""
                                }`}
                            ></span>
                        </div>
                        <div
                            className={`list-wrap ${
                                activeAccordions.includes("getToKnowUs")
                                    ? "active"
                                    : ""
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: thirdBlock?.content,
                            }}
                        />
                    </div>
                    <div className="footer-list">
                        <div className="accordion-footer">
                            <h5
                                onClick={() => {
                                    toggleAccordionHandler("getInTouch");
                                }}
                            >
                                {fourthBlock?.title}
                            </h5>
                            <span
                                className={`icon-arrow ${
                                    activeAccordions.includes("getInTouch")
                                        ? "active"
                                        : ""
                                }`}
                            ></span>
                        </div>
                        <div
                            className={`list-wrap ${
                                activeAccordions.includes("getInTouch")
                                    ? "active"
                                    : ""
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: fourthBlock?.content,
                            }}
                        />
                    </div>
                    <div className="footer-list mobile-policy-footer">
                        <div className="accordion-footer">
                            <h5
                                onClick={() => {
                                    toggleAccordionHandler("policyInfo");
                                }}
                            >
                                Policy Info
                            </h5>
                            <span
                                className={`icon-arrow ${
                                    activeAccordions.includes("policyInfo")
                                        ? "active"
                                        : ""
                                }`}
                            ></span>
                        </div>
                        <div
                            className={`list-wrap ${
                                activeAccordions.includes("policyInfo")
                                    ? "active"
                                    : ""
                            }`}
                        >
                            <ul>
                                <li>
                                    <Link
                                        href="/terms-and-conditions"
                                        className="nav-link"
                                        aria-label="Terms of use"
                                    >
                                        Terms Of Use
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/privacy-policy"
                                        className="nav-link"
                                        aria-label="privacy policy"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/privacy-policy"
                                        className="nav-link"
                                        aria-label="Accessibility Statement"
                                    >
                                        Accessibility Statement
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-list news-letter">
                        <h5>Newsletter</h5>
                        <p>
                            To stay up to date on our promotions, discounts,
                            sales,special offers and more.
                        </p>
                        <div className="email-wrap">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="form-footer">
                                    <input
                                        {...register("email")}
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email address"
                                    />
                                    <button
                                        type="submit"
                                        className="btn-submit"
                                        aria-label="submit"
                                        role="button"
                                    >
                                        Submit
                                    </button>
                                </div>
                                {errors.email && (
                                    <span className="error mail-error">
                                        {errors.email.message}
                                    </span>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
                <div className="sub-footer">
                    <div className="sub-content">
                        <Link href="/" className="footer-logo">
                            <img src={FooterLogo.src} alt="footer-logo" />
                        </Link>
                        <div className="social-content">
                            <h5>Follow Us On</h5>
                            <ul className="social-wrapper">
                                <li>
                                    <a
                                        target="_blank"
                                        href="https://www.facebook.com/"
                                        aria-label="facebook icon"
                                    >
                                        <i className="icon-fb social-icon"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        href="https://www.twitter.com/"
                                        aria-label="twitter icon"
                                    >
                                        <i className="icon-twitter social-icon"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        href="https://www.youtube.com/"
                                        aria-label="youtube icon"
                                    >
                                        <i className="icon-youtube social-icon"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        href="https://www.linkedin.com/"
                                        aria-label="linkedin icon"
                                    >
                                        <i className="icon-linkedin social-icon"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        href="https://www.instagram.com/"
                                        aria-label="instagram icon"
                                    >
                                        <i className="icon-insta social-icon"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="policy-wrapper">
                        <span className="copyright">
                            Copyright © {new Date().getFullYear()} carorbis. All
                            rights reserved.
                        </span>
                        <ul className="desktop-conditions terms-conditions-wrp">
                            <li>
                                <Link
                                    href="/terms-and-conditions"
                                    className="nav-link"
                                    aria-label="Terms of use"
                                >
                                    Terms Of Use
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="nav-link"
                                    aria-label="Privacy Policy"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                        <ul className="statement access-statement">
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="nav-link"
                                    aria-label="Accessibility Statement"
                                >
                                    Accessibility Statement
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <ScrollTopLoadable />
        </section>
    );
};

export default Footer;
