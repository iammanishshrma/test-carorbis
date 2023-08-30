import React, { useEffect, useState } from "react";

import { Dropdown } from "primereact/dropdown";
import { catalogEndPoints } from "@/shared/api/endpoints";
import { notify } from "@/shared/utils/notifyToast";
import { axiosInstance } from "@/shared/api/axios";

import LoaderUi from "@/shared/components/LoaderUi/LoaderUi";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "./SearchFilter.scss";

const SearchFilter = () => {
    const [loader, setLoader] = useState(false);
    const [makeList, setMakeList] = useState([]);
    const [modelList, setModelList] = useState([]);
    const [yearList, setYearList] = useState([]);
    const [variantList, setVariantList] = useState([]);
    const [selectedDropMake, setSelectedDropMake] = useState();
    const [selectedDropModel, setSelectedDropModel] = useState();
    const [selectedDropYear, setSelectedDropYear] = useState();
    const [selectedDropVariant, setSelectedDropVariant] = useState();

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
                        setSelectedDropYear();
                        setVariantList([]);
                        setSelectedDropVariant();

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
                        setSelectedDropYear();
                        break;
                    case "VARIANT":
                        updatedRes = res.data.data.map((listItem) => {
                            return {
                                id: listItem._id,
                                name: listItem.translationData[0].modelName,
                            };
                        });
                        setVariantList(updatedRes);
                        setSelectedDropVariant();
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
        if (makeList.length === 0) {
            getList("MAKE", {
                vehicle: null,
                Id: null,
            });
        }
    }, []);

    const onDropChangeMake = (e) => {
        const payload = {
            vehicle: "MODEL",
            Id: e.value.id,
        };
        getList("MODEL", payload);

        setSelectedDropMake(e.value);
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

        setSelectedDropModel(e.value);
    };
    const onDropChangeYear = (e) => {
        setSelectedDropYear(e.value);
    };
    const onDropChangeVariant = (e) => {
        setSelectedDropVariant(e.value);
    };

    return (
        <>
            {loader ? (
                <div className="loader">
                    <LoaderUi />
                </div>
            ) : null}
            <div className="search-filter">
                <div className="head-wrap">
                    <h2>Select Your Vehicle</h2>
                </div>
                <span className="filter-title mobile-hide">
                    shop for you specific vehicle to find parts that fit.
                </span>
                <div className="select-boxes-wrap select-filter-search">
                    <Dropdown
                        value={selectedDropMake}
                        options={makeList}
                        onChange={onDropChangeMake}
                        optionLabel="name"
                        placeholder="Select Car Make"
                        appendTo="self"
                        className="car-model-wrapper"
                    />
                    <Dropdown
                        value={selectedDropModel}
                        options={modelList}
                        onChange={onDropChangeModel}
                        optionLabel="name"
                        placeholder="Select Car Model"
                        appendTo="self"
                        className="car-model-wrapper"
                    />
                    <Dropdown
                        value={selectedDropYear}
                        options={yearList}
                        onChange={onDropChangeYear}
                        optionLabel="name"
                        placeholder="Select Year"
                        appendTo="self"
                    />
                    <Dropdown
                        value={selectedDropVariant}
                        options={variantList}
                        onChange={onDropChangeVariant}
                        optionLabel="name"
                        placeholder="Select Car Variant"
                        appendTo="self"
                        className="car-model-wrapper"
                    />
                    <input type="submit" value="search" className="btn" />
                </div>
            </div>
        </>
    );
};
export default React.memo(SearchFilter);
