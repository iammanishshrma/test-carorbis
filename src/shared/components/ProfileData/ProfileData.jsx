import React from "react";
import AccountForm from "../AccountForm/AccountForm";
import "./ProfileData.scss";

const ProfileData = () => {
    return (
        <div className="rgt-account">
            <div className="account-form">
                <h3>My Profile</h3>
                <AccountForm />
            </div>
        </div>
    );
};

export default ProfileData;
