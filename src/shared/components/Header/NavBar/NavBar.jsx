import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import HeaderSignIn from "../HeaderSignIn/HeaderSignIn";
import HeaderGarage from "../HeaderGarage/HeaderGarage";
import Wishlist from "../Wishlist/Wishlist";
import "./NavBar.scss";
import { useWindowSize } from "@/shared/hooks/windowSize";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const NavigationBar = (props) => {
    const loginState = useSelector((state) => state.checkLoginSlice.isLoggedIn);
    const [showMenu, setShowMenu] = useState("");
    const [activeAccount, setActiveAccount] = useState(false);
    const [windowSize] = useWindowSize();
    const router = useRouter();

    const navData = [
        {
            heading: "Brands",
            data: {
                "Service Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Major Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                Brakes: [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Engine Parts",
                            "Suspension & Steering",
                            "Brakes",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Engine Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Suspension & Steering": [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                Transmission: [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Cooling & Heating": [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
            },
        },
        {
            heading: "Exterior",
            data: {
                "Service Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Major Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                Brakes: [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Engine Parts",
                            "Suspension & Steering",
                            "Brakes",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Engine Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Suspension & Steering": [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
            },
        },
        {
            heading: "Interior",
            data: {
                "Service Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Major Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                Brakes: [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Engine Parts",
                            "Suspension & Steering",
                            "Brakes",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Engine Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Suspension & Steering": [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
            },
        },
        {
            heading: "Bike Accesssories",
            data: {
                "Service Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Major Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                Brakes: [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Engine Parts",
                            "Suspension & Steering",
                            "Brakes",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Engine Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Suspension & Steering": [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                Transmission: [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Cooling & Heating": [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
            },
        },
        {
            heading: "Auto Detailing",
            data: {
                "Service Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Major Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                Brakes: [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Engine Parts",
                            "Suspension & Steering",
                            "Brakes",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Engine Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Suspension & Steering": [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
            },
        },
        {
            heading: "Riding Gear",
            data: {
                "Service Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Major Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                Brakes: [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Engine Parts",
                            "Suspension & Steering",
                            "Brakes",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Engine Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Suspension & Steering": [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
            },
        },
        {
            heading: "Repair",
            data: {
                "Service Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Major Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                Brakes: [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Engine Parts",
                            "Suspension & Steering",
                            "Brakes",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Engine Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Suspension & Steering": [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
            },
        },
        {
            heading: "Tools & Garage",
            data: {
                "Service Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Major Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                Brakes: [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Engine Parts",
                            "Suspension & Steering",
                            "Brakes",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Engine Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Suspension & Steering": [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
            },
        },
        {
            heading: "More",
            data: {
                "Service Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Major Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                Brakes: [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Engine Parts",
                            "Suspension & Steering",
                            "Brakes",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Engine Parts": [
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Brake Hydraulics",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
                "Suspension & Steering": [
                    {
                        subHeading: "Brake Friction",
                        subData: [
                            "Service Parts",
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                    {
                        subHeading: "Regular Service",
                        subData: [
                            "Brakes",
                            "Engine Parts",
                            "Suspension & Steering",
                            "Service Parts",
                            "Lubricants & Fluids",
                            "Body & Exhaust",
                        ],
                    },
                ],
            },
        },
    ];
    const [menuHolder, setMenuHolder] = useState();
    useEffect(() => {
        if (windowSize > 767) {
            setMenuHolder("Service Parts");
        }
    }, [windowSize]);
    const handleMenuOption = (heading) => {
        if (showMenu === heading) {
            setShowMenu("");
        } else {
            setShowMenu(heading);
        }
        props.onGameItemClick;
    };

    const handleAccount = () => {
        setActiveAccount((prev) => !prev);
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
        <>
            <nav className="navigation-links">
                {windowSize && windowSize <= 767 ? (
                    <ul className="navigation" style={{ paddingBottom: 0 }}>
                        <div className="icons-wrap">
                            {loginState ? (
                                <HeaderSignIn />
                            ) : (
                                <div className="login-wrp-mobile">
                                    <i className="icon-profile"></i>
                                    <ul>
                                        <li className="sign-in-list">
                                            <Link
                                                href="/sign-in"
                                                className="nav-links"
                                                aria-label="Login"
                                            >
                                                Login /
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/sign-up"
                                                className="nav-links"
                                                aria-label="Signup"
                                            >
                                                &nbsp;Signup
                                            </Link>
                                        </li>
                                    </ul>
                                    <i className="icon-arrow"></i>
                                </div>
                            )}

                            <HeaderGarage />
                            <Wishlist />
                        </div>
                    </ul>
                ) : null}
                <button
                    className="shop-all"
                    aria-label="Shop all"
                    role="button"
                >
                    Shop All
                </button>
                <ul className="navigation naviagtion-mobile header-navigation">
                    {navData.map((item, index) => {
                        return (
                            <li
                                key={index}
                                onMouseLeave={() => handleMenuOption()}
                            >
                                <Link
                                    onClick={() =>
                                        handleMenuOption(item.heading)
                                    }
                                    onMouseEnter={() =>
                                        handleMenuOption(item.heading)
                                    }
                                    href=""
                                    className={
                                        showMenu === item.heading
                                            ? "active"
                                            : ""
                                    }
                                    aria-label="navigation data"
                                >
                                    {item.heading}
                                    <span className="arrow arrow-list">
                                        <svg
                                            width="13"
                                            height="8"
                                            viewBox="0 0 13 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1.25 1.5L6.25 6.5L11.25 1.5"
                                                stroke="#111E6C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                                {showMenu === item.heading ? (
                                    <div className="megamenu-wrap">
                                        <ul className="ltl-menu">
                                            {Object.keys(item.data).map(
                                                (element, index) => {
                                                    return (
                                                        <>
                                                            {windowSize >
                                                                767 ? (
                                                                <li key={index}>
                                                                    <Link
                                                                        onClick={
                                                                            props.onGameItemClick
                                                                        }
                                                                        onMouseEnter={() =>
                                                                            setMenuHolder(
                                                                                element
                                                                            )
                                                                        }
                                                                        href="/product-listing"
                                                                        aria-label="navigation item"
                                                                    >
                                                                        {
                                                                            element
                                                                        }
                                                                        <span className="arrow">
                                                                            <svg
                                                                                width="13"
                                                                                height="8"
                                                                                viewBox="0 0 13 8"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path
                                                                                    d="M1.25 1.5L6.25 6.5L11.25 1.5"
                                                                                    stroke="#111E6C"
                                                                                    strokeWidth="2"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                />
                                                                            </svg>
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                            ) : (
                                                                <li
                                                                    key={index}
                                                                    className={`${menuHolder ===
                                                                        element
                                                                        ? "active-list"
                                                                        : ""
                                                                        }`}
                                                                >
                                                                    <Link
                                                                        onClick={() =>
                                                                            setMenuHolder(
                                                                                element
                                                                            )
                                                                        }
                                                                        href=""
                                                                        aria-label="navigation item"
                                                                    // onMouseEnter={() =>
                                                                    //     setMenuHolder(
                                                                    //         element
                                                                    //     )
                                                                    // }
                                                                    // href="/product-listing"
                                                                    >
                                                                        {
                                                                            element
                                                                        }
                                                                        <span className="arrow">
                                                                            <svg
                                                                                width="13"
                                                                                height="8"
                                                                                viewBox="0 0 13 8"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path
                                                                                    d="M1.25 1.5L6.25 6.5L11.25 1.5"
                                                                                    stroke="#111E6C"
                                                                                    strokeWidth="2"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                />
                                                                            </svg>
                                                                        </span>
                                                                    </Link>
                                                                    {menuHolder ===
                                                                        element && (
                                                                            <div className="rtl-menu">
                                                                                {item.data?.[
                                                                                    menuHolder
                                                                                ]?.map(
                                                                                    (
                                                                                        value,
                                                                                        index
                                                                                    ) => {
                                                                                        return (
                                                                                            <div
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                className="rtl-menu-wrap"
                                                                                            >
                                                                                                <h4>
                                                                                                    {
                                                                                                        value.subHeading
                                                                                                    }
                                                                                                </h4>
                                                                                                <ul>
                                                                                                    {value.subData.map(
                                                                                                        (
                                                                                                            item,
                                                                                                            index
                                                                                                        ) => {
                                                                                                            return (
                                                                                                                <li
                                                                                                                    key={
                                                                                                                        index
                                                                                                                    }
                                                                                                                >
                                                                                                                    <span className="arrow">
                                                                                                                        <svg
                                                                                                                            width="13"
                                                                                                                            height="8"
                                                                                                                            viewBox="0 0 13 8"
                                                                                                                            fill="none"
                                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                                        >
                                                                                                                            <path
                                                                                                                                d="M1.25 1.5L6.25 6.5L11.25 1.5"
                                                                                                                                stroke="#111E6C"
                                                                                                                                strokeWidth="2"
                                                                                                                                strokeLinecap="round"
                                                                                                                                strokeLinejoin="round"
                                                                                                                            />
                                                                                                                        </svg>
                                                                                                                    </span>
                                                                                                                    <Link
                                                                                                                        href="/"
                                                                                                                        aria-label="navigation item"
                                                                                                                    >
                                                                                                                        {
                                                                                                                            item
                                                                                                                        }
                                                                                                                    </Link>
                                                                                                                </li>
                                                                                                            );
                                                                                                        }
                                                                                                    )}
                                                                                                </ul>
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                </li>
                                                            )}
                                                        </>
                                                    );
                                                }
                                            )}
                                        </ul>
                                        {menuHolder && windowSize > 767 && (
                                            <div className="rtl-menu">
                                                {item.data?.[menuHolder]?.map(
                                                    (value, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="rtl-menu-wrap"
                                                            >
                                                                <h4>
                                                                    {
                                                                        value.subHeading
                                                                    }
                                                                </h4>
                                                                <ul>
                                                                    {value.subData.map(
                                                                        (
                                                                            item,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <li
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                >
                                                                                    <span className="arrow">
                                                                                        <svg
                                                                                            width="13"
                                                                                            height="8"
                                                                                            viewBox="0 0 13 8"
                                                                                            fill="none"
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                        >
                                                                                            <path
                                                                                                d="M1.25 1.5L6.25 6.5L11.25 1.5"
                                                                                                stroke="#111E6C"
                                                                                                strokeWidth="2"
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                            />
                                                                                        </svg>
                                                                                    </span>
                                                                                    <Link
                                                                                        href="/"
                                                                                        aria-label="navigation item"
                                                                                    >
                                                                                        {
                                                                                            item
                                                                                        }
                                                                                    </Link>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    )}
                                                                </ul>

                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                            </li>
                        );
                    })}
                </ul>
                <ul className="navigation naviagtion-mobile bottom-navigation">
                    {!loginState ? (
                        <li>
                            <Link href={"/sign-in"} area-label="sign in">
                                My Account
                            </Link>
                        </li>
                    ) : (
                        <li
                            className={`sidemenu-accont ${activeAccount ? "active-account" : ""
                                }`}
                        >
                            <div
                                className="account-head"
                                onClick={handleAccount}
                            >
                                <button
                                    className="sidebar-myaccount"
                                    aria-label="My Account"
                                    role="button"
                                >
                                    My Account
                                </button>
                                <span className="arrow arrow-list">
                                    <svg
                                        width="13"
                                        height="8"
                                        viewBox="0 0 13 8"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.25 1.5L6.25 6.5L11.25 1.5"
                                            stroke="#111E6C"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <ul
                                className={`account-menu-list ${activeAccount ? "active" : ""
                                    }`}
                            >
                                <li>
                                    <Link href="" aria-label="Orders & Returns">
                                        Orders & Returns
                                    </Link>
                                </li>
                                <li>
                                    <Link href="" aria-label="My Addresses">
                                        My Addresses
                                    </Link>
                                </li>
                                <li>
                                    <Link href="" aria-label="My Profile">
                                        My Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link href="" aria-label="Notifications">
                                        Notifications
                                    </Link>
                                </li>
                                <li>
                                    <Link href="" aria-label="Help & Support">
                                        Help & Support
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href=""
                                        aria-label="Login & Secuirity"
                                    >
                                        Login & Secuirity
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    )}

                    <li>
                        <Link href="/" aria-label="Wishlist">
                            Wishlist
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="About Us">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="Blog">
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="Contact Us">
                            Contact Us
                        </Link>
                    </li>
                </ul>
                {loginState ? (
                    <button
                        className="sidebar-logout"
                        onClick={logOutHandler}
                        aria-label="Logout"
                        role="button"
                    >
                        <i className="icon-logout"></i>Logout
                    </button>
                ) : null}
            </nav>
        </>
    );
};
export default NavigationBar;
