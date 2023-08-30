import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { ScrollPanel } from "primereact/scrollpanel";

import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import { addFilter } from "@/shared/store/slices/filterSlice";
import "../BrandFilter/BrandFilter.scss";
import "./YearFilter.scss";

const YearFilter = (props) => {
    const selectedYears = useSelector((state) => state.filterSlice?.Year);

    const dispatch = useDispatch();

    const handleChange = (event) => {
        let payload = { filterType: "Year" };
        if (selectedYears?.includes(event.target.value)) {
            const years = selectedYears.filter(
                (year) => year != event.target.value
            );
            payload = {
                ...payload,
                filters: [...years],
            };
        } else {
            payload = {
                ...payload,
                filters: selectedYears
                    ? [...selectedYears, event.target.value]
                    : [event.target.value],
            };
        }
        dispatch(addFilter(payload));
    };
    return (
        <div className="filter-box origin-filter" style={props.style}>
            <h4>Year</h4>
            <ScrollPanel className="custom">
                {props?.filterList?.map((item, index) => {
                    return (
                        <CustomCheckbox
                            items={item}
                            key={item._id}
                            handleChange={handleChange}
                        />
                    );
                })}
            </ScrollPanel>
        </div>
    );
};
export default YearFilter;
