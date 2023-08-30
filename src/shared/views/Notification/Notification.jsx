import React from "react";
import LeftAccountPanel from "@/shared/components/LeftAccountPanel/LeftAccountPanel";
import ProductImg2 from "@/shared/assets/images/product-5.png";
import ProductImg1 from "@/shared/assets/images/slider-img5.png";
import ProductImg3 from "@/shared/assets/images/product-1.png";
import NotificationData from "@/shared/components/NotificationData/NotificationData";

import "../MyProfile/MyProfile.scss";
import "../../components/ProfileData/ProfileData.scss";
import "./Notification.scss";
import '../Wishlist/Wishlist.scss'
import '../../components/NotificationData/NotificationData.scss'

const Notification = () => {
    const panelData = [
        {
            panelItem: "Orders & Returns",
            panelType: "manage your Orders & Returns",
            className: "icon-order",
        },
        {
            panelItem: "My Addresses",
            panelType: "Edit & manage your adresses",
            className: "icon-address",
        },
        {
            panelItem: "Wishlist",
            panelType: "Manage your wishlist",
            className: "icon-wishlist",
        },
        {
            panelItem: "Notifications",
            panelType: "View & manage your Notifications",
            className: "icon-notification",
        },
        {
            panelItem: "Personal Information",
            panelType: "Edit & manage your profile",
            className: "icon-info",
        },
        {
            panelItem: "Help & Support",
            panelType: "Need help? write to us",
            className: "icon-help",
        },
    ];
    const notificationData = [
        {
            image: ProductImg1.src,
            desc: "sign-up for Flipkart pay later and get upto 1000* gift card + credit upto 1 Lakh in 30 secs",
        },
        {
            image: ProductImg2.src,
            desc: "sign-up for Flipkart pay later and get upto 1000* gift card + credit upto 1 Lakh in 30 secs",
        },
        {
            image: ProductImg3.src,
            desc: "sign-up for Flipkart pay later and get upto 1000* gift card + credit upto 1 Lakh in 30 secs",
        },
    ];
    return (
        <>
            <div className="wishlist-wrapper">
                <div className="container">
                    <div className="wishlist-wrap account-details">
                        <div className="left-account">
                            <LeftAccountPanel panelData={panelData} />
                        </div>
                        <div className="rgt-account">
                            <div className="wishlist-head">
                                <h3>Notifications</h3>
                            </div>
                            <div className="order-wrapper">
                                {notificationData.map((item, index) => {
                                    return (
                                        <NotificationData
                                            notificationData={notificationData}
                                            notificationItem={item}
                                            key={index}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notification;
