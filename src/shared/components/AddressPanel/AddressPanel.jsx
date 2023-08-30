import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { axiosInstance } from "@/shared/api/axios";
import { userEndpoints } from "@/shared/api/endpoints";
import { getAddresses } from "@/shared/store/slices/addressSlice";
import { notify } from "@/shared/utils/notifyToast";
import AddressForm from "../AddressForm/AddressForm";
import "./AddressPanel.scss";

const AddressPanel = ({ address }) => {
    const [isEditAddressPopup, setIsEditAddressPopup] = useState(false);
    const dispatch = useDispatch();

    //Function to toggle add/edit form modal
    const toggleEditAddressPopup = () => {
        document.body.classList.toggle("modal-open");
        setIsEditAddressPopup((prev) => !prev);
    };

    //Function to delete existing address
    const addressDeleteHandler = (addressId) => {
        axiosInstance
            .delete(`${userEndpoints.deleteAddressById}?id=${addressId}`)
            .then((res) => {
                dispatch(getAddresses());
                notify.successToast(res.data.message);
            })
            .catch((error) => {
                notify.errorToast(error.response.data.message);
            });
    };

    // Function to change default address
    const makeAddressDefaultHandler = (addressId) => {
        const payload = { id: addressId };
        axiosInstance
            .put(userEndpoints.makeDefaultAddress, payload)
            .then((res) => {
                dispatch(getAddresses());
                notify.successToast(res.data.message);
            })
            .catch((error) => {
                notify.errorToast(error.response.data.message);
            });
    };
    return (
        <>
            <div className="address-wrapper">
                <div className="ltl-block">
                    <h3>{address.firstName + " " + address.lastName}</h3>
                    <span className="mobile">
                        {address.countryCode + " " + address.mobile}
                    </span>
                    <address className="address">
                        {address.flat_House_no_Building_Company_Apartment},
                        &nbsp;
                        {address.area_Street_Sector_Village}, &nbsp;
                        {address.landmark} <br />
                        {address.town_City}, &nbsp;{address.state}, &nbsp;
                        {address.pinCode}
                        <br />
                    </address>
                </div>
                <div className="rtl-block">
                    <div className="address-place-type">
                        {address.isDefault ? (
                            <span className="select-default">Default</span>
                        ) : null}
                        <span className="place">{address.address_Type}</span>
                    </div>
                    <div className="address-wrap">
                        {!address.isDefault ? (
                            <button
                                onClick={() =>
                                    makeAddressDefaultHandler(address._id)
                                }
                                className="address-btn"
                                aria-label="Make Default"
                                role="button"
                            >
                                Make Default
                            </button>
                        ) : null}
                        <button
                            className="address-btn"
                            onClick={toggleEditAddressPopup}
                            aria-label="Edit"
                            role="button"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => addressDeleteHandler(address._id)}
                            className="address-btn"
                            aria-label="Remove"
                            role="button"
                        >
                            Remove
                        </button>
                    </div>
                </div>
                {isEditAddressPopup && (
                    <div className={`pop-up active`}>
                        <div className="popup-wrapper">
                            <div className="popup-content">
                                <AddressForm
                                    heading={"Edit Address"}
                                    onClose={toggleEditAddressPopup}
                                    id={address._id}
                                />
                            </div>
                        </div>
                        <button
                            onClick={toggleEditAddressPopup}
                            className="close-btn"
                            aria-label="cancel icon"
                            role="button"
                        >
                            <i className="cancel-icon"></i>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default AddressPanel;
