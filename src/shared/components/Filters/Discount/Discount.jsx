import React from "react";

import { useDispatch, useSelector } from "react-redux";
import Scrollbars from "react-custom-scrollbars-2";

import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import "../BrandFilter/BrandFilter.scss";
import "./Discount.scss";
import { addFilter } from "@/shared/store/slices/filterSlice";

const checkboxData = [
    {
        _id: "70",
        name: "70% & above",
    },
    {
        _id: "60",
        name: "60% & above",
    },
    {
        _id: "50",
        name: "50% & above",
    },
    {
        _id: "40",
        name: "40% & above",
    },
    {
        _id: "30",
        name: "30% & above",
    },
    {
        _id: "20",
        name: "20% & above",
    },
    {
        _id: "10",
        name: "10% & above",
    },
];

const Discount = (props) => {
    const selectedDiscount = useSelector((state) => state.filterSlice.Discount);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        let payload = {
            filterType: "Discount",
        };
        const discount = selectedDiscount?.find(
            (discount) => discount === event.target.value
        );
        if (discount) {
            const discount = selectedDiscount.filter(
                (discount) => discount != event.target.value
            );
            payload = {
                ...payload,
                filters: [...discount],
            };
        } else {
            payload = {
                ...payload,
                filters: selectedDiscount
                    ? [...selectedDiscount, event.target.value]
                    : [event.target.value],
            };
        }
        dispatch(addFilter(payload));
    };
    return (
        <div className="filter-box origin-filter" style={props.style}>
            <h4>Discount</h4>
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
                    {checkboxData?.map((item) => {
                        return (
                            <CustomCheckbox
                                items={item}
                                key={item._id}
                                handleChange={handleChange}
                                checked={selectedDiscount?.includes(item._id)}
                            />
                        );
                    })}
                </Scrollbars>
            </div>
        </div>
    );
};
export default Discount;
