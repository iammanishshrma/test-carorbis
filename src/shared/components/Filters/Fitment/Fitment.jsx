import React from "react";

import { useDispatch, useSelector } from "react-redux";
import Scrollbars from "react-custom-scrollbars-2";

import CustomRadio from "../CustomRadio/CustomRadio";
import { addFitment, removeFitment } from "@/shared/store/slices/filterSlice";
import "../BrandFilter/BrandFilter.scss";
import "./Fitment.scss";

const radioData = [
    {
        name: "Universal Fit",
        value: "Universal Fit",
    },
    {
        name: "Specific Fit",
        value: "Specific Fit",
    },
];
const Fitment = (props) => {
    const isUniversalFit = useSelector(
        (state) => state.filterSlice.universalFit
    );
    const dispatch = useDispatch();
    const handleChange = (event) => {
        let payload = {
            filterType: "universalFit",
        };
        dispatch(addFitment(payload));
    };
    return (
        <div className="filter-box checkbox-wrap" style={props.style}>
            <h4>Fitment</h4>

            <div className="brand-filter-scroll">
                <Scrollbars
                    autoHide
                    autoHeight
                    autoHeightMin={24}
                    autoHeightMax={268}
                    renderThumbVertical={(props) => (
                        <div {...props} className="thumb-vertical" />
                    )}
                    renderTrackVertical={(props) => (
                        <div {...props} className="track-vertical" />
                    )}
                >
                    {radioData?.map((item, index) => {
                        console.log(radioData);
                        return (
                            <CustomRadio
                                items={item}
                                key={index}
                                value={item.name}
                                name={"radio"}
                                onChange={handleChange}
                                checked={
                                    item.name === "Universal Fit" &&
                                    isUniversalFit
                                }
                            />
                        );
                    })}
                </Scrollbars>
            </div>
        </div>
    );
};

export default Fitment;
