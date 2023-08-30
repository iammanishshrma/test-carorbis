import React from "react";

import { ScrollPanel } from "primereact/scrollpanel";
import { useDispatch, useSelector } from "react-redux";

import { removeFilter } from "@/shared/store/slices/filterSlice";

import "./SelectedItem.scss";

const SelectedItem = (props) => {
    const selectedData = props.selectedData;
    const dispatch = useDispatch();

    const removeFilterHandler = (item) => {
        dispatch(removeFilter(item));
    };
    return (
        <>
            {selectedData ? (
                <ScrollPanel className="selected-item-wrap">
                    <ul className="selected-item">
                        {selectedData?.map((item, index) => {
                            return (
                                <li key={index}>
                                    <span className="item-name">
                                        {item.name}
                                    </span>
                                    <button
                                        onClick={() =>
                                            removeFilterHandler(item)
                                        }
                                        aria-label="Cancel"
                                        role="button"
                                    >
                                        <i className="cancel-icon"></i>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </ScrollPanel>
            ) : null}
        </>
    );
};

export default SelectedItem;
