import React from "react";

import Link from "next/link";
import OrderPanel from "../OrderPanel/OrderPanel";
import "./MyOrderList.scss";

const MyOrderList = (props) => {
    const item = props.orderData;
    return (
        <>
            <div className="order-wrapper">
                <div className="order-header order-left-header">
                    <ul className="header-item left-header">
                        <li>
                            <h3>Order Date</h3>
                            <h4>{item.orderDate}</h4>
                        </li>
                        <li>
                            <h3>Order ID</h3>
                            <h4>{item.orderId}</h4>
                        </li>
                        {/* <li>
              <h3>Order Status</h3>
              <h4>{item.orderStatus}</h4>
            </li> */}
                        <li>
                            <h3>Order Total</h3>
                            <h4>&#8377; {item.orderTotal}</h4>
                        </li>
                    </ul>
                    <Link
                        href="/order-details/sdf"
                        className="view-details"
                        aria-label="View details"
                    >
                        <span className="details-text">View Details</span>
                        <i className="icon-arrow"></i>
                    </Link>
                </div>
                <div className="order-body">
                    {item.data.map((item, index) => {
                        return (
                            <div className="order-panel-wrap" key={index}>
                                <OrderPanel
                                    orderData={item}
                                    order={props.orderData}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default MyOrderList;
