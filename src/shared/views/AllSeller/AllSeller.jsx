import React from "react";
import "./AllSeller.scss";
const AllSeller = () => {
    return (
        <div className="all-seller">
            <div className="container">
                <div className="seller-content">
                    <div className="all-seller-head">
                        <h2> All Sellers</h2>
                    </div>
                    <div className="seller-head">
                        <div className="sell-heading head">Seller</div>
                        <div className="price-heading head">Price</div>
                        <div className="delivery-heading head">Delivery</div>
                        <div className="cart-heading head"></div>
                    </div>
                    <div className="seller-wrapper-value">
                        <div className="seller-value value">
                            <h3>Seller</h3>
                            <ul className="sell-list">
                                <li>Cash On Delivery available</li>
                                <li>10 Days Replacement Policy</li>
                            </ul>
                        </div>
                        <div className="price-value value">
                            <h3>Price</h3>
                            <div className="price-wrap">
                                <div className="actual-price">₹199</div>
                                <div className="old-price">₹899</div>
                                <div className="discount-percent">77% off</div>
                            </div>
                            <ul className="sell-list">
                                <li>
                                    Purchase now & get a surprise cashback
                                    coupon for January / February 2023.
                                </li>
                                <li>Buy this product and get upto ₹250 off.</li>
                            </ul>
                        </div>
                        <div className="delivery-value value">
                            <h3>Delivery</h3>
                            <p>
                                Usually delivered in 7 days Enter pincode for
                                exact delivery dates/charges
                            </p>
                        </div>
                        <div className="cart-value value">
                            <button className="add-cart">Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllSeller;
