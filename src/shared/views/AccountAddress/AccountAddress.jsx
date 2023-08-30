import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getAddresses } from "@/shared/store/slices/addressSlice";

import AddressPanel from "@/shared/components/AddressPanel/AddressPanel";
import BreadCrumbSection from "@/shared/components/BreadCrumb/BreadCrumb";
import LeftAccountPanel from "@/shared/components/LeftAccountPanel/LeftAccountPanel";
import AddressForm from "@/shared/components/AddressForm/AddressForm";

import "../MyProfile/MyProfile.scss";
import "../../components/ProfileData/ProfileData.scss";
import "../../components/AccountForm/AccountForm.scss";
import "./AccountAddress.scss";

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
        name: "My Addresses",
        link: "/account-address",
    },
];

const AccountAddress = () => {
    const addressList = useSelector((state) => state.addressData.addressList);
    const [isAddAddressModalShowing, setIsAddAddressModalShowing] =
        useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAddresses());
    }, [dispatch]);

    // Function to toggle Add/edit form modal
    const toggleAddAddressModal = () => {
        document.body.classList.toggle("modal-open");
        setIsAddAddressModalShowing((prev) => !prev);
    };

    return (
        <div className="my-account myaccount-address-wrap">
            <div className="container">
                <BreadCrumbSection breadcrumbData={breadcrumbData} />
                <div className="account-details order-status">
                    <LeftAccountPanel />
                    <div className="rgt-account">
                        <div className="address-block">
                            <div className="add-wrap">
                                <h3>My Addresses</h3>
                                <button
                                    className="add-address"
                                    onClick={toggleAddAddressModal}
                                    aria-label="Add Address"
                                    role="button"
                                >
                                    <i className="add-icon"></i>Add New Address
                                </button>
                            </div>
                            <div className="other-addresses">
                                {!addressList || addressList.length === 0 ? (
                                    <h1 className="no-address">
                                        No address found!!!
                                    </h1>
                                ) : (
                                    <div>
                                        {addressList?.map((address, index) => {
                                            return (
                                                <AddressPanel
                                                    key={index}
                                                    address={address}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {isAddAddressModalShowing && (
                    <div className={`pop-up active`}>
                        <div className="popup-wrapper">
                            <div className="popup-content">
                                <AddressForm
                                    heading={"Add New Address"}
                                    onClose={toggleAddAddressModal}
                                />
                            </div>
                        </div>
                        <button
                            onClick={toggleAddAddressModal}
                            className="close-btn"
                            aria-label="Close"
                            role="button"
                        >
                            <i className="cancel-icon"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountAddress;
