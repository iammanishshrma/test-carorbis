import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import "../OrderPanel/OrderPanel.scss";
import "./CartSummary.scss";
const CartSummary = (props) => {
    const orderProduct = props.orderProduct;
    const [qty, setQty] = useState(1);
    let units = Number(orderProduct.unit);
    const [initial, setInitial] = useState(false);
    const addQty = (e) => {
        setQty(e);
        setInitial(false);
    };
    const handleDropdown = () => {
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
    return (
        <div className="my-order-data cart-summary cart-item-wrap">
            <div className="order-product">
                <div className="product-ltl">
                    <div className="card-fitment">
                        <div className="product-image" style={{ position: "relative" }}>
                            {/* <img src={orderProduct.image.src} alt="product" /> */}
                            <Image
                                src={orderProduct.image.src}
                                alt="product"
                                priority
                                width={96}
                                height={96}
                                title={orderProduct.name}
                            />
                        </div>
                        <div className="vechile-wrp desk-hide">
                            <i className="icon-vechile"></i>
                            <span className="vechile-name">Fits 2019 Honda Civic</span>
                        </div>
                    </div>
                    <div className="product-description">
                        <div className="processs-btn-wrap">
                            <div className="head-name">
                                <h4>{orderProduct.name}</h4>
                                <div className="product-price">
                                    <div className="max-price">
                                        &#8377;{orderProduct.maxPrice}
                                    </div>
                                    <div className="actual-price">
                                        &#8377;{orderProduct.price}
                                    </div>
                                    <button className="remove-btn" aria-label="Remove" role="button">
                                        <i className="icon-remove"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="product-detail">
                            <div className="product-color">
                                Color: {orderProduct.color}
                            </div>
                            {/* <div className="product-qty">
                                Qty: {orderProduct.qty}
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
                        <div className="estimited-delivery">
                            &#8377; {orderProduct.deliveryCharge} Delivery
                            charges
                        </div>
                        <div className="estimited-delivery">
                            Est. delivery by{" "}
                            <span className="delivery-date">
                                {" "}
                                {orderProduct.delivery}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
