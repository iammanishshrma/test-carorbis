import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

import "./HeaderSignIn.scss";
import Cookies from "js-cookie";

const DropdownValue = [
    { name: "Sign In", link: "/sign-in" },
    { name: "Sign Up", link: "/sign-up" },
    { name: "Account", link: "my-profile" },
    { name: "Orders", link: "my-orders" },
];

const HeaderSignIn = () => {
    const getUser = useSelector((state) => state.getUserSlice);
    const loginState = useSelector((state) => state.checkLoginSlice.isLoggedIn);
    const [initial, setInitial] = useState(false);
    const router = useRouter();
    // close dropdown on outside click
    const ref = useRef();
    useEffect(() => {
        const checkIfClickOutSide = (e) => {
            if (!ref.current.contains(e.target)) {
                setInitial(false);
            }
        };
        // Add clicked event
        document.addEventListener("click", checkIfClickOutSide);
        return () => {
            document.removeEventListener("click", checkIfClickOutSide);
        };
    }, [initial]);

    // const onDropChange = (e) => {
    //   setInitial(false);
    // };
    const handleDropdown = () => {
        // setInitial(!initial);
    };
    const logOutHandler = () => {
        localStorage.clear("authToken");
        Cookies.remove("authToken");
        // router.push("/sign-in");

        if (typeof window !== "undefined") {
            window.location.reload();
        }
    };
    return (
        <div className="signin-wrap icons-boxes mobile-wrap-account">
            <i className="icon-profile"></i>
            <span className="title login-user-name">
                Hello,&nbsp;
                {loginState ? (
                    <div className="login-username">
                        {getUser.name.split(" ")[0]}
                    </div>
                ) : (
                    <>Sign in</>
                )}
            </span>
            <div className="arrow-div" ref={ref}>
                <div
                    className="account-wrapper"
                    onMouseEnter={() => setInitial(true)}
                    onMouseLeave={() => setInitial(false)}
                >
                    <h3 onClick={handleDropdown}>My Account</h3>
                    <div
                        className={`menu-wrraper ${initial ? "menu-active" : ""
                            }`}
                    >
                        <ul className="account-menu account-list">
                            {loginState ? (
                                <>
                                    <li>
                                        <Link
                                            href="/my-profile"
                                            // href="/"
                                            className="nav-links"
                                            aria-label="Account"
                                        >
                                            Account
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/my-address"
                                            className="nav-links"
                                            aria-label="order"
                                        >
                                            My Addresses
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/my-orders"
                                            className="nav-links"
                                            aria-label="order"
                                        >
                                            Orders and returns
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/help-support"
                                            className="nav-links"
                                            aria-label="order"
                                        >
                                            Help and Support
                                        </Link>
                                    </li>
                                    <li className="logout-btn-wrp">
                                        <button
                                            className="nav-links"
                                            onClick={logOutHandler}
                                            aria-label="Logout"
                                            role="button"
                                        >
                                            Log Out
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="sign-in-list">
                                        <Link
                                            href="/sign-in"
                                            className="nav-links"
                                            aria-label="Login"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/sign-up"
                                            className="nav-links"
                                            aria-label="signup"
                                        >
                                            Signup
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HeaderSignIn;
