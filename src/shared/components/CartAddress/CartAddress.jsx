import React, { useEffect, useState } from "react";
import AddressForm from "../AddressForm/AddressForm";
import "./CartAddress.scss";
import { axiosInstance } from "@/shared/api/axios";
import { userEndpoints } from "@/shared/api/endpoints";
import { notify } from "@/shared/utils/notifyToast";
import { useDispatch } from "react-redux";
import { getAddresses } from "@/shared/store/slices/addressSlice";

const CartAddress = ({ addressList, onAddressChange, selectedAddress }) => {
    const [editState, setEditState] = useState(false);
    const [editAddressId, setEditAddressId] = useState(null);
    const dispatch = useDispatch();

    const addressDeleteHandler = (addressId) => {
        axiosInstance
            .delete(`${userEndpoints.deleteAddressById}?id=${addressId}`)
            .then((res) => {
                notify.successToast(res.data.message);
                dispatch(getAddresses());
                onAddressChange(null);
            })
            .catch((error) => {
                notify.errorToast(error.response.data.message);
            });
    };

    const editAddressHandler = (id) => {
        setEditAddressId(id);
        setEditState(true);
    };

    return (
        <>
            {!editState ? (
                <div className="cart-address-block">
                    <div className="input-address">
                        <input
                            type="radio"
                            className="address-radio"
                            defaultChecked={
                                addressList?._id === selectedAddress
                            }
                            name={"selected-address"}
                            onChange={() => onAddressChange(addressList?._id)}
                        />
                        <div className="address-content">
                            <div className="address-checkbox">
                                <div className="checkbox-circle"></div>
                            </div>
                            <div className="address-text">
                                <div className="address-data">
                                    <h3>
                                        {addressList?.firstName +
                                            " " +
                                            addressList?.lastName}
                                    </h3>
                                    <span className="address-place">
                                        {addressList?.address_Type}
                                    </span>
                                </div>
                                {/* <span className="mob-number">
                                    {addressList?.mobile}
                                </span> */}
                                <div className="location-add-wrp">
                                    <div className="location-address">
                                        {/* <i className="icon-address"></i> */}
                                        {`${addressList?.flat_House_no_Building_Company_Apartment},  ${addressList?.area_Street_Sector_Village}, ${addressList?.town_City}, ${addressList?.state}, ${addressList?.pinCode}`}
                                    </div>
                                    <div className="mobile-number-wrp">
                                        Mobile:
                                        <span className="mob-number">
                                            {addressList.mobile}
                                        </span>
                                    </div>
                                </div>
                                <div className="address-action-wrap">
                                    <div className="delievry-notification">
                                        {addressList?._id ===
                                            selectedAddress && (
                                            <span
                                                span
                                                className="deliver-address"
                                            >
                                                Delivering here
                                            </span>
                                        )}
                                        {addressList?._id ===
                                            selectedAddress && (
                                            <button
                                                className="edit-btn desk-hide"
                                                onClick={() =>
                                                    setEditState(true)
                                                }
                                                aria-label="Edit"
                                                role="button"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                    {addressList?._id === selectedAddress && (
                                        <button
                                            className="delete-btn desk-hide"
                                            onClick={() =>
                                                addressDeleteHandler(
                                                    addressList._id
                                                )
                                            }
                                        >
                                            <i className="icon-delete"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {addressList?._id === selectedAddress && (
                        <button
                            className="edit-desk-btn mob-hide"
                            onClick={() => editAddressHandler(addressList._id)}
                            aria-label="Edit"
                            role="button"
                        >
                            <i className="icon-edit"></i>
                        </button>
                    )}
                    {addressList?._id === selectedAddress && (
                        <button
                            className="delete-btn mob-hide"
                            onClick={() =>
                                addressDeleteHandler(addressList._id)
                            }
                        >
                            <i className="icon-delete"></i>
                        </button>
                    )}
                </div>
            ) : editAddressId ? (
                <AddressForm
                    id={editAddressId}
                    onClose={() => setEditState(false)}
                    heading={"Edit Address"}
                />
            ) : null}
        </>
    );
};

export default CartAddress;
