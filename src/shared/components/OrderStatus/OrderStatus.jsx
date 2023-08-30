import React from "react";

import Link from "next/link";

import ProductPricing from "../ProductPricing/ProductPricing";
import OrderPanel from "../OrderPanel/OrderPanel";
import OrderProcess from "../OrderProcess/OrderProcess";
import "./OrderStatus.scss";

const OrderStatus = (props) => {
    const priceData = {
        totalPrice: "7500",
        discount: "3003",
        Shipping: "150",
        promotionApplied: "250",
        OrderTotal: "4397",
    };
    const orderData = props.orderData;

    return (
        <div className="rgt-account detail-account">
            <div className="order-return">
                <div className="order-head-wrap">
                    <Link href="/my-orders" className="back-btn"></Link>
                    <h3> Orders Details</h3>
                </div>
                <div className="order-process-body">
                    <div className="order-main-wrap">
                        <div className="order-header">
                            <ul className="header-item order-detail-header">
                                <li>
                                    <h3>Order Date</h3>
                                    <h4>{orderData.orderDate}</h4>
                                </li>
                                <li>
                                    <h3>Order ID</h3>
                                    <h4>{orderData.orderId}</h4>
                                </li>
                                {/* <li>
                  <h3>Order Status</h3>
                  <h4>{orderData.orderStatus}</h4>
                </li> */}
                                <li className="payment-details">
                                    <h3>Payment Details</h3>
                                    <h4>{orderData.paymentDetails}</h4>
                                </li>
                                <li className="address">
                                    <h3>Addess</h3>
                                    <h4>
                                        <i className="icon-location"></i>
                                        <span className="location-addres">
                                            {orderData.address}
                                        </span>
                                    </h4>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="order-process-wrapper">
                        <div className="order-body-process ">
                            {orderData.data.map((item, index) => {
                                return (
                                    <div
                                        className="order-panel-process order-detail-process"
                                        key={index}
                                    >
                                        <OrderPanel
                                            orderData={item}
                                            order={orderData}
                                        />
                                        <div className="order-process">
                                            <OrderProcess
                                                processData={item.processData}
                                                orderData={item}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="payment-wrapper order-payment">
                        <ProductPricing priceData={priceData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderStatus;
