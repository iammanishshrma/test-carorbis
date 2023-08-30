import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addSorting } from "@/shared/store/slices/filterSlice";

import "./FilterDropdown.scss";

const FilterDropdown = ({ filterData, setSortBy, isListingVisible }) => {
    const [data, setData] = useState(filterData[0]);
    const [initial, setInitial] = useState(false);
    const dispatch = useDispatch();

    // close dropdown on outside click
    const ref = useRef();
    useEffect(() => {
        const checkIfClickOutSide = (e) => {
            if (!ref.current.contains(e.target)) {
                setInitial(false);
            }
        };
        // Add clicked event
        document.addEventListener("click", checkIfClickOutSide);
        return () => {
            document.removeEventListener("click", checkIfClickOutSide);
        };
    }, [initial]);

    const handleClick = (e) => {
        if (e != data) {
            setData(e);
            setInitial(false);
            dispatch(addSorting(e.value));
            if (setSortBy) {
                setSortBy(e.value);
            }
        }
    };
    const closeDropdown = () => {
        setInitial(!initial);
    };
    return (
        <div className="selector-wrapp" ref={ref}>
            {isListingVisible && (
                <div className="filter-selected" onClick={closeDropdown}>
                    <div className="text-sort">
                        <span className="sort-btn">Sort by : </span>
                        <span className="selected-value">{data.name}</span>
                    </div>
                    <i className="dropdown-icon"></i>
                </div>
            )}
            {initial && (
                <ul className="menu-wrapper">
                    {filterData?.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={
                                    data === item.name
                                        ? "active"
                                        : "filter-list"
                                }
                            >
                                <div
                                    className="select-menu"
                                    onClick={() => handleClick(item)}
                                >
                                    {item.name}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default FilterDropdown;
