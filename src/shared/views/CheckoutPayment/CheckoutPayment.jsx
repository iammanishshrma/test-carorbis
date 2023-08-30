import React, { useState } from "react";

import Link from "next/link";
import { Dropdown } from "primereact/dropdown";

import CartProcessSteps from "@/shared/components/CartProcessSteps/CartProcessSteps";
import CartSummary from "@/shared/components/CartSummary/CartSummary";
import ProductPricing from "@/shared/components/ProductPricing/ProductPricing";
import ProductImg1 from "@/shared/assets/images/slider-img5.png";
import ProductImg2 from "@/shared/assets/images/product-5.png";
import "../Cart/Cart.scss";
import "./CheckoutPayment.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

import "../CheckoutAddress/CheckoutAddress.scss";

const CheckoutPayment = () => {
    const [city, setCity] = useState();
    const citySelectItems = [
        { label: "Fri, 26 August", value: "NY" },
        { label: "Fri, 26 August", value: "RM" },
        { label: "Fri, 26 August", value: "LDN" },
        { label: "Fri, 26 August", value: "IST" },
        { label: "Fri, 26 August", value: "PRS" },
    ];
    const orderSummary = [
        {
            image: ProductImg1,
            name: "AUTO CAR WINNER Beige Car Armrest for Maruti Ritz",
            color: "Peach Brown",
            qty: "01",
            unit: 10,
            price: "1499",
            maxPrice: "2,500",
            delivery: "Fri, 26 August",
            deliveryCharge: "150",
        },
        {
            image: ProductImg2,
            name: "AUTO CAR WINNER Beige Car Armrest for Maruti Ritz",
            color: "Peach Brown",
            qty: "01",
            unit: 10,
            price: "1499",
            maxPrice: "2,500",
            delivery: "Fri, 26 August",
            deliveryCharge: "150",
        },
    ];
    const cartProcess = {
        Cart: {
            status: true,
        },
        Address: {
            status: true,
        },
        Payment: {
            status: "inProcess",
        },
    };
    const priceData = {
        totalPrice: "",
        discount: "3003",
        Shipping: "150",
        promotionApplied: "250",
        OrderTotal: "4397",
    };
    return (
        <div className="checkout-final">
            <div className="container">
                <div className="cart-main-head">
                    <div>
                        <Link
                            href="/checkout-address"
                            className="go-back"
                            aria-label="Address"
                        >
                            <i className="icon-back"></i>
                            Payment
                        </Link>
                    </div>
                    <CartProcessSteps cartProcess={cartProcess} />
                </div>
                <div className="payment-mode-head">
                    <h2>Select Payment Option</h2>
                </div>
                <div className="payment-method-wrap">
                    <div className="checkout-payment">
                        <div className="checkout-payment-wrap">
                            <div className="payment-method">
                                <Link
                                    className="mode-list"
                                    href="/"
                                    aria-label="Cash on Delivery"
                                >
                                    <div className="pay-text-wrp">
                                        <i className="icon-cod"></i>
                                        <div className="mode-pay">
                                            <span className="pay-head">Cash on Delivery</span>
                                            <p>Pay at your doorstep</p>
                                        </div>
                                    </div>
                                    <i className="icon-arrow"></i>
                                </Link>
                                <Link
                                    className="mode-list active"
                                    href="/"
                                    aria-label="Credit/Debit Card"
                                >
                                    <div className="pay-text-wrp">
                                        <i className="icon-card"></i>
                                        <div className="mode-pay">
                                            <span className="pay-head">Credit/Debit Card</span>
                                            <p>Visa, Mastercard, Rupay & more</p>
                                        </div>
                                    </div>
                                    <i className="icon-arrow"></i>
                                </Link>
                                {/* <Link className='mode-list' href="/">
                                    <i className='icon-upi'></i>
                                    Phone Pay/Google Pay/
                                    Bhim Upi
                                </Link>
                                <Link className='mode-list' href="/">
                                    <i className='icon-wallet'></i>
                                    Paytm/Wallet
                                </Link>
                                <Link className='mode-list' href="/">
                                    <i className='icon-bank'></i>
                                    Net Banking
                                </Link>
                                <Link className='mode-list' href="/">
                                    <i className='icon-emi'></i>
                                    EMI/Pay Later
                                </Link> */}
                            </div>
                            <div className="payment-mode">
                                <div className="accept-card" >
                                    WE ACCEPT
                                    <div className="card-list">
                                        <i className="visa card-icon"></i>
                                        <i className="master-card card-icon"></i>                                        <i></i>
                                        <i className="rupay card-icon"></i>
                                        <i className="american-express card-icon"></i>
                                    </div>
                                </div>
                                <div className="payment-option">

                                    <input
                                        type="radio"
                                        name="card-payment"
                                        className="card-payment"
                                    />
                                    <div className="custom-radio"></div>
                                    <div className="card-wrapper">
                                        <h3>
                                            HDFC Bank Credit Card Ending in 0000{" "}
                                            <i className="icon-mastercard"></i>
                                        </h3>
                                        <div className="card-details">
                                            <div className="detail-wrap">
                                                <h4>Name On Card:</h4>
                                                <span className="detail-value">
                                                    Manjul Bansal
                                                </span>
                                            </div>
                                            <div className="detail-wrap">
                                                <h4>Expiry:</h4>
                                                <span className="detail-value">
                                                    00/0000
                                                </span>
                                            </div>
                                        </div>
                                        <div className="selected-column">
                                            <div className="payment-input">
                                                <div className="cvv-wrap type-number">
                                                    <label>
                                                        CVV
                                                        <span className="required-field">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="yyz"
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className='proceed-wrap'>
                                                <Link href="/order-success" className="proceed">Make Payment</Link>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="payment-option payment-option-next">

                                    <input
                                        type="radio"
                                        name="card-payment"
                                        className="card-payment"
                                    />
                                    <div className="custom-radio"></div>
                                    <div className="card-wrapper">
                                        <h3>
                                            Enter another Credit or Debit Card
                                            Details
                                        </h3>
                                        <div className="selected-column">
                                            <div className="payment-input type-number">
                                                <label>Card Number*</label>
                                                <div className="debit-card">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="xxxx xxxx xxxx xxxx"
                                                    />
                                                    <i className="icon-visa"></i>
                                                </div>
                                            </div>
                                            <div className="payment-input">
                                                <label>
                                                    Name*{" "}
                                                    <span className="verified-text">
                                                        (as mentioned on the
                                                        card)
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Name"
                                                />
                                            </div>
                                            <div className="payment-input cvv-payment-wrap">
                                                <div className="form-block select-wrap valid-wrap valid-select-wrap">
                                                    <div className="select-wrapper">
                                                        <label>
                                                            Valid Thru*
                                                        </label>
                                                        <div className="valid-date">
                                                            <i className="icon-calender"></i>
                                                            <Dropdown
                                                                value={city}
                                                                options={
                                                                    citySelectItems
                                                                }
                                                                onChange={(e) =>
                                                                    setCity(
                                                                        e.value
                                                                    )
                                                                }
                                                                placeholder="xx / xxxx"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="cvv-wrap type-number">
                                                    <label>CVV*</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="xxx"
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className="quick-signup">
                                                <div className="custom-check">
                                                    <input className="check-custom" type="checkbox" />
                                                    <span className="custom-mark"></span>
                                                </div>
                                                <div className="signup-text">
                                                    <div className="heading-text">
                                                        <h4>Make this my default card for future payments</h4>
                                                    </div>
                                                </div>
                                            </div> */}
                                            {/* <div className='proceed-wrap'>
                                                <Link href="/order-success" className="proceed">Make Payment</Link>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rtl-address">
                        <div className="rtl-box">
                            <h2>Order Summary</h2>
                            <div className="cart-item">2 items</div>
                            {orderSummary.map((item, index) => {
                                return (
                                    <CartSummary
                                        key={index}
                                        orderProduct={item}
                                    />
                                );
                            })}
                            <ProductPricing priceData={priceData} />
                            <Link
                                href="/order-success"
                                className="order-proceed mob-hide"
                                aria-label="Proceed to Pay"
                            >
                                PROCEED TO PAY <i className="proceed-arrow"></i>
                            </Link>
                        </div>
                        <div className="safety-msg">
                            <div className="safe-wrp">
                                <i className="icon-safety"></i>
                                <p>Your transaction is safe with us</p>
                            </div>
                        </div>
                        <div className="desk-hide cart-fixed-wrp">
                            <div className="grand-total">
                                <span className="price">₹6534</span>
                                Grand Total
                            </div>
                            <Link
                                href="/order-success"
                                className="order-proceed"
                                aria-label="Proceed to Pay"
                            >
                                PROCEED TO PAY <i className="proceed-arrow"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPayment;
