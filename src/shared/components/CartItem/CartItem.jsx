import React, { useState, useEffect, useRef } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import "../OrderPanel/OrderPanel.scss";
import CancelPopup from "../CancelPopup/CancelPopup";
import ReturnPopUp from "../ReturnPopUp/ReturnPopUp";
import RefundDetailPopUp from "../RefundDetailPopUp/RefundDetailPopUp";
import Rating from "react-rating";
import transparent from "@/shared/assets/images/transparent.svg";
import filled from "@/shared/assets/images/yellow-star.svg";
import './CartItem.scss'
import Image from "next/image";
const CartItem = (props) => {
    const router = useRouter();
    const orderData = props.orderData;
    const [popUp, setPopUp] = useState(false);
    const [popUp1, setPopUp1] = useState(false);
    const [popUpReturn, setPopUpReturn] = useState(false);
    const [popUpRefund, setPopUpRefund] = useState(false);
    const [qty, setQty] = useState(1);
    let units = Number(orderData?.unit);
    const [initial, setInitial] = useState(false);
    const addQty = (e) => {
        setQty(e);
        setInitial(false);
    };
    const handleDropdown = (e) => {

        e.stopPropagation();
        setInitial(!initial);
    };
    // close dropdown on outside click
    const ref = useRef();
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
    const openPopUp = (e) => {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        setPopUp(true);
        document.body.classList.toggle("modal-open");
    };
    const openPopUpReturn = (e) => {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        setPopUpReturn(true);
        document.body.classList.toggle("modal-open");
    };
    const openPopUpRefund = (e) => {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        setPopUpRefund(true);
        document.body.classList.toggle("modal-open");
    };

    const refundData = {
        price: "1499",
        totalPrice: "1499",
        date: "03 Sep, 2022",
        cardEndDigit: "0000",
    };
    const navigateHandler = (e) => {
        // if (e && e.stopPropagation) {
        // }
        router.push("/")
    }
    return (
        <div className="my-order-data cart-item-wrap">
            <div className="order-product">
                <div className="order-panel-wrapper">
                    <div className="order-panel-link" onClick={navigateHandler}>
                        <div className="product-ltl">
                            <div className="card-fitment">
                                <div className="product-image" style={{ position: "relative" }}>
                                    {/* <img src={orderData.image} alt="product" /> */}
                                    <Image
                                        src={orderData.image}
                                        alt="product"
                                        priority
                                        width={96}
                                        height={96}
                                        title={orderData.name}
                                    />
                                </div>
                                <div className="vechile-wrp desk-hide">
                                    <div className="vehicle-fit-icon">
                                        <i className="icon-vechile"></i>
                                    </div>
                                    <span className="vechile-name">Fits 2019 Honda Civic</span>
                                </div>
                            </div>
                            <div className="product-description">
                                <div className="processs-btn-wrap">
                                    <div className="head-name">
                                        <h3>{orderData.brandName}</h3>
                                        <h4>{orderData.name}</h4>
                                    </div>
                                    <div className="desk-hide action-btn">
                                        <button className="wishlist-btn">
                                            <i className="icon-wishlist"></i>
                                        </button>
                                        <button className="delete-btn">
                                            <i className="icon-delete"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="seller-desc">
                                    <div className="sold-by">
                                        Sold by: {orderData.soldBy}
                                    </div>
                                    <div className="stock-unit">
                                        SKU: {orderData.sku}
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <div className="product-color">
                                        Color: {orderData.color}
                                    </div>
                                    {/* <div className="product-qty">
                                        Qty: {orderData.qty}
                                    </div> */}
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
                                </div>
                                <div className="product-price">
                                    <div className="max-price">
                                        &#8377;{orderData.maxPrice}
                                    </div>
                                    <div className="actual-price">
                                        &#8377;{orderData.price}
                                    </div>
                                    <div className="discount">
                                        {orderData.discount}
                                    </div>
                                </div>
                                <div className="estimited-delivery">
                                    Est. delivery by{" "}
                                    <span className="delivery-date">
                                        {" "}
                                        {orderData.delivery}
                                    </span>
                                </div>
                                <div className="order-status-text">
                                    {props.order?.orderStatus}
                                </div>
                                <div className="detail-page-status">
                                    {props.orderData?.orderStatus}
                                </div>
                                {props.order?.orderStatus === "Cancelled" ? (
                                    <div className="return-reason">
                                        Cancel reason :{" "}
                                        <span className="reason-desc">
                                            Changed my mind
                                        </span>
                                    </div>
                                ) : null}
                                {props.order?.orderStatus === "Returned" ? (
                                    <div className="return-reason">
                                        Return reason :{" "}
                                        <span className="reason-desc">
                                            Product damaged
                                        </span>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    {props.order?.orderStatus === "Completed" ||
                        props.order?.orderStatus === "Delivered" ? (
                        <div className="order-successful-wrap">
                            <div className="customer-rating">
                                <span className="rate-product">
                                    Rate Product
                                </span>
                                <Rating
                                    emptySymbol={
                                        <img
                                            src={transparent}
                                            className="icon-transparent"
                                        />
                                    }
                                    fullSymbol={
                                        <img
                                            src={filled}
                                            className="icon-filled"
                                        />
                                    }
                                />
                            </div>
                            <div className="customer-review">
                                <button
                                    className="write-review"
                                    onClick={() => setPopUp1(true)}
                                    aria-label="Write a review"
                                    role="button"
                                >
                                    Write a review
                                </button>
                                <div className={`pop-up ${popUp1 && "active"}`}>
                                    <div className="popup-wrapper">
                                        <div className="popup-content">
                                            <h3>Write a review</h3>
                                            <div className="start-rating-wrap">
                                                <div className="rating-column">
                                                    <Rating
                                                        emptySymbol={
                                                            <img
                                                                src={
                                                                    transparent
                                                                }
                                                                className="icon-transparent"
                                                            />
                                                        }
                                                        fullSymbol={
                                                            <img
                                                                src={filled}
                                                                className="icon-filled"
                                                            />
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-block">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Product Year"
                                                />
                                            </div>
                                            <div className="form-block">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Product making"
                                                />
                                            </div>
                                            <div className="form-block">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Model name"
                                                />
                                            </div>
                                            <div className="form-block textarea-wrapper">
                                                <textarea
                                                    rows="5"
                                                    cols="0"
                                                    placeholder="Type here"
                                                    className="text-area form-control"
                                                ></textarea>
                                                <span className="min-word">
                                                    800 words maximum
                                                </span>
                                            </div>
                                            <button
                                                type="submit"
                                                className="form-btn"
                                                aria-label="Submit"
                                                role="button"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setPopUp1(false)}
                                        className="close-btn"
                                        aria-label="Close"
                                        role="button"
                                    >
                                        <i className="cancel-icon"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="product-rtl cart-product-rtl">
                    <div className="my-order-btn">
                        {props.order?.orderStatus === "Completed" ||
                            props.order?.orderStatus === "Delivered" ? (
                            <button
                                className="view-invoice"
                                onClick={openPopUpRefund}
                                aria-label="View Invoice"
                                role="button"
                            >
                                View Invoice
                            </button>
                        ) : null}

                        {props.order?.orderStatus !== "Completed" ? (
                            props.order?.orderStatus !== "Delivered" ? (
                                props.order?.orderStatus !== "Cancelled" ? (
                                    props.order?.orderStatus !== "Returned" ? (
                                        <button
                                            className="cancel-btn"
                                            onClick={openPopUp}
                                            aria-label="Cancel"
                                            role="button"
                                        >
                                            Cancel
                                        </button>
                                    ) : null
                                ) : null
                            ) : null
                        ) : null}

                        {props.order?.orderStatus !== "Completed" ? (
                            props.order?.orderStatus === "Delivered" ? (
                                <button
                                    className="cancel-btn"
                                    onClick={openPopUpReturn}
                                    aria-label="Return & Replace"
                                    role="button"
                                >
                                    Return & Replace
                                </button>
                            ) : null
                        ) : null}
                        {props.order?.orderStatus === "Completed" ||
                            props.order?.orderStatus === "Delivered" ? (
                            <button className="buy-btn" aria-label="Buy Again" role="button">Buy Again</button>
                        ) : null}
                    </div>
                    <div className="cart-item-btn mob-hide" >
                        <div className="btn-wrap">
                            <button className="wishlist" aria-label="Move to Wishlist" role="button">
                                Move to Wishlist
                            </button>
                            <button className="remove" aria-label="Remove" role="button">Remove</button>
                        </div>
                        <div className="product-feed product-feed-wrap">
                            {orderData.exactFit ? (
                                <p>
                                    <i className="icon-check"></i>
                                    {orderData.exactFit}
                                </p>
                            ) : (
                                <p>
                                    <i className="icon-caution"></i>
                                    {orderData.caution}
                                </p>
                            )}
                        </div>
                    </div>
                    <button className="delete-wishlist-item" aria-label="delete Wishlist" role="button">
                        <i className="wishlist-item"></i>
                    </button>
                </div>
            </div>
            <div className={`pop-up ${popUp && "active"}`}>
                <CancelPopup close={setPopUp} />
            </div>
            <div className={`pop-up ${popUpReturn && "active"}`}>
                <ReturnPopUp close={setPopUpReturn} />
            </div>
            <div className={`pop-up ${popUpRefund && "active"}`}>
                <RefundDetailPopUp
                    close={setPopUpRefund}
                    refundData={refundData}
                />
            </div>
        </div>
    );
};

export default CartItem;