import React from "react";

import "./NotificationData.scss";
const NotificationData = (props) => {
    const notificationItem = props.notificationItem;
    return (
        <div className="notification-data">
            <div className="order-body">
                <div className="notification-wrap">
                    <div className="notification-img">
                        <img
                            src={notificationItem.image}
                            alt="notification-img"
                        />
                    </div>
                    <div className="notification-description">
                        <p>{notificationItem.desc}</p>
                    </div>
                </div>
                <div className="delete-notification">
                    <i className="icon-delete"></i>
                    <span className="date">24 August, 2022</span>
                </div>
            </div>
        </div>
    );
};

export default NotificationData;
