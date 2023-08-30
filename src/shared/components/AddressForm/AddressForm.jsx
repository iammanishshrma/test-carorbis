import React, { useState, useEffect } from "react";
import Link from "next/link";

import { Dropdown } from "primereact/dropdown";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";

import { axiosInstance } from "@/shared/api/axios";
import { userEndpoints } from "@/shared/api/endpoints";
import { notify } from "@/shared/utils/notifyToast";
import { getAddresses } from "@/shared/store/slices/addressSlice";

import LoaderUi from "@/shared/components/LoaderUi/LoaderUi";

import "./AddressForm.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

const STATELIST = [
    {
        label: "Andaman and Nicobar Islands",
        value: "Andaman and Nicobar Islands",
    },
    { label: "Andhra Pradesh", value: "Andhra Pradesh" },
    { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
    { label: "Assam", value: "Assam" },
    { label: "Bihar", value: "Bihar" },
    { label: "Chandigarh", value: "Chandigarh" },
    { label: "Chhattisgarh", value: "Chhattisgarh" },
    { label: "Dadra and Nagar Haveli", value: "Dadra and Nagar Haveli" },
    { label: "Daman and Diu", value: "Daman and Diu" },
    { label: "Delhi", value: "Delhi" },
    { label: "Goa", value: "Goa" },
    { label: "Gujarat", value: "Gujarat" },
    { label: "Haryana", value: "Haryana" },
    { label: "Himachal Pradesh", value: "Himachal Pradesh" },
    { label: "Jammu and Kashmir", value: "Jammu and Kashmir" },
    { label: "Jharkhand", value: "Jharkhand" },
    { label: "Karnataka", value: "Karnataka" },
    { label: "Kerala", value: "Kerala" },
    { label: "Ladakh", value: "Ladakh" },
    { label: "Lakshadweep", value: "Lakshadweep" },
    { label: "Madhya Pradesh", value: "Madhya Pradesh" },
    { label: "Maharashtra", value: "Maharashtra" },
    { label: "Manipur", value: "Manipur" },
    { label: "Meghalaya", value: "Meghalaya" },
    { label: "Mizoram", value: "Mizoram" },
    { label: "Nagaland", value: "Nagaland" },
    { label: "Odisha", value: "Odisha" },
    { label: "Puducherry", value: "Puducherry" },
    { label: "Punjab", value: "Punjab" },
    { label: "Rajasthan", value: "Rajasthan" },
    { label: "Sikkim", value: "Sikkim" },
    { label: "Tamil Nadu", value: "Tamil Nadu" },
    { label: "Telangana", value: "Telangana" },
    { label: "Tripura", value: "Tripura" },
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    { label: "Uttarakhand", value: "Uttarakhand" },
    { label: "West Bengal", value: "West Bengal" },
];

const SCHEMA = yup.object({
    firstName: yup.string().required("First name is a required field."),
    lastName: yup.string().required("Last name is a required field."),
    email: yup
        .string()
        .required("Email is a required field.")
        .email("Please enter a valid email."),
    mobile: yup
        .string()
        .required("Mobile is a required field.")
        .min(10, "Mobile must be atleast 10 characters long.")
        .max(10, "Mobile must be atmost 10 characters long."),
    flat_House_no_Building_Company_Apartment: yup
        .string()
        .required("Please enter flat, house number, floor or building."),
    area_Street_Sector_Village: yup
        .string()
        .required("Please enter area, street, sector or village."),
    landmark: yup.string(),
    pinCode: yup
        .string()
        .required("Pin is a required field.")
        .min(6, "Pin must be at least 6 characters long."),
    town_City: yup.string().required("Town/City is a required field."),
    isDefault: yup.bool().oneOf([true, false]),
    // state: yup.string().required('State is a required field.'),
});

const AddressForm = (props) => {
    const { heading, onClose, id: editAddressId } = props;

    const [selectedState, setSelectedState] = useState();
    const [isStateSelected, setIsStateSelected] = useState(true);
    const [addressType, setAddressType] = useState("home");
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(SCHEMA),
    });

    // To fetch existing address base on id and set values in form
    useEffect(() => {
        if (editAddressId) {
            const payload = { id: editAddressId };
            axiosInstance
                .post(userEndpoints.getAddressById, payload)
                .then((res) => {
                    const existingAddress = res.data.data;
                    setValue("firstName", existingAddress.firstName);
                    setValue("lastName", existingAddress.lastName);
                    setValue("email", existingAddress.email);
                    setValue("mobile", existingAddress.mobile);
                    setValue(
                        "flat_House_no_Building_Company_Apartment",
                        existingAddress.flat_House_no_Building_Company_Apartment
                    );
                    setValue(
                        "area_Street_Sector_Village",
                        existingAddress.area_Street_Sector_Village
                    );
                    setValue("landmark", existingAddress.landmark);
                    setValue("pinCode", existingAddress.pinCode);
                    setValue("town_City", existingAddress.town_City);
                    setValue("isDefault", existingAddress.isDefault);
                    setAddressType(existingAddress.address_Type);
                    setSelectedState(existingAddress.state);
                })
                .catch((error) => {
                    notify.errorToast(error.response.data.message);
                });
        }
    }, [editAddressId]);

    // Address type radio change handler
    const addressTypeChangeHanlder = (event) => {
        const type = event.target.value;
        setAddressType(type);
    };

    // State dropdown change handler
    const stateChangeHandler = (event) => {
        const state = event.value;
        if (state) {
            setSelectedState(state);
            setIsStateSelected(true);
        } else {
            setIsStateSelected(false);
        }
    };

    const submitHandler = (data) => {
        setIsLoading(true);
        if (!selectedState) {
            return setIsStateSelected(false);
        }
        const payload = {
            ...data,
            address_Type: addressType,
            state: selectedState,
            countryCode: "+91",
        };

        //Api to edit existing address
        if (editAddressId) {
            payload.id = editAddressId;
            delete payload.countryCode;
            return axiosInstance
                .put(userEndpoints.editAddress, payload)
                .then((res) => {
                    dispatch(getAddresses());
                    notify.successToast(res.data.message);
                    onClose();
                })
                .catch((error) => {
                    notify.errorToast(error.response.data.message);
                });
        }

        // Api to add new address
        axiosInstance
            .post(userEndpoints.addAddress, payload)
            .then((res) => {
                dispatch(getAddresses());
                notify.successToast(res.data.message);
                setIsLoading(false);

                onClose();
            })
            .catch((error) => {
                notify.errorToast(error.response.data.message);
                setIsLoading(false);
            });
    };
    return (
        <>
            {isLoading && <LoaderUi />}
            <div className="account-form-wrap address-form-wrap">
                <div className="desk-hide cart-fixed-wrp add-address-btn">
                    <Link
                        href="/checkout-payment"
                        className="order-proceed"
                        aria-label="Proceed to pay"
                    >
                        ADD ADDRESS
                    </Link>
                </div>
                <div className="form-heading checkout-form-head">
                    <h2>{heading}</h2>
                    <button className="btn-cancel" onClick={onClose}>
                        <i className="icon-cancel"></i>
                    </button>
                </div>
                <div className="form-wrap">
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="input-wrapper">
                            <div className="form-block">
                                <label className="input-label">
                                    First Name
                                    <span className="required-field">*</span>
                                </label>
                                <input
                                    {...register("firstName")}
                                    className="form-control error-border"
                                    placeholder="Enter First name"
                                />
                                {errors.firstName && (
                                    <span className="error-msg">
                                        {errors.firstName.message}
                                    </span>
                                )}
                            </div>
                            <div className="form-block">
                                <label className="input-label">
                                    Last Name
                                    <span className="required-field">*</span>
                                </label>
                                <input
                                    {...register("lastName")}
                                    className="form-control error-border"
                                    placeholder="Enter last name"
                                />
                                {errors.lastName && (
                                    <span className="error-msg">
                                        {errors.lastName.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <div className="form-block">
                                <label className="input-label">
                                    Email
                                    <span className="required-field">*</span>
                                </label>
                                <input
                                    {...register("email")}
                                    className="form-control"
                                    placeholder="yourmail@example.com"
                                    type="email"
                                />
                                {errors.email && (
                                    <span className="error-msg">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                            <div className="form-block">
                                <label className="input-label">
                                    Mobile
                                    <span className="required-field">*</span>
                                </label>
                                <div className="mobile-field type-number">
                                    <input
                                        {...register("mobile")}
                                        className="form-control"
                                        placeholder="Enter 10 digit mobile no."
                                        type="number"
                                    />
                                    {errors.mobile && (
                                        <span className="error-msg">
                                            {errors.mobile.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="form-block">
                            <label className="input-label">
                                Address<span className="required-field">*</span>
                            </label>
                            <div className="mobile-field">
                                <div className="form-block">
                                    <input
                                        {...register(
                                            "flat_House_no_Building_Company_Apartment"
                                        )}
                                        className="form-control"
                                        placeholder="Flat, House No., Floor, Building"
                                    />
                                    {errors.flat_House_no_Building_Company_Apartment && (
                                        <span className="error-msg">
                                            {
                                                errors
                                                    .flat_House_no_Building_Company_Apartment
                                                    .message
                                            }
                                        </span>
                                    )}
                                </div>
                                <div className="form-block">
                                    <input
                                        {...register(
                                            "area_Street_Sector_Village"
                                        )}
                                        className="form-control"
                                        placeholder="Colony/Street/Locality"
                                    />
                                    {errors.area_Street_Sector_Village && (
                                        <span className="error-msg">
                                            {
                                                errors
                                                    .area_Street_Sector_Village
                                                    .message
                                            }
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="form-block">
                            <label className="input-label">Landmark</label>
                            <div className="mobile-field">
                                <input
                                    {...register("landmark")}
                                    className="form-control"
                                    placeholder="Eg. near apollo hospital"
                                />
                                {errors.landmark && (
                                    <span className="error-msg">
                                        {errors.landmark.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <div className="form-block type-number">
                                <label className="input-label">
                                    Pincode
                                    <span className="required-field">*</span>
                                </label>
                                <input
                                    {...register("pinCode")}
                                    className="form-control"
                                    placeholder="Enter 6 digit pincode"
                                    type="number"
                                />
                                {errors.pinCode && (
                                    <span className="error-msg">
                                        {errors.pinCode.message}
                                    </span>
                                )}
                            </div>
                            <div className="form-block">
                                <label className="input-label">
                                    Town/City
                                    <span className="required-field">*</span>
                                </label>
                                <input
                                    {...register("town_City")}
                                    className="form-control"
                                    placeholder="Enter town/city"
                                />
                                {errors.town_City && (
                                    <span className="error-msg">
                                        {errors.town_City.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="form-block select-wrap">
                            <div className="select-wrapper">
                                <label className="input-label">
                                    State
                                    <span className="required-field">*</span>
                                </label>
                                <Dropdown
                                    value={selectedState}
                                    options={STATELIST}
                                    onChange={stateChangeHandler}
                                    placeholder="Select"
                                />
                                {!isStateSelected && (
                                    <span className="error-msg">
                                        Please select a state.
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="address-select-wrap">
                            <h2>
                                Address Type
                                <span className="required-field">*</span>
                            </h2>
                            <div className="address-type-wrap">
                                <div className="radio-wrapper">
                                    <input
                                        type="radio"
                                        onChange={addressTypeChangeHanlder}
                                        value={"home"}
                                        name="addres-type"
                                        checked={addressType === "home"}
                                    />
                                    <span className="custom-radio">Home</span>
                                </div>
                                <div className="radio-wrapper">
                                    <input
                                        type="radio"
                                        onChange={addressTypeChangeHanlder}
                                        value={"office"}
                                        name="addres-type"
                                        checked={addressType === "office"}
                                    />
                                    <span className="custom-radio">Office</span>
                                </div>
                                <div className="radio-wrapper">
                                    <input
                                        type="radio"
                                        onChange={addressTypeChangeHanlder}
                                        value={"other"}
                                        name="addres-type"
                                        checked={addressType === "other"}
                                    />
                                    <span className="custom-radio">Other</span>
                                </div>
                            </div>
                        </div>
                        <div className="quick-signup">
                            <div className="custom-check">
                                <input
                                    {...register("isDefault")}
                                    className="check-custom"
                                    type="checkbox"
                                />
                                {errors.isDefault && (
                                    <span className="error-msg">
                                        {errors.isDefault.message}
                                    </span>
                                )}
                                <span className="custom-mark"></span>
                            </div>
                            <div className="signup-text">
                                <div className="heading-text">
                                    <h4>Make this my default address</h4>
                                </div>
                            </div>
                        </div>
                        <div className="add-form-btns">
                            <div className="btn-wrapper">
                                <button
                                    className="save"
                                    aria-label="Save"
                                    role="button"
                                >
                                    Save
                                </button>
                                <button
                                    className="cancel"
                                    type="button"
                                    onClick={onClose}
                                    aria-label="Cancel"
                                    role="button"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default AddressForm;
