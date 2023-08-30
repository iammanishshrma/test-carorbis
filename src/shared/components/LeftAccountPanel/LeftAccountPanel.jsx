import React from "react";

import { useSelector } from "react-redux";

import AccountPanel from "../AccountPanel/AccountPanel";
import "./LeftAccountPanel.scss";

const LeftAccountPanel = () => {
    const { name, img } = useSelector((state) => state.getUserSlice);

    const panelData = [
        {
            panelItem: "Orders & Returns",
            panelType: "manage your Orders & Returns",
            className: "icon-order",
            link: "/my-orders",
        },
        {
            panelItem: "My Addresses",
            panelType: "Edit & manage your adresses",
            className: "icon-address",
            link: "/my-address",
        },
        {
            panelItem: "Wishlist",
            panelType: "Manage your wishlist",
            className: "icon-wishlist",
            link: "/my-wishlist",
        },
        {
            panelItem: "Notifications",
            panelType: "View & manage your Notifications",
            className: "icon-notification",
            link: "/my-notifications",
        },
        {
            panelItem: "Personal Information",
            panelType: "Edit & manage your profile",
            className: "icon-info",
            link: "/my-profile",
        },
        {
            panelItem: "Help & Support",
            panelType: "Need help? write to us",
            className: "icon-help",
            link: "/help-support",
        },
        {
            panelItem: "Login & Security",
            panelType: "Manage your password",
            className: "icon-login",
            link: "/login-security",
        },
    ];
    return (
        <div className="left-account">
            <div className="profile-info">
                {img ? (
                    <div className="profile-icon__img">
                        <img src={img} alt="profile image" />
                    </div>
                ) : (
                    <i className="profile-icon" />
                )}
                <div className="name-wrap">
                    <h2>Hello,</h2>
                    <h3>{name}</h3>
                </div>
            </div>
            <AccountPanel panelData={panelData} />
        </div>
    );
};

export default LeftAccountPanel;
