/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars-2";

import { addFilter } from "@/shared/store/slices/filterSlice";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import "./BrandFilter.scss";

const BrandFilter = (props) => {
    const { brandsFilter } = props;
    const [brandsList, setBrandsList] = useState(null);
    const selectedBrands = useSelector((state) => state.filterSlice.Brand);
    const dispatch = useDispatch();

    useEffect(() => {
        setBrandsList(brandsFilter);
    }, [brandsFilter]);

    const searchFilter = (e) => {
        const filteredList = brandsFilter.filter((item) => {
            return item.name.toLowerCase().includes(e.target.value);
        });
        if (filteredList?.length > 0) {
            setBrandsList(filteredList);
        } else {
            setBrandsList(null);
        }
    };

    const handleChange = (event) => {
        let payload = {
            filterType: "Brand",
        };
        const brand = selectedBrands?.find(
            (brand) => brand === event.target.value
        );
        if (brand) {
            const brands = selectedBrands.filter(
                (brand) => brand != event.target.value
            );
            payload = {
                ...payload,
                filters: [...brands],
            };
        } else {
            payload = {
                ...payload,
                filters: selectedBrands
                    ? [...selectedBrands, event.target.value]
                    : [event.target.value],
            };
        }
        dispatch(addFilter(payload));
    };
    return (
        <div className="filter-box" style={props.style}>
            <h4>Brands</h4>
            {brandsFilter?.length > 5 && (
                <div className="form-block">
                    <input
                        type="text"
                        placeholder="Enter Brand Name"
                        className="form-control"
                        onChange={searchFilter}
                    />
                    <button type="button" aria-label="Search" role="button">
                        <i className="search-icon"></i>
                    </button>
                </div>
            )}
            {brandsList?.length > 0 ? (
                <div className="brand-filter-scroll">
                    {
                        <Scrollbars
                            autoHeight
                            autoHeightMin={24}
                            autoHeightMax={268}
                            autoHide
                            renderThumbVertical={(props) => (
                                <div {...props} className="thumb-vertical" />
                            )}
                            renderTrackVertical={(props) => (
                                <div {...props} className="track-vertical" />
                            )}
                        >
                            {brandsList?.map((item, index) => {
                                return (
                                    <CustomCheckbox
                                        items={item}
                                        key={item._id}
                                        handleChange={handleChange}
                                        checked={selectedBrands?.includes(
                                            item._id
                                        )}
                                    />
                                );
                            })}
                        </Scrollbars>
                    }
                </div>
            ) : (
                <span style={{ padding: "10px 0" }}>Brand not found</span>
            )}
        </div>
    );
};

export default BrandFilter;
