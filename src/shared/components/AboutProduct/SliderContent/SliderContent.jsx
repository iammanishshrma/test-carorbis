import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import { Dropdown } from "primereact/dropdown";

import { axiosInstance } from "@/shared/api/axios";
import { catalogEndPoints } from "@/shared/api/endpoints";
import "./SliderContent.scss";
import "../../ClientTestimonial/ClientTestimonial.scss";
import {
    removeFromWishlist,
    addToWishlist,
} from "@/shared/store/slices/wishlist/wishListActions";
import Compatibility from "./Compatibility";
import LoaderUi from "@/shared/components/LoaderUi/LoaderUi";
import Rating from "react-rating";

const SliderContent = (props) => {
    const isLoggedIn = useSelector(
        (state) => state.checkLoginSlice?.isLoggedIn
    );
    const userId = useSelector((state) => state.getUserSlice?.id);
    const [isClient, setIsClient] = useState(false);
    const wishListData = useSelector((state) => state.wishList);
    const {
        productDetails,
        attributes,
        productInfo,
        attributeChangeHandler,
        selectedAttributes,
    } = props;
    const [sliderActive, setSliderActive] = useState(false);
    let units = Number(10);
    const [qty, setQty] = useState(1);
    const [initial, setInitial] = useState(false);
    const dispatch = useDispatch();
    const [showOtherSeller, setShowOtherSeller] = useState(false);
    const wishlistId = wishListData?.wishList?.data?.find(
        (item) => item.productId === productDetails?._id
    )?._id;
    const router = useRouter();
    const [otherSeller, setOtherSellers] = useState(null);
    const [selectedSeller, setSelectedSeller] = useState(null);

    const ref = useRef();

    useEffect(() => {
        axiosInstance
            .post(catalogEndPoints.getOtherSellers, {
                productSlug: router.query.product,
            })
            .then((res) => {
                const sellers = res.data.data;
                const otherSellers = sellers.filter(
                    (item) =>
                        item.vendorId !== productDetails?.inventory?.vendorId
                );
                const seller = sellers.find(
                    (item) =>
                        item.vendorId === productDetails?.inventory?.vendorId
                );
                if (otherSellers?.length > 0) {
                    setOtherSellers(otherSellers);
                }
                if (seller) {
                    setSelectedSeller(seller);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [productDetails?.inventory?.vendorId, router.query.product]);

    useEffect(() => {
        setIsClient(true);
    }, [wishListData.message]);

    const manufactureDetails = [
        {
            heading: "Part Number",
            value: productDetails?.partNumber,
        },
        {
            heading: "Class",
            value: productDetails?.shippingClass,
        },
    ];
    const addQty = (e) => {
        setQty(e);
        setInitial(false);
    };
    const handleDropdown = () => {
        setInitial(!initial);
    };

    // close dropdown on outside click
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

    const handleSlider = () => {
        setSliderActive(!sliderActive);
    };

    //Open more seller options
    const moreSellerClickHandler = () => {
        setShowOtherSeller((prev) => !prev);
    };

    //Add to wishlist
    const addToWishlistHandler = (productid, sku, vendorId) => {
        if (isLoggedIn) {
            dispatch(addToWishlist({ productid, sku, vendorId }));
        } else {
            router.push("/sign-in");
        }
    };

    //Remove from wishlist
    const removeFromWishlistHandler = (id) => {
        if (isLoggedIn) {
            dispatch(removeFromWishlist(id));
        }
    };

    //@param vendorId, productId, userId, sku, quantity required to add product to cart
    const addToCartHandler = (vendorId, productId, userId, sku, qty) => {
        if (!isLoggedIn || !userId) {
            return router.push("/sign-in");
        }
        const payload = {
            productId,
            vendorId,
            userId,
            sku,
            qty,
        };
        return console.log("payload", payload);
        //TODO: will implement add to cart api later
        axiosInstance
            .post(catalogEndPoints.addToCart, payload)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => console.log(error.response.data));
    };

    return (
        <>
            {wishListData?.loading && <LoaderUi />}
            <div className="desc-wrap">
                <div className="slider-rgt">
                    <div className="desc-detail desktop-border">
                        <h2>{productInfo?.name}</h2>
                        <h3>
                            <Link href="/" aria-label="brand name">
                                {productDetails?.brandData?.[0].name}
                            </Link>
                        </h3>
                        <div className="rating-column">
                            {/* {[...Array(5)].map((items, index1) => {
                                return (
                                    <div
                                        key={index1}
                                        className={
                                            productDetails?.rating <= index1
                                                ? "transparent-star"
                                                : "colored-star"
                                        }
                                    ></div>
                                );
                            })} */}
                            <Rating
                                initialRating={productDetails?.rating}
                                readonly
                                emptySymbol={
                                    <div className={"transparent-star"} />
                                }
                                fullSymbol={<div className={"colored-star"} />}
                            />
                            <a href="#reviews" className="rating-count">
                                ({productDetails?.ratingCount} Reviews)
                            </a>
                        </div>
                        <div className="price-wrap">
                            <div className="updated-price">
                                <div className="price-wrap-actual">
                                    {+productInfo?.price >
                                        +productInfo?.sellingPrice && (
                                        <span className="actual-price">
                                            <span className="cut-price">
                                                &#8377;{productInfo?.price}
                                            </span>
                                        </span>
                                    )}
                                    <span className="discount-price">
                                        &#8377;{productInfo?.sellingPrice}
                                    </span>
                                </div>
                                {+productInfo?.price >
                                    +productInfo?.sellingPrice && (
                                    <>
                                        {/* <span className="separator-price"></span> */}
                                        <span className="discount-percent discount-percent-seperator">
                                            (
                                            {(
                                                100 -
                                                (productInfo?.sellingPrice /
                                                    productInfo?.price) *
                                                    100
                                            ).toFixed(2)}
                                            % Off)
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className="discount-rgt">
                                <span className="discount-desc">
                                    Inclusive of all taxes
                                </span>
                            </div>
                        </div>
                        {productInfo?.quantity !== 0 ? (
                            <div className="stock-wrap">
                                In Stock
                                <span className="stock-unit">
                                    ({productInfo?.quantity}
                                    &nbsp; units left)
                                </span>
                            </div>
                        ) : (
                            <div
                                className="stock-wrap"
                                style={{ color: "#CC0033" }}
                            >
                                Out of stock
                            </div>
                        )}
                    </div>
                    <div className="desc-detail desc-detail-border desktop-border compatiblity-head-wrp">
                        <div className="fit-wrap">
                            <div className="compatiblity-wrap">
                                {productDetails?.isUniversalFit ? (
                                    <>
                                        <h3>Compatibility</h3>
                                        <div className="universal-fit">
                                            <i className="fit-icon"></i>
                                            {/* <span className="green-circle">
                                                <span className="tick-mark"></span>
                                            </span> */}
                                            <div className="add-item">
                                                <h4>Universal Fit</h4>
                                                <p>Works with all vehicles</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Compatibility
                                            productId={productDetails?._id}
                                            sliderActive={sliderActive}
                                            handleSlider={handleSlider}
                                        />
                                    </>
                                )}
                            </div>
                            <div className="product-wishlist">
                                {attributes?.length > 0 && (
                                    <div className="product-varient product-variety">
                                        {attributes?.map((attribute) => {
                                            if (
                                                attribute?.attributeType ===
                                                "color"
                                            ) {
                                                return (
                                                    <React.Fragment
                                                        key={
                                                            attribute.attributeName
                                                        }
                                                    >
                                                        <div className="color-wrap color-main-wrp">
                                                            <span className="color-head main-color-head">
                                                                {
                                                                    attribute.attributeName
                                                                }
                                                                :&nbsp;
                                                                <div className="color-value-text">
                                                                    {
                                                                        selectedAttributes?.[
                                                                            attribute
                                                                                .id
                                                                        ]
                                                                    }
                                                                </div>
                                                            </span>
                                                            <span className="color-value">
                                                                {
                                                                    selectedAttributes?.[
                                                                        attribute
                                                                            .attributeName
                                                                    ]
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="item-wrap">
                                                            {attribute?.value.map(
                                                                (variant) => {
                                                                    return (
                                                                        <div
                                                                            className="radio-wrapper"
                                                                            key={
                                                                                variant
                                                                            }
                                                                        >
                                                                            <input
                                                                                type="radio"
                                                                                name="color"
                                                                                onChange={(
                                                                                    event
                                                                                ) =>
                                                                                    attributeChangeHandler(
                                                                                        event,
                                                                                        attribute.id
                                                                                    )
                                                                                }
                                                                                value={
                                                                                    variant
                                                                                }
                                                                                checked={
                                                                                    selectedAttributes?.[
                                                                                        attribute
                                                                                            .id
                                                                                    ] ===
                                                                                    variant
                                                                                }
                                                                            />
                                                                            <span
                                                                                className="custom-radio"
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        variant,
                                                                                }}
                                                                            ></span>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </React.Fragment>
                                                );
                                            } else if (
                                                attribute?.attributeType ===
                                                "size"
                                            ) {
                                                const options =
                                                    attribute.value.map(
                                                        (item) => {
                                                            return {
                                                                value: item,
                                                                id: attribute.id,
                                                            };
                                                        }
                                                    );
                                                return (
                                                    <React.Fragment
                                                        key={
                                                            attribute.attributeName
                                                        }
                                                    >
                                                        <div className="size-select-wrp">
                                                            <div className="color-wrap">
                                                                <span className="color-head">
                                                                    {
                                                                        attribute.attributeName
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="select-wrapper">
                                                                <Dropdown
                                                                    key={
                                                                        attribute.attributeName
                                                                    }
                                                                    value={
                                                                        selectedAttributes?.[
                                                                            attribute
                                                                                .id
                                                                        ]
                                                                    }
                                                                    options={
                                                                        options
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        attributeChangeHandler(
                                                                            event,
                                                                            attribute.id
                                                                        )
                                                                    }
                                                                    optionLabel="value"
                                                                    placeholder="Select size"
                                                                    appendTo="self"
                                                                    className="car-model-wrapper"
                                                                />
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                );
                                            } else {
                                                return (
                                                    <React.Fragment
                                                        key={
                                                            attribute.attributeName
                                                        }
                                                    >
                                                        <div className="color-wrap color-variety">
                                                            <span className="color-head">
                                                                {
                                                                    attribute.attributeName
                                                                }
                                                                :&nbsp;
                                                            </span>
                                                        </div>
                                                        <div className="item-wrap  item-variety">
                                                            {attribute.value.map(
                                                                (variant) => {
                                                                    return (
                                                                        <div
                                                                            className="radio-wrapper other-attributes additional-attribute"
                                                                            key={
                                                                                variant
                                                                            }
                                                                        >
                                                                            <input
                                                                                type="radio"
                                                                                name={
                                                                                    attribute.attributeName
                                                                                }
                                                                                onChange={(
                                                                                    event
                                                                                ) =>
                                                                                    attributeChangeHandler(
                                                                                        event,
                                                                                        attribute.id
                                                                                    )
                                                                                }
                                                                                value={
                                                                                    variant
                                                                                }
                                                                                checked={
                                                                                    selectedAttributes?.[
                                                                                        attribute
                                                                                            .id
                                                                                    ] ===
                                                                                    variant
                                                                                }
                                                                            />
                                                                            <span className="custom-radio">
                                                                                {
                                                                                    variant
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </React.Fragment>
                                                );
                                            }
                                        })}
                                    </div>
                                )}
                                <div className="qty-wrap" ref={ref}>
                                    <span className="qty-desc">Qty:</span>
                                    <div
                                        className="qty-dropdown"
                                        onClick={handleDropdown}
                                    >
                                        <span className="qty-label">{qty}</span>
                                        <i className="down-arrow"></i>
                                        <div className="dropdown-listing">
                                            {initial && (
                                                <ul>
                                                    {[...Array(units)].map(
                                                        (items, index) => {
                                                            return (
                                                                <li
                                                                    onClick={() =>
                                                                        addQty(
                                                                            index +
                                                                                1
                                                                        )
                                                                    }
                                                                    key={index}
                                                                >
                                                                    {index + 1}
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {isClient &&
                                !wishListData?.wishList?.data?.find(
                                    (item) =>
                                        item.productId === productDetails?._id
                                ) ? (
                                    <button
                                        className="wishlist-wrap"
                                        aria-label="wishlist"
                                        role="button"
                                        type="button"
                                        onClick={() =>
                                            addToWishlistHandler(
                                                productDetails._id,
                                                productDetails.sku,
                                                selectedSeller.vendorId
                                            )
                                        }
                                    >
                                        <span className="add-wishlist-box wishlist-box">
                                            <i className="wish-icon">
                                                <svg
                                                    width="15"
                                                    height="13"
                                                    viewBox="0 0 21 19"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M17.7719 2.41373L17.7731 2.41496C19.4651 4.1069 19.6687 7.05262 17.35 9.41752L10.0669 16.7007L2.78372 9.41751C0.465071 7.05261 0.668706 4.1069 2.36065 2.41496L2.36187 2.41373C2.77025 2.00393 3.25551 1.67878 3.78982 1.45692C4.32413 1.23506 4.89698 1.12085 5.47552 1.12085C6.05406 1.12085 6.62691 1.23506 7.16122 1.45692C7.69483 1.67849 8.17951 2.00308 8.58755 2.41211C8.58809 2.41265 8.58863 2.41319 8.58917 2.41373L9.35524 3.18977L10.0669 3.91066L10.7785 3.18977L11.5446 2.41373C11.5452 2.41319 11.5457 2.41265 11.5462 2.41211C11.9543 2.00308 12.439 1.67849 12.9726 1.45692C13.5069 1.23506 14.0797 1.12085 14.6583 1.12085C15.2368 1.12085 15.8097 1.23506 16.344 1.45692C16.8783 1.67878 17.3635 2.00393 17.7719 2.41373Z"
                                                        stroke="#999999"
                                                        strokeWidth="2"
                                                    />
                                                </svg>
                                            </i>
                                            <span className="add-wishlist">
                                                Add To Wishlist
                                            </span>
                                        </span>
                                    </button>
                                ) : (
                                    <button
                                        className="wishlist-wrap"
                                        aria-label="wishlist"
                                        role="button"
                                        type="button"
                                        onClick={() =>
                                            removeFromWishlistHandler(
                                                wishlistId
                                            )
                                        }
                                    >
                                        <span className="remove-wishlist-box wishlist-box">
                                            <i className="wish-icon">
                                                <svg
                                                    width="15"
                                                    height="13"
                                                    viewBox="0 0 21 19"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M17.7719 2.41373L17.7731 2.41496C19.4651 4.1069 19.6687 7.05262 17.35 9.41752L10.0669 16.7007L2.78372 9.41751C0.465071 7.05261 0.668706 4.1069 2.36065 2.41496L2.36187 2.41373C2.77025 2.00393 3.25551 1.67878 3.78982 1.45692C4.32413 1.23506 4.89698 1.12085 5.47552 1.12085C6.05406 1.12085 6.62691 1.23506 7.16122 1.45692C7.69483 1.67849 8.17951 2.00308 8.58755 2.41211C8.58809 2.41265 8.58863 2.41319 8.58917 2.41373L9.35524 3.18977L10.0669 3.91066L10.7785 3.18977L11.5446 2.41373C11.5452 2.41319 11.5457 2.41265 11.5462 2.41211C11.9543 2.00308 12.439 1.67849 12.9726 1.45692C13.5069 1.23506 14.0797 1.12085 14.6583 1.12085C15.2368 1.12085 15.8097 1.23506 16.344 1.45692C16.8783 1.67878 17.3635 2.00393 17.7719 2.41373Z"
                                                        stroke="#999999"
                                                        strokeWidth="2"
                                                    />
                                                </svg>
                                            </i>

                                            <span className="add-wishlist">
                                                Remove from Wishlist
                                            </span>
                                        </span>
                                    </button>
                                )}
                            </div>
                            {productInfo?.quantity !== 0 && (
                                <div className="mobile-btn-wrap">
                                    <button
                                        className="add-cart"
                                        aria-label="add cart"
                                        role="button"
                                        onClick={() =>
                                            addToCartHandler(
                                                selectedSeller.vendorId,
                                                productDetails?._id,
                                                userId,
                                                productInfo.sku,
                                                qty
                                            )
                                        }
                                    >
                                        Add to Cart
                                    </button>
                                    <Link
                                        href="/my-cart"
                                        prefetch={false}
                                        className="buy-now"
                                        aria-label="buy now"
                                    >
                                        Buy Now
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    {productInfo?.quantity !== 0 && (
                        <div className="desc-detail desc-detail-border desktop-border delivery-wrp">
                            <div className="address-wrap">
                                <span className="deliver-desc">
                                    Deliver to:
                                </span>
                                <div className="form-block input-wrap-border type-number delivery-address-wrp">
                                    <input
                                        type="number"
                                        placeholder="Enter Pincode here"
                                        className="form-control"
                                    />
                                    <button
                                        className="check-btn"
                                        aria-label="submit address"
                                        role="button"
                                    >
                                        Check
                                    </button>
                                </div>
                            </div>
                            <div className="delivery-date">
                                <span className="date-wrap">
                                    Get it by{" "}
                                    {/* <span className="date">{new Date()}</span> */}
                                </span>
                            </div>
                            {productDetails?.returnAvailable > 0 && (
                                <div className="product-available">
                                    <div className="icon-wrap">
                                        <i className="return-icon"></i>
                                    </div>

                                    <span className="return-days">
                                        {`${productDetails.returnAvailable} Days return available`}
                                    </span>
                                </div>
                            )}
                            {productDetails?.paymentMode === "COD" && (
                                <div className="product-available">
                                    <div className="icon-wrap">
                                        <i className="pay-icon"></i>
                                    </div>
                                    <span className="return-days">
                                        Pay on delivery available
                                    </span>
                                    <div className="more-info-wrapper">
                                        <div className="icon-wrap">
                                            <i className="info-icon"></i>
                                        </div>
                                        <div className="more-info-box">
                                            Pay on delivery available on order
                                            above 499
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="desc-detail desc-detail-border sold-wrap-detail">
                        {selectedSeller && (
                            <div className="sold-wrap">
                                <span className="sold-info">Sold by:</span>
                                <span className="sold-by">
                                    {selectedSeller.name}
                                </span>
                                {otherSeller?.length > 0 && (
                                    <button
                                        className="more-offer"
                                        aria-label="more offers"
                                        type="button"
                                        onClick={moreSellerClickHandler}
                                    >
                                        ({otherSeller.length} More Offers)
                                    </button>
                                )}
                            </div>
                        )}
                        {showOtherSeller && otherSeller?.length > 0 && (
                            <div className="other-sellers">
                                {otherSeller.map((seller) => {
                                    return (
                                        <div
                                            className="sellers-wrap"
                                            key={seller?.vendorId}
                                            style={{ marginBottom: "20px" }}
                                        >
                                            <div className="other-seller-detail">
                                                <div className="seller-info">
                                                    <span className="sell-head">
                                                        Sold by:
                                                    </span>
                                                    <span className="sell-value">
                                                        {seller?.name}
                                                    </span>
                                                </div>
                                                <div className="seller-info">
                                                    <span className="sell-head">
                                                        {`${
                                                            seller?.sellingPrice <
                                                            seller?.price
                                                                ? "Discounted Price:"
                                                                : "Price"
                                                        }`}
                                                    </span>
                                                    <span className="sell-value">
                                                        {seller?.sellingPrice}
                                                    </span>
                                                </div>
                                                {seller?.sellingPrice <
                                                    seller?.price && (
                                                    <div className="seller-info">
                                                        <span className="sell-head">
                                                            Discount:
                                                        </span>
                                                        <span className="sell-value">
                                                            {(
                                                                100 -
                                                                (seller?.sellingPrice /
                                                                    seller?.price) *
                                                                    100
                                                            ).toFixed(2)}
                                                            %
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="seller-info">
                                                    <span className="sell-head">
                                                        Delivery by:
                                                    </span>
                                                    <span className="sell-value">
                                                        NA
                                                    </span>
                                                </div>
                                                <div className="seller-info">
                                                    <span className="sell-head">
                                                        Payment mode:
                                                    </span>
                                                    <span className="sell-value">
                                                        {otherSeller?.paymentMode
                                                            ? otherSeller?.paymentMode
                                                            : "NA"}
                                                    </span>
                                                </div>
                                                <div className="seller-info">
                                                    <button
                                                        className="btn"
                                                        type="button"
                                                    >
                                                        Add to cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {productDetails?.countryOfOrigin?.length > 0 && (
                            <div className="sold-wrap sold-origin">
                                <span className="sold-info">
                                    Country of Origin:
                                </span>
                                <span className="sold-by">
                                    {productDetails.countryOfOrigin}
                                </span>
                            </div>
                        )}
                        <div className="manufacture-details">
                            <h4>
                                <span
                                    aria-label="manufacture detail"
                                    className="manufacture-head"
                                >
                                    Manufacturer Details
                                </span>
                            </h4>
                        </div>
                    </div>
                    <div className="desc-detail desc-detail-border">
                        <div className="manufacture-details">
                            <ul className="details-listing">
                                {manufactureDetails?.map((item, index) => {
                                    return item.value?.length > 0 ? (
                                        <li key={item.value}>
                                            <div className="detail-key">
                                                {item.heading}
                                            </div>
                                            <div className="detail-value">
                                                {item.value}
                                            </div>
                                        </li>
                                    ) : null;
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SliderContent;
