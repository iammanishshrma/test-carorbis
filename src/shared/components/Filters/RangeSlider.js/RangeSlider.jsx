import React, { useEffect, useState } from "react";

import "./RangeSlider.scss";
import { useDispatch, useSelector } from "react-redux";
import { addFilter } from "@/shared/store/slices/filterSlice";
import { Range, getTrackBackground } from "react-range";

const RangeSlider = (props) => {
    const selectedFilters = useSelector((state) => state.filterSlice);
    const [values, setValues] = useState([props.minPrice, props.maxPrice]);
    const dispatch = useDispatch();
    let MIN = props.minPrice || 1;
    let MAX = props.maxPrice || 9999;
    const STEP = 100;

    useEffect(() => {
        if (selectedFilters.minPrice && selectedFilters.maxPrice) {
            setValues([selectedFilters.minPrice, selectedFilters.maxPrice]);
        } else if (selectedFilters.minPrice) {
            setValues([selectedFilters.minPrice, props.maxPrice]);
        } else if (selectedFilters.maxPrice) {
            setValues([props.minPrice, selectedFilters.maxPrice]);
        } else {
            setValues([props.minPrice, props.maxPrice]);
        }
    }, [
        props.minPrice,
        props.maxPrice,
        selectedFilters.minPrice,
        selectedFilters.maxPrice,
    ]);

    //For min range thumb
    const startRangeChangeHandler = (val) => {
        const payload = {
            filterType: "minPrice",
            filters: val[0],
        };
        if (val[0] != val[1]) {
            setValues(val);
            dispatch(addFilter(payload));
        }
    };

    //For max range thumb
    const endRangeChangeHandler = (val) => {
        const payload = {
            filterType: "maxPrice",
            filters: val[1],
        };
        if (val[0] != val[1]) {
            setValues(val);
            dispatch(addFilter(payload));
        }
    };

    if (MIN === MAX) {
        return <></>;
    }

    return (
        <div className="filter-box range-filter-head" style={props.style}>
            <h4>Price Range</h4>
            <div className="range">
                <div className="range-wrapper">
                    <span className="range-value">&#8377; {values[0]}</span>
                    <span className="range-value">&#8377; {values[1]}</span>
                </div>
                <Range
                    values={values}
                    step={STEP}
                    min={props.minPrice}
                    max={props.maxPrice}
                    onChange={startRangeChangeHandler}
                    onFinalChange={endRangeChangeHandler}
                    renderTrack={({ props, children }) => (
                        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: "33px",
                                display: "flex",
                                width: "100%",
                                margin: "0 4px",
                            }}
                            className="rnge-wrp-new"
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: "4px",
                                    width: "100%",
                                    borderRadius: "4px",
                                    background: getTrackBackground({
                                        values: values,
                                        colors: [
                                            "#D6D9DE",
                                            "#0D1E70",
                                            "#D6D9DE",
                                        ],
                                        min: MIN,
                                        max: MAX,
                                    }),
                                    alignSelf: "center",
                                }}
                                className="range-line"
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "24px",
                                width: "24px",
                                borderRadius: "50%",
                                backgroundColor: " #0D1E70",
                                border: "2px solid #FFFFFF",
                            }}
                            className="range-circle"
                        />
                    )}
                />

                <div className="range-type">
                    <span className="price">Minimum</span>
                    <span className="price">Maximum</span>
                </div>
            </div>
        </div>
    );
};

export default RangeSlider;
