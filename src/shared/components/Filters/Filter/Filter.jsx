/* eslint-disable array-callback-return */
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import Scrollbars from "react-custom-scrollbars-2";

import { addFilter } from "@/shared/store/slices/filterSlice";

import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import "./Filter.scss";
import { useWindowSize } from "@/shared/hooks/windowSize";

const Filter = (props) => {
    const filters = useSelector((state) => state.filterSlice);
    const [windowWidth] = useWindowSize();
    const filterType = props.item;
    const dispatch = useDispatch();

    const handleChange = (event) => {
        let payload = {
            filterType,
        };
        if (filters?.[filterType]?.includes(event.target.value)) {
            const filterCategory = filters?.[filterType].filter(
                (item) => item != event.target.value
            );
            payload = {
                ...payload,
                filters: [...filterCategory],
            };
        } else {
            payload = {
                ...payload,
                filters:
                    filters?.[filterType]?.length > 0
                        ? [...filters[filterType], event.target.value]
                        : [event.target.value],
            };
        }
        dispatch(addFilter(payload));
    };
    return (
        <div className="filter-box" style={props.style}>
            <h4>{props.item}</h4>
            <div className="brand-filter-scroll">
                {
                    <Scrollbars
                        autoHide
                        autoHeight
                        autoHeightMin={24}
                        autoHeightMax={windowWidth > 767 ? 268 : "100%"}
                        renderThumbVertical={(props) => (
                            <div {...props} className="thumb-vertical" />
                        )}
                        renderTrackVertical={(props) => (
                            <div {...props} className="track-vertical" />
                        )}
                    >
                        {props.filterList?.map((items, index) => {
                            return (
                                <CustomCheckbox
                                    items={items}
                                    key={index}
                                    handleChange={handleChange}
                                    checked={filters?.[filterType]?.includes(
                                        items._id
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

export default Filter;
