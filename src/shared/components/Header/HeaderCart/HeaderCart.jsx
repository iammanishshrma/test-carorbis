import React from "react";

import Link from "next/link";

import CartIcon from "@/shared/assets/images/cart_icon_new.svg";
import "./HeaderCart.scss";
import Image from "next/image";
import { useSelector } from "react-redux";

const HeaderCart = () => {
    const isLoggedIn = useSelector((state) => state.checkLoginSlice.isLoggedIn);
    return (
        <Link
            href={"/my-cart"}
            prefetch={false}
            className="cart-wrap icons-boxes"
            aria-label="cart"
        >
            <div className="cart-icon">
                <span className="notifications">12</span>
                <div style={{ position: "relative" }}>
                    <Image
                        src={CartIcon.src}
                        width={26}
                        height={24}
                        priority
                        alt="cart-icon"
                    />
                </div>
                {/* <img src={CartIcon.src} alt="cart-icon" /> */}
            </div>
            <span className="head-text">Cart</span>
        </Link>
    );
};
export default HeaderCart;
