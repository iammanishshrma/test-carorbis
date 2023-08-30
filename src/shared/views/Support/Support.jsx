import React from "react";
import BreadCrumbSection from "@/shared/components/BreadCrumb/BreadCrumb";
import "../MyOrder/MyOrder.scss";
import LeftAccountPanel from "@/shared/components/LeftAccountPanel/LeftAccountPanel";
import SupportForm from "@/shared/components/SupportForm/SupportForm";

const Support = () => {
    const breadcrumbData = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Account",
            link: "/app/my-profile",
        },
        {
            name: "Order & Returns",
            link: "/app/my-order",
        },
        {
            name: "Orders Details",
            link: "/app/order-detail",
        },
    ];
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

    return (
        <div className="my-account">
            <div className="container">
                <BreadCrumbSection breadcrumbData={breadcrumbData} />
                <div className="account-details order-status">
                    <LeftAccountPanel panelData={panelData} />
                    <div className="rgt-account">
                        <div className="order-return">
                            <SupportForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
