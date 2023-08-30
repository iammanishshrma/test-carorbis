import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";

import { userLogin } from "@/shared/store/slices/checkLoginSlice";
import signInWithSocialMedia from "@/shared/utils/socialSignIn";
import "./SocialLogin.scss";
import { getWishList } from "@/shared/store/slices/wishlist/wishListActions";

const SocialLogin = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [navigateRoute, setNavigateRoute] = useState("/");

    useEffect(() => {
        const route = localStorage.getItem("navigateTo");
        if (route) {
            setNavigateRoute(route);
        }

        return () => {
            setTimeout(() => {
                localStorage.removeItem("navigateTo");
            }, 0);
        };
    }, []);

    const handleCallbackResponse = (response) => {
        const googleJwt = response.credential;
        const queryObject = {};

        const userObject = jwtDecode(googleJwt);
        queryObject["name"] = userObject.name;
        queryObject["email"] = userObject.email;
        queryObject["socialId"] = userObject.sub;
        queryObject["modeOfSignUp"] = "google";

        signInWithSocialMedia(queryObject, router, (token) => {
            dispatch(userLogin({ token }));
            dispatch(getWishList());
            setTimeout(() => {
                router.push(navigateRoute);
            }, 800);
        });
    };

    //Facebook Login
    useEffect(() => {
        window.fbAsyncInit = function () {
            FB.init({
                appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
                // appId: "758578365717574",
                cookie: true,
                xfbml: true,
                version: "v16.0",
            });

            FB.AppEvents.logPageView();
        };

        (function (d, s, id) {
            let js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    }, []);

    // function checkLoginState() {
    //     FB.getLoginStatus(function (response) {
    //         statusChangeCallback(response);
    //     });
    // }

    function getUserData() {
        FB.api("/me", { fields: "name,email, picture" }, (response) => {
            const payload = {
                email: response.email,
                socialId: response.id,
                name: response.name,
                modeOfSignUp: "facebook",
            };
            signInWithSocialMedia(payload, router, (token) => {
                dispatch(userLogin({ token }));
                dispatch(getWishList());
                setTimeout(() => {
                    router.push(navigateRoute);
                }, 800);
            });
        });
    }

    const googleLoginHandler = useGoogleLogin({
        onSuccess: (tokenResponse) => handleCallbackResponse(tokenResponse),
    });

    const fbLoginHandler = () => {
        //do the login
        FB.login(
            (response) => {
                if (response.authResponse) {
                    //user just authorized your app
                    // document.getElementById("loginBtn").style.display = "none";
                    getUserData();
                }
                console.log("facebookResponse", response);
            },
            { scope: "email,public_profile", return_scopes: true }
        );
    };

    return (
        <>
            <div className="media-login-wrapper">
                <h3>Continue with social accounts.</h3>
                <div className="social-login">
                    {/* <div
                        className="google-login-btn"
                        ref={googleLoginButtonRef}
                    /> */}
                    <GoogleLogin
                        type="icon"
                        onSuccess={(credentialResponse) => {
                            handleCallbackResponse(credentialResponse);
                        }}
                        onError={() => {
                            console.log("Login Failed");
                        }}
                    />
                    {/* <button
                        className="google"
                        onClick={googleLoginHandler}
                        aria-label="continue with google"
                        role="button"
                        type="button"
                    >
                        <i className="icon-google"></i>
                    </button> */}
                    <button
                        className="facebook"
                        onClick={fbLoginHandler}
                        aria-label="continue with facebook"
                        role="button"
                        type="button"
                    >
                        <i className="icon-fb"></i>
                    </button>
                </div>
            </div>
        </>
    );
};

export default SocialLogin;
