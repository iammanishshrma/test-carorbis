import React from "react";

import BreadCrumbSection from "@/shared/components/BreadCrumb/BreadCrumb";
import LeftAccountPanel from "@/shared/components/LeftAccountPanel/LeftAccountPanel";
import ProfileData from "../../components/ProfileData/ProfileData";
import "./MyProfile.scss";

const MyProfile = () => {
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
            name: "Profile",
            link: "/my-profile",
        },
    ];
    return (
        <div className="my-account">
            <div className="container">
                <BreadCrumbSection breadcrumbData={breadcrumbData} />
                <div className="account-details">
                    <LeftAccountPanel />
                    <ProfileData />
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
