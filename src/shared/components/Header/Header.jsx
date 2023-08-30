import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "@/shared/hooks/windowSize";

import OfferHeader from "./OfferHeader/OfferHeader";
import SearchHeader from "./SearchHeader/SearchHeader";
import SearchHeaderPopup from "./SearchHeader/SearchHeaderPopup";
import HeaderSignIn from "./HeaderSignIn/HeaderSignIn";
import HeaderGarage from "./HeaderGarage/HeaderGarage";
import Wishlist from "./Wishlist/Wishlist";
import HeaderCart from "./HeaderCart/HeaderCart";
import Navigation from "./NavBar/Navigation";
import { isLoggedIn } from "@/shared/utils/auth";

import Logo from "@/shared/assets/images/Carorbis.svg";
import CrossBtn from "@/shared/assets/images/cross-btn.svg";
import "./Header.scss";

import { checkloginState } from "@/shared/store/slices/checkLoginSlice";
import { getUserDetail } from "@/shared/store/slices/getUserSlice";

import { getLanguageList } from "@/shared/store/slices/languageListSlice";
import { getSystemIp } from "@/shared/store/slices/systemIpSlice";
import Image from "next/image";
import { adminAxiosInstance } from "@/shared/api/axios";
import { adminEndPoints } from "@/shared/api/endpoints";
import { getWishList } from "@/shared/store/slices/wishlist/wishListActions";
import { CSSTransition } from "react-transition-group";

const Header = () => {
    const dispatch = useDispatch();
    const [windowSize] = useWindowSize();
    const [showSearch, setShowSearch] = useState(false);
    const [sticky, setSticky] = useState("");
    const [headerBanner, setHeaderBanner] = useState(null);
    const wishList = useSelector((state) => state.wishList.wishList);
    const [offer, setOffer] = useState(false);

    useEffect(() => {
        const localOfferState =
            typeof window !== "undefined"
                ? JSON.parse(sessionStorage.getItem("offerState"))
                : null;
        setOffer(localOfferState === null ? true : localOfferState);
    }, []);

    const closeOffer = () => {
        setOffer("hide");
        sessionStorage.setItem("offerState", false);
        setOffer(false);
    };

    useEffect(() => {
        const isUserLoggedIn = isLoggedIn();
        dispatch(checkloginState(isUserLoggedIn));
        if (isUserLoggedIn) {
            dispatch(getUserDetail());
            if (wishList?.length > 0) {
                wishList.forEach((element) => {
                    // dispatch(addToWishlist(element.productId));
                });
                localStorage.removeItem("wishList");
            }
            dispatch(getWishList());
        }
    }, [dispatch]);
    const [getToggle, setToggle] = useState(false);
    const ref = useRef();
    useEffect(() => {
        if (getToggle === true) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
        const checkIfClickedOutside = (e) => {
            if (ref.current === e.target) {
                setToggle(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [getToggle]);

    useEffect(() => {
        dispatch(getLanguageList());
        dispatch(getSystemIp());
    }, [dispatch]);

    useEffect(() => {
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };
    }, []);

    useEffect(() => {
        adminAxiosInstance
            .get(adminEndPoints.getOfferHeader)
            .then((res) => {
                if (res.data.data.length === 0) {
                    setOffer(false);
                }
                setHeaderBanner(res.data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const onGameItemClick = () => {
        setToggle(false);
    };

    const isSticky = () => {
        let scroll_position = window.scrollY;
        if (scroll_position > 100) {
            document.body.classList.add("is-sticky");
        } else {
            document.body.classList.remove("is-sticky");
        }
    };

    const toggleSearchHandler = () => {
        setShowSearch((prev) => !prev);
        document.body.classList.toggle("modal-open");
    };

    const classes = `header-section ${sticky} ${!offer ? "offer-hidden" : ""}`;

    return (
        <>
            <header className={classes} id={"header"}>
                <div
                    className={`header-desk-wrap ${
                        !offer ? "offer-closed" : ""
                    }`}
                    id="top-header"
                >
                    {headerBanner?.length > 0 && (
                        <OfferHeader
                            headerBanner={headerBanner[0]}
                            offer={offer}
                            closeOffer={closeOffer}
                        />
                    )}
                    <div className="primary-header">
                        <div className="container">
                            {/* SideBar in Header */}
                            <CSSTransition
                                in={getToggle}
                                timeout={200}
                                classNames="slide-in-left"
                                mountOnEnter
                                unmountOnExit
                            >
                                <div className="side-menu-wrap" ref={ref}>
                                    <button
                                        className="close-btn"
                                        onClick={() => setToggle(false)}
                                        aria-label="Close"
                                        role="button"
                                    >
                                        <img
                                            src={CrossBtn.src}
                                            alt="cross-icon"
                                        />
                                    </button>
                                    <div className="navigation-wrap">
                                        <Navigation
                                            onGameItemClick={onGameItemClick}
                                        />
                                    </div>
                                </div>
                            </CSSTransition>
                            <div className="search-wrap search-head-wrap mobile-search-header">
                                <div className="logo-wrap">
                                    <button
                                        className="hamburger"
                                        onClick={() => setToggle(true)}
                                        role="button"
                                        aria-label="open menu"
                                    >
                                        <span className="hamburgers"></span>
                                        <span className="hamburgers "></span>
                                        <span className="hamburgers"></span>
                                    </button>
                                    <div className="logo mobile-logo">
                                        <Link
                                            href="/"
                                            style={{ position: "relative" }}
                                            aria-label="Carorbis.com"
                                        >
                                            <Image
                                                priority
                                                src={Logo.src}
                                                height={20}
                                                width={97}
                                                alt="Carorbis.com"
                                                title="Carorbis.com - The only auto parts & accessories store you need."
                                            />
                                        </Link>
                                    </div>
                                </div>
                                <div
                                    className="search-text-box"
                                    onClick={toggleSearchHandler}
                                >
                                    <span className="search-placeholder">
                                        Search by part name, part number,
                                        vehicle, brands
                                    </span>
                                    <div className="search-icon">
                                        <input type="button" />
                                    </div>
                                </div>

                                <div
                                    className={`header-popup-wrap ${
                                        showSearch ? "search-header-mobile" : ""
                                    }`}
                                >
                                    <SearchHeader
                                        showSearch={showSearch}
                                        handleInputPopup={toggleSearchHandler}
                                        toggleSearchHandler={
                                            toggleSearchHandler
                                        }
                                    />
                                </div>

                                {windowSize
                                    ? windowSize < 767 && <HeaderCart />
                                    : null}
                            </div>
                            <div className="icons-wrap">
                                {windowSize
                                    ? windowSize > 767 && (
                                          <>
                                              <HeaderSignIn />
                                              <HeaderGarage />
                                              <Wishlist />
                                              <HeaderCart />
                                          </>
                                      )
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navigation-wrap">
                    <div className="container">
                        <Navigation />
                    </div>
                </div>
            </header>
        </>
    );
};
export default Header;
