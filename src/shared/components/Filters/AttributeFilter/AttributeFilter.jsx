/* eslint-disable array-callback-return */
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Scrollbars from "react-custom-scrollbars-2";
import { addAttributeFilter } from "@/shared/store/slices/filterSlice";

import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import "../Filter/Filter.scss";

const AttributeFilter = (props) => {
    const { attributeFilters } = props;
    const dispatch = useDispatch();
    const selectedAttributes = useSelector(
        (state) => state.filterSlice.attributesList
    );

    const handleChange = (event) => {
        const payload = event.target.value;
        dispatch(addAttributeFilter(payload));
    };
    return (
        <div className="filter-box" style={props.style}>
            <h4>{attributeFilters.attributeName}</h4>
            <div className="brand-filter-scroll">
                {
                    <Scrollbars
                        autoHide
                        autoHeight
                        autoHeightMin={22}
                        autoHeightMax={268}
                        renderThumbVertical={(props) => (
                            <div {...props} className="thumb-vertical" />
                        )}
                        renderTrackVertical={(props) => (
                            <div {...props} className="track-vertical" />
                        )}
                    >
                        {attributeFilters?.value?.map((item, index) => {
                            console.log(attributeFilters);
                            return (
                                <CustomCheckbox
                                    items={{
                                        _id: attributeFilters.id + "-" + item,
                                        name: item,
                                    }}
                                    key={attributeFilters.id + item}
                                    handleChange={handleChange}
                                    checked={selectedAttributes?.includes(
                                        attributeFilters.id + "-" + item
                                    )}
                                />
                            );
                        })}
                    </Scrollbars>
                }
            </div>
        </div>
    );
};

export default AttributeFilter;
