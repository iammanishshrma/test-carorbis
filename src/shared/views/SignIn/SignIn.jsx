import React, { useEffect, useState } from "react";

import SignWithOtp from "@/shared/components/SignWithOtp/SignWithOtp";
import SignWithEmail from "@/shared/components/SignWithEmail/SignWithEmail";

import "./SignIn.scss";

const SignIn = () => {
    const [showEmail, setShowEMail] = useState(false);
    const [navigateTo, setNavigateTo] = useState("/");

    useEffect(() => {
        const navigateRoute = localStorage.getItem("navigateTo");
        if (navigateRoute) {
            setNavigateTo(navigateRoute);
        }

        return () => {
            setTimeout(() => {
                localStorage.removeItem("navigateTo");
            }, 0);
        };
    }, []);

    console.log("route", navigateTo);
    return (
        <section className="login login-screen">
            <div className="container">
                {showEmail ? (
                    <SignWithEmail
                        clickShow={setShowEMail}
                        navigateTo={navigateTo}
                    />
                ) : (
                    <SignWithOtp
                        clickShow={setShowEMail}
                        navigateTo={navigateTo}
                    />
                )}
            </div>
        </section>
    );
};

export default SignIn;
