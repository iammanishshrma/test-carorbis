import React from "react";
import "../WishlistProductCard/WishlistProductCard.scss";
import Image from "next/image";
import Link from "next/link";
import "../Products/Products.scss";

import { removeFromWishlist } from "@/shared/store/slices/wishlist/wishListActions";
import { useDispatch, useSelector } from "react-redux";
import Rating from "react-rating";

const WishlistProductCard = ({ getData, imagePath }) => {
    const isLoggedIn = useSelector(
        (state) => state.checkLoginSlice?.isLoggedIn
    );

    const dispatch = useDispatch();

    const discountPercent = (
        ((getData.price - getData?.sellingPrice) / getData?.price) *
        100
    ).toFixed(2);

    //Remove from wishlist
    const removeFromWishlistHandler = (id) => {
        if (isLoggedIn) {
            dispatch(removeFromWishlist(id));
        }
    };

    return (
        <div className="product-wrap wishlist-wrp">
            <div className="card-head">
                <span
                    className={`stock-availablity ${
                        getData.quantity == 0
                            ? "out-of-stock"
                            : getData.message == "Only few left"
                            ? "few-left"
                            : ""
                    }`}
                >
                    {console.log(getData.message)}
                    {getData.message}
                </span>
                <button
                    type="button"
                    onClick={() => removeFromWishlistHandler(getData._id)}
                    className="delete-item"
                >
                    <i className="icon-delete"></i>
                </button>
            </div>
            <div className="product-image">
                <Link
                    href={`/${getData.categorySlug}/${getData.productSlug}`}
                    style={{ position: "relative" }}
                    aria-label="product image"
                    className="product-img-wrp"
                >
                    <Image
                        // sizes="100%"
                        // fill
                        src={`${imagePath.thumb}/${getData.defaultImage}`}
                        alt={getData.name}
                        width={251}
                        height={191}
                        title={getData.name}
                    />
                </Link>
            </div>
            <div className="product-content">
                <span className="brand-name">{getData.brand}</span>
                <p className="product-name">{getData.name}</p>
                <div className="rating-section rating-fix">
                    {/* {[...Array(5)].map((items, index) => {
                        return (
                            <div
                                key={index}
                                className={
                                    getData.rating <= index
                                        ? "transparent-star"
                                        : "colored-star"
                                }
                            ></div>
                        );
                    })} */}
                    <Rating
                        initialRating={getData.rating}
                        readonly
                        emptySymbol={<div className={"transparent-star"} />}
                        fullSymbol={<div className={"colored-star"} />}
                    />
                    {getData?.ratingCount !== 0 && (
                        <div className="rating-count">
                            ({getData?.ratingCount})
                        </div>
                    )}
                </div>
                <div className="product-discount">
                    <div className="price-wrap">
                        {getData.price > getData.sellingPrice && (
                            <span className="actual-price">
                                &#8377;{getData.price}
                            </span>
                        )}
                        <span className="discount-price">
                            &#8377;{getData.sellingPrice}
                        </span>
                    </div>
                    {discountPercent > 0 && (
                        <span className="discount-off">
                            {`(${discountPercent}% off)`}
                        </span>
                    )}
                </div>
                <button
                    className={`move-to-cart ${
                        getData.stock === "out of stock" ? "disabled" : ""
                    }`}
                >
                    MOVE TO CART
                </button>
            </div>
        </div>
    );
};

export default WishlistProductCard;
