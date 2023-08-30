import React, { useEffect, useState } from "react";

import "./YearRange.scss";
import { useDispatch } from "react-redux";
import { addFilter } from "@/shared/store/slices/filterSlice";
import { Range, getTrackBackground } from "react-range";

const YearRange = (props) => {
    const [values, setValues] = useState([props?.minYear, props?.maxYear]);
    const dispatch = useDispatch();
    let MIN = props.minYear;
    let MAX = props.maxYear;
    const STEP = 1;

    useEffect(() => {
        setValues([props.minYear, props.maxYear]);
    }, [props.minYear, props.maxYear]);

    //For min range thumb
    const startRangeChangeHandler = (val) => {
        const payload = {
            filterType: "fromYear",
            filters: String(val[0]),
        };
        if (String(val[0]) != String(val[1])) {
            setValues(val);
            dispatch(addFilter(payload));
        }
    };

    //For max range thumb
    const endRangeChangeHandler = (val) => {
        const payload = {
            filterType: "toYear",
            filters: String(val[1]),
        };
        if (String(val[0]) != String(val[1])) {
            setValues(val);
            dispatch(addFilter(payload));
        }
    };

    if (MIN === MAX) {
        return <></>;
    }

    return (
        <div className="filter-box range-filter-head" style={props.style}>
            <h4>Year</h4>
            <div className="range">
                <div className="range-wrapper">
                    <span className="range-value">{values[0]}</span>
                    <span className="range-value">{values[1]}</span>
                </div>
                <Range
                    values={values}
                    step={STEP}
                    min={props.minYear}
                    max={props.maxYear}
                    onChange={startRangeChangeHandler}
                    onFinalChange={endRangeChangeHandler}
                    autoHide
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
                    <span className="price">From</span>
                    <span className="price">To</span>
                </div>
            </div>
        </div>
    );
};

export default YearRange;
