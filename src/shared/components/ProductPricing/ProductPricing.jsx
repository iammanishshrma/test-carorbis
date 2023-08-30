import React from "react";

import "./ProductPricing.scss";

const ProductPricing = (props) => {
    const priceData = props.priceData;
    return (
        <div className="price-wrap">
            <div className="total-mrp price">
                <h4>Total MRP</h4>
                <span className="value">&#8377;{priceData.totalPrice}</span>
            </div>
            <div className="discount price">
                <h4>Discount on MRP </h4>
                <span className="value discount">
                    - &#8377;{priceData.discount}
                </span>
            </div>
            <div className="shipping-wrap price">
                <h4>Shipping</h4>
                <span className="value">&#8377;{priceData.Shipping}</span>
            </div>
            <div className="promotion-wrap price">
                <h4>Coupon Applied</h4>
                <span className="value coupon">
                    - &#8377;{priceData.promotionApplied}
                </span>
            </div>
            <div className="order-total price">
                <h4>Order Total</h4>
                <span className="value">&#8377;{priceData.OrderTotal}</span>
            </div>
        </div>
    );
};

export default ProductPricing;
