import React, { useEffect, useState, useRef } from "react";

import Link from "next/link";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import HeaderSignIn from "../HeaderSignIn/HeaderSignIn";
import HeaderGarage from "../HeaderGarage/HeaderGarage";
import Wishlist from "../Wishlist/Wishlist";
import { axiosInstance } from "@/shared/api/axios";
import { catalogEndPoints } from "@/shared/api/endpoints";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import "./NavBar.scss";
import { useWindowSize } from "@/shared/hooks/windowSize";

const Navigation = (props) => {
    const loginState = useSelector((state) => state.checkLoginSlice.isLoggedIn);
    const [activeAccount, setActiveAccount] = useState(false);
    const [windowSize] = useWindowSize();
    const [categoryList, setCategoryList] = useState(null);

    useEffect(() => {
        axiosInstance.post(catalogEndPoints.allCategoryList).then((res) => {
            setCategoryList(res.data.data);
        });
    }, []);

    // const toggleMegaMenu = (activeMenuId, subCategoryId) => {
    //     setActiveCategory(activeMenuId);
    //     setActiveSubcategory(subCategoryId);
    // };

    // const toggleSubMenu = (activeMenuId) => {
    //     setActiveSubcategory(activeMenuId);
    // };

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
                {windowSize <= 767 ? (
                    <MobileNav categoryList={categoryList} />
                ) : (
                    <DesktopNav categoryList={categoryList} />
                )}
                {/* <ul className="navigation naviagtion-mobile header-navigation">
                    {categoryList?.map((category) => {
                        return (
                            <li
                                key={category._id}
                                onMouseLeave={() => toggleMegaMenu()}
                            >
                                <Link
                                    onMouseEnter={() =>
                                        toggleMegaMenu(
                                            category._id,
                                            category?.subCategoryList?.[0]._id
                                        )
                                    }
                                    href=""
                                    aria-label="navigation data"
                                    className={
                                        activeCategory === category._id
                                            ? "active"
                                            : ""
                                    }
                                >
                                    {category.categoryName}
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
                                {activeCategory === category._id && (
                                    <div className="megamenu-wrap">
                                        <ul className="ltl-menu">
                                            {categoryList
                                                .find(
                                                    (cat) =>
                                                        cat._id ===
                                                        activeCategory
                                                )
                                                ?.subCategoryList?.map(
                                                    (subCategory) => {
                                                        return (
                                                            <li
                                                                key={
                                                                    subCategory._id
                                                                }
                                                                onMouseLeave={() =>
                                                                    toggleSubMenu()
                                                                }
                                                            >
                                                                <Link
                                                                    href="/product-listing"
                                                                    aria-label="navigation item"
                                                                    onMouseEnter={() =>
                                                                        toggleSubMenu(
                                                                            subCategory._id
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        subCategory.categoryName
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
                                                                {subCategory._id ===
                                                                    activeSubCategory && (
                                                                    <div className="rtl-menu">
                                                                        {subCategory?.subCategoryList?.map(
                                                                            (
                                                                                subSubCategory
                                                                            ) => {
                                                                                return (
                                                                                    <div
                                                                                        className="rtl-menu-wrap"
                                                                                        key={
                                                                                            subSubCategory._id
                                                                                        }
                                                                                    >
                                                                                        <h4>
                                                                                            {
                                                                                                subSubCategory.categoryName
                                                                                            }
                                                                                        </h4>
                                                                                        <ul>
                                                                                            <li>
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
                                                                                                    Static
                                                                                                    data
                                                                                                </Link>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </li>
                                                        );
                                                    }
                                                )}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul> */}
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
                                className="account-head list-nav"
                                onClick={handleAccount}
                            >
                                <Link
                                    href="/"
                                    className="sidebar-myaccount"
                                    aria-label="My Account"
                                    role="button"
                                >
                                    My Account
                                </Link>
                                <button className="arrow arrow-list">
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
                                </button>
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
export default Navigation;
