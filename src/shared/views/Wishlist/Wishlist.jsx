import React from "react";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import WishlistProductCard from "@/shared/components/WishlistProductCard/WishlistProductCard";
import LoaderUi from "@/shared/components/LoaderUi/LoaderUi";

import "./Wishlist.scss";
import "../../components/MyOrderList/MyOrderList.scss";

const Wishlist = () => {
    const wishList = useSelector((state) => state.wishList);
    const router = useRouter();

    return (
        <>
            {wishList?.loading && <LoaderUi />}
            <div className="wishlist-page-wrp">
                <div className="container">
                    <div className="ltl-head">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="back-link"
                        >
                            <i className="icon-bck"></i>
                        </button>
                        <div className="wishlist-head">
                            <h3>Wishlist</h3>
                            {wishList?.wishList?.data?.length === 0 ? (
                                <p>There are no products in your wishlist.</p>
                            ) : (
                                <p>{wishList?.wishList?.data?.length} items</p>
                            )}
                        </div>
                    </div>
                    <div className="wishlist-body">
                        {wishList?.wishList?.data?.map((item) => {
                            return (
                                <WishlistProductCard
                                    key={item._id}
                                    getData={item}
                                    imagePath={wishList.wishList.imageUrls}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Wishlist;
