import React from "react";

import BreadCrumbSection from "@/shared/components/BreadCrumb/BreadCrumb";
import LeftAccountPanel from "@/shared/components/LeftAccountPanel/LeftAccountPanel";
import RightPanel from "./Components/RightPanel/RightPanel";

import "../../views/ForgetPassword/ForgetPassword.scss";
import "../MyProfile/MyProfile.scss";
import "@/shared/components/ProfileData/ProfileData.scss";
import "@/shared/components/AccountForm/AccountForm.scss";
import "./ChangeUserPassword.scss";

const ChangeUserPassword = () => {
    const breadcrumbData = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "All Product",
            link: "/product-listing",
        },
        {
            name: "Login & Security",
            link: "/my-profile",
        },
    ];
    return (
        <div className="my-account">
            <div className="container">
                <BreadCrumbSection breadcrumbData={breadcrumbData} />
                <div className="account-details">
                    <LeftAccountPanel />
                    <RightPanel />
                </div>
            </div>
        </div>
    );
};

export default ChangeUserPassword;
