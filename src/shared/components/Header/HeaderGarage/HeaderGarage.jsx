import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import {
    deleteVehicle,
    getGarageList,
} from "@/shared/store/slices/garage/garageActions";
import { maxGarage } from "@/shared/utils/constants";
import useOutsideClick from "@/shared/hooks/outsideClickHandler";

import AddVehicle from "./AddVehicle/AddVehicle";
import ConfirmBox from "@/shared/components/ConfirmBox/ConfirmBox";
import LoaderUi from "@/shared/components/LoaderUi/LoaderUi";

import SearchIcon from "@/shared/assets/images/my-garage-new.svg";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "./HeaderGarage.scss";

const HeaderGarage = () => {
    const [showAddVehicle, setShowAddVehicle] = useState(false);
    const [initial, setInitial] = useState(false);
    const addPopupRef = useRef();
    const ref = useRef();
    const dispatch = useDispatch();
    const garageData = useSelector((state) => state.garageList);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const isLoggedIn = useSelector(
        (state) => state.checkLoginSlice?.isLoggedIn
    );
    const isLoading = useSelector((state) => state.garageSlice?.loading);
    const router = useRouter();

    useOutsideClick(addPopupRef, () => {
        setShowAddVehicle(false);
        document.body.classList.remove("modal-open");
    });

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getGarageList());
        }
    }, [isLoggedIn, dispatch]);

    const openPopUp = () => {
        if (!isLoggedIn) {
            return router.push("/sign-in");
        }
        setShowAddVehicle(true);
        document.body.classList.add("modal-open");
        setInitial(false);
    };
    const closePopUp = () => {
        setShowAddVehicle(false);
        document.body.classList.toggle("modal-open");
        document.body.classList.toggle("is-sticky");
    };

    //* Toggle delete confirm box
    const toggleConfirmBox = () => {
        setShowConfirmBox((prev) => !prev);
    };

    //* Dispatching delete vehicle action to store
    const deleteVehicleHandler = (payload) => {
        dispatch(deleteVehicle(payload));
    };

    return (
        <>
            {isLoading && <LoaderUi />}
            <div
                className="garage-wrap icons-boxes"
                ref={ref}
                onMouseEnter={() => setInitial(true)}
                onMouseLeave={() => setInitial(false)}
            >
                <div className="garage-icon" style={{ position: "relative" }}>
                    <Image
                        src={SearchIcon.src}
                        width={26}
                        height={24}
                        priority
                        alt="garage-icon"
                    />
                </div>
                <div className="account-wrapper">
                    <span className="garage-title">My Garage</span>
                    <div
                        className={`menu-wrraper garage-menu-wrap ${
                            initial ? "menu-active" : ""
                        }`}
                    >
                        <button
                            className="search-back"
                            onClick={() => setInitial(false)}
                            aria-label="Search back"
                            role="button"
                        >
                            <i className="icon-back"></i>
                        </button>
                        <div className="product-wrp">
                            <h3>My Garage</h3>
                            {isLoggedIn && garageData?.garage?.length > 1 && (
                                <button
                                    className="clear-all"
                                    aria-label="Clear all"
                                    role="button"
                                    onClick={toggleConfirmBox}
                                >
                                    Clear All
                                </button>
                            )}
                        </div>
                        <div className="marked-product-wrap">
                            {garageData?.garage?.map((vehicle) => {
                                return (
                                    <div
                                        className="product-listing"
                                        key={vehicle._id}
                                    >
                                        <span className="product-desc">
                                            {`${vehicle.makeName} ${vehicle.modelName} ${vehicle.variantName} ${vehicle.yearName}`}
                                        </span>
                                        <div className="delete-wrp">
                                            <div
                                                className="delete-default-icon"
                                                onClick={() =>
                                                    deleteVehicleHandler({
                                                        itemId: vehicle._id,
                                                        action: "delete",
                                                    })
                                                }
                                            >
                                                <svg
                                                    width="16"
                                                    height="18"
                                                    viewBox="0 0 16 18"
                                                    fill="red"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M9.46094 13.9375H10.2578C10.457 13.9375 10.6562 13.7715 10.6562 13.5391V6.36719C10.6562 6.16797 10.457 5.96875 10.2578 5.96875H9.46094C9.22852 5.96875 9.0625 6.16797 9.0625 6.36719V13.5391C9.0625 13.7715 9.22852 13.9375 9.46094 13.9375ZM14.9062 2.78125H12.1504L11.0215 0.921875C10.7559 0.457031 10.2246 0.125 9.66016 0.125H6.30664C5.74219 0.125 5.21094 0.457031 4.94531 0.921875L3.81641 2.78125H1.09375C0.794922 2.78125 0.5625 3.04688 0.5625 3.3125V3.84375C0.5625 4.14258 0.794922 4.375 1.09375 4.375H1.625V15.5312C1.625 16.4277 2.32227 17.125 3.21875 17.125H12.7812C13.6445 17.125 14.375 16.4277 14.375 15.5312V4.375H14.9062C15.1719 4.375 15.4375 4.14258 15.4375 3.84375V3.3125C15.4375 3.04688 15.1719 2.78125 14.9062 2.78125ZM6.24023 1.81836C6.27344 1.78516 6.33984 1.71875 6.40625 1.71875C6.40625 1.71875 6.40625 1.71875 6.43945 1.71875H9.56055C9.62695 1.71875 9.69336 1.78516 9.72656 1.81836L10.291 2.78125H5.67578L6.24023 1.81836ZM12.7812 15.5312H3.21875V4.375H12.7812V15.5312ZM5.74219 13.9375H6.53906C6.73828 13.9375 6.9375 13.7715 6.9375 13.5391V6.36719C6.9375 6.16797 6.73828 5.96875 6.53906 5.96875H5.74219C5.50977 5.96875 5.34375 6.16797 5.34375 6.36719V13.5391C5.34375 13.7715 5.50977 13.9375 5.74219 13.9375Z"
                                                        fill="#495057"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {garageData.garage === null && (
                            <button
                                type="button"
                                className="add-product"
                                onClick={openPopUp}
                                aria-label="add product"
                                role="button"
                            >
                                Add Vehicle
                            </button>
                        )}
                        <div className="no-data">
                            {garageData?.garage?.length < maxGarage && (
                                <button
                                    type="button"
                                    className="add-product"
                                    onClick={openPopUp}
                                    aria-label="add product"
                                    role="button"
                                >
                                    Add Vehicle
                                </button>
                            )}
                            {(garageData?.garage?.length === 0 ||
                                !isLoggedIn) && (
                                <ul className="no-data-content">
                                    <li>
                                        <i className="icon-store"></i>Store
                                        vehicles in your garage
                                    </li>
                                    <li>
                                        <i className="get-notification"></i>
                                        Get product recommendations
                                    </li>
                                    <li>
                                        <i className="easy-accessories"></i>
                                        Easily find parts & accessories
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
                {showAddVehicle && (
                    <div className={`pop-up ${showAddVehicle ? "active" : ""}`}>
                        <div ref={addPopupRef} className="garage-popup-box">
                            <div className="popup-wrapper">
                                <div className="popup-content">
                                    <AddVehicle closePopUp={closePopUp} />
                                </div>
                            </div>
                            <button
                                onClick={closePopUp}
                                className="close-btn"
                                aria-label="Close"
                                role="button"
                            >
                                <i className="cancel-icon"></i>
                            </button>
                        </div>
                    </div>
                )}

                {showConfirmBox && (
                    <ConfirmBox
                        heading={
                            "Are you sure you want to delete all vehicles?"
                        }
                        onConfirm={() => {
                            deleteVehicleHandler({
                                action: "deleteAll",
                            });
                            toggleConfirmBox();
                        }}
                        onCancel={toggleConfirmBox}
                    />
                )}
            </div>
        </>
    );
};
export default HeaderGarage;
