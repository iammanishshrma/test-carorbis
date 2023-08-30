import React, { useEffect, useState } from "react";

import { Dropdown } from "primereact/dropdown";
import { useDispatch, useSelector } from "react-redux";

import { axiosInstance } from "@/shared/api/axios";
import { catalogEndPoints } from "@/shared/api/endpoints";
import LoaderUi from "@/shared/components/LoaderUi/LoaderUi";
import { notify } from "@/shared/utils/notifyToast";
import { addVehicle } from "@/shared/store/slices/garage/garageActions";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "./AddVehicle.scss";

const AddVehicle = ({ closePopUp }) => {
    const [loader, setLoader] = useState(false);
    const [makeList, setMakeList] = useState(null);
    const [modelList, setModelList] = useState([]);
    const [yearList, setYearList] = useState([]);
    const [variantList, setVariantList] = useState([]);
    const [selectedMake, setSelectedMake] = useState(null);
    const [selectedMakeError, setSelectedMakeError] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedModelError, setSelectedModelError] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedYearError, setSelectedYearError] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedVariantError, setSelectedVariantError] = useState(null);
    const dispatch = useDispatch();
    const garageData = useSelector((state) => state.garageList);

    const getList = (listType, payload) => {
        setLoader(true);
        axiosInstance
            .post(catalogEndPoints.makeList, payload)
            .then((res) => {
                let updatedRes;
                switch (listType) {
                    case "MAKE":
                        updatedRes = res.data.data.map((listItem) => {
                            return {
                                id: listItem._id,
                                name: listItem.translationData[0].name,
                            };
                        });
                        setMakeList(updatedRes);
                        break;
                    case "MODEL":
                        updatedRes = res.data.data.map((listItem) => {
                            return {
                                id: listItem._id,
                                name: listItem.translationData[0].modelName,
                            };
                        });
                        setModelList(updatedRes);
                        setYearList([]);
                        setSelectedYear(null);
                        setVariantList([]);
                        setSelectedVariant(null);
                        break;
                    case "YEAR":
                        updatedRes = res.data.data.map((listItem) => {
                            return {
                                id: listItem._id,
                                name: `${listItem.fromYears} -
                                    ${listItem.toYears}`,
                            };
                        });
                        setYearList(updatedRes);
                        setSelectedYear(null);
                        break;
                    case "VARIANT":
                        updatedRes = res.data.data.map((listItem) => {
                            return {
                                id: listItem._id,
                                name: listItem.translationData[0].modelName,
                            };
                        });
                        setVariantList(updatedRes);
                        setSelectedVariant(null);
                        break;
                }
                setLoader(false);
            })
            .catch((error) => {
                setLoader(false);

                notify.errorToast(error.response.data.message);
            });
    };

    useEffect(() => {
        getList("MAKE", {
            vehicle: null,
            Id: null,
        });
    }, []);

    const onDropChangeMake = (e) => {
        const payload = {
            vehicle: "MODEL",
            Id: e.value.id,
        };
        getList("MODEL", payload);

        setSelectedMake(e.value);
    };
    const onDropChangeModel = (e) => {
        const payload = {
            vehicle: "YEAR",
            Id: e.value.id,
        };
        getList("YEAR", payload);
        const payload2 = {
            vehicle: "VARIANT",
            Id: e.value.id,
        };
        getList("VARIANT", payload2);

        setSelectedModel(e.value);
    };
    const onDropChangeYear = (e) => {
        setSelectedYear(e.value);
    };
    const onDropChangeVariant = (e) => {
        setSelectedVariant(e.value);
    };

    const isFormValid = () => {
        return !!(
            selectedMake &&
            selectedModel &&
            selectedYear &&
            selectedVariant
        );
    };

    // Add Vehicle Api
    const addVehicleHandler = () => {
        if (!selectedMake) {
            setSelectedMakeError("Please select make.");
        }
        if (!selectedModel) {
            setSelectedModelError("Please select model.");
        }
        if (!selectedYear) {
            setSelectedYearError("Please select year.");
        }
        if (!selectedVariant) {
            setSelectedVariantError("Please select variant.");
        }
        if (isFormValid()) {
            const payload = {
                makeId: selectedMake.id,
                makeName: selectedMake.name,
                modelId: selectedModel.id,
                modelName: selectedModel.name,
                yearId: selectedYear.id,
                yearName: selectedYear.name,
                variantId: selectedVariant.id,
                variantName: selectedVariant.name,
            };
            dispatch(addVehicle({ ...payload, closePopUp }));
        }
    };

    return (
        <>
            {loader || garageData.loading ? (
                <div className="loader">
                    <LoaderUi />
                </div>
            ) : null}
            <div className="search-filter">
                <div className="head-wrap">
                    <h2>Add Vehicle</h2>
                </div>
                <div className="select-boxes-wrap">
                    <div className="car-dropdown-wrap">
                        <Dropdown
                            value={selectedMake}
                            options={makeList}
                            onChange={onDropChangeMake}
                            optionLabel="name"
                            placeholder="Select Car Make"
                            appendTo="self"
                            className="car-model-wrapper"
                        />
                        {selectedMakeError?.length ? (
                            <span className="error">{selectedMakeError}</span>
                        ) : null}
                    </div>
                    <div className="car-dropdown-wrap">
                        <Dropdown
                            value={selectedModel}
                            options={modelList}
                            onChange={onDropChangeModel}
                            optionLabel="name"
                            placeholder="Select Car Model"
                            appendTo="self"
                            className="car-model-wrapper"
                        />
                        {selectedModelError?.length ? (
                            <span className="error">{selectedModelError}</span>
                        ) : null}
                    </div>
                    <div className="car-dropdown-wrap">
                        <Dropdown
                            value={selectedYear}
                            options={yearList}
                            onChange={onDropChangeYear}
                            optionLabel="name"
                            placeholder="Select Year"
                            appendTo="self"
                        />
                        {selectedYearError?.length ? (
                            <span className="error">{selectedYearError}</span>
                        ) : null}
                    </div>
                    <div className="car-dropdown-wrap">
                        <Dropdown
                            value={selectedVariant}
                            options={variantList}
                            onChange={onDropChangeVariant}
                            optionLabel="name"
                            placeholder="Select Car Variant"
                            appendTo="self"
                            className="car-model-wrapper"
                        />
                        {selectedVariantError?.length ? (
                            <span className="error">
                                {selectedVariantError}
                            </span>
                        ) : null}
                    </div>
                    <button
                        type="button"
                        onClick={addVehicleHandler}
                        className="btn"
                        // disabled={checkFormStatus}
                    >
                        Add vehicle
                    </button>
                </div>
            </div>
        </>
    );
};
export default React.memo(AddVehicle);
