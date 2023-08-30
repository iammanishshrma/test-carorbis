import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "@/shared/api/axios";
import { catalogEndPoints } from "@/shared/api/endpoints";
import LoaderUi from "@/shared/components/LoaderUi/LoaderUi";
import { notify } from "@/shared/utils/notifyToast";

const GarageCompatibility = ({ productId }) => {
    const garageList = useSelector((state) => state.garageList.garage);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedGarage, setSelectedGarage] = useState(null);
    const [showVehicleList, setShowVehicleList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setSelectedVehicle(garageList?.find((item) => item.isDefault));
    }, [garageList]);

    useEffect(() => {
        if (selectedVehicle) {
            setIsLoading(true);
            const payload = {
                productId,
                garageId: selectedVehicle?._id,
            };
            axiosInstance
                .post(catalogEndPoints.checkVehicleCompatibility, payload)
                .then((res) => {
                    setSelectedGarage(res.data.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                });
        }
    }, [selectedVehicle, productId]);

    // To change selected vehicle
    const togglePopupHandler = () => {
        if (garageList?.length > 1) {
            setShowVehicleList((prev) => !prev);
        } else {
            notify.successToast("Only one vehicle present in garage.");
        }
    };
    const changeVehicleHandler = (garageId) => {
        setSelectedVehicle(garageList?.find((item) => item._id === garageId));
    };
    return (
        <>
            {isLoading && <LoaderUi />}
            {selectedGarage && (
                <div
                    className={`fit-head-wrap ${
                        !selectedGarage.isCompatible ? " not-found-header" : ""
                    }`}
                >
                    <span
                        className={`green-circle ${
                            !selectedGarage.isCompatible ? "red-circle" : ""
                        }`}
                    >
                        <span
                            className={`${
                                selectedGarage.isCompatible
                                    ? "tick-mark"
                                    : "cross"
                            }`}
                        ></span>
                    </span>
                    <p>
                        <span className="vechile-content">
                            {`${
                                selectedGarage.isCompatible
                                    ? "Fits"
                                    : "Does NOT Fit"
                            }  ${selectedGarage.garageDetails.yearName} ${
                                selectedGarage.garageDetails.makeName
                            } ${selectedGarage.garageDetails.modelName}`}
                        </span>
                        <button
                            type="button"
                            className="change-vechile"
                            aria-label="change vechile"
                            onClick={togglePopupHandler}
                        >
                            Change vehicle
                        </button>
                    </p>
                </div>
            )}
            {showVehicleList && (
                <div className="garage-filter-card">
                    <button
                        onClick={() => setShowVehicleList(false)}
                        className="icon-wrap"
                    >
                        <i className="icon-cross"></i>
                    </button>
                    <ul className="change-garage-vechile">
                        {garageList?.map((vehicle) => {
                            return vehicle._id !== selectedVehicle._id ? (
                                <li key={vehicle._id}>
                                    <span className="garage-vechile-name">
                                        {`${vehicle.yearName} ${vehicle.makeName} ${vehicle.modelName}`}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            changeVehicleHandler(vehicle._id)
                                        }
                                        className="select-garage-vechile"
                                    >
                                        Select
                                    </button>
                                </li>
                            ) : (
                                <></>
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
};

export default GarageCompatibility;
