import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useSelector } from "react-redux";

import WishlistIcon from "@/shared/assets/images/like-unfill.svg";

import "./Wishlist.scss";

const Wishlist = () => {
    const isLoggedIn = useSelector((state) => state.checkLoginSlice.isLoggedIn);
    const list = useSelector((state) => state.wishList);

    return (
        <Link
            href={"/my-wishlist"}
            prefetch={false}
            className="wishlist-wrap icons-boxes"
            aria-label="Wishlist"
        >
            <div className="wishlist-icon" style={{ position: "relative" }}>
                <Image
                    src={WishlistIcon.src}
                    width={26}
                    height={24}
                    priority
                    alt="wishlist-icon"
                />
                {isLoggedIn && list?.wishList?.data?.length > 0 && (
                    <span className="wishlist-number"></span>
                )}
            </div>
            <span className="head-text">Wishlist</span>
        </Link>
    );
};
export default Wishlist;
