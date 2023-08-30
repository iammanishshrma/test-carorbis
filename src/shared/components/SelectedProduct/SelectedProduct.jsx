import React from "react";

import { useSelector, useDispatch } from "react-redux";

import FilterDropdown from "./FilterDropdown/FilterDropdown";
import SelectedItem from "./SelectedItem/SelectedItem";
import { removeAllFilters } from "@/shared/store/slices/filterSlice";
import "./SelectedProduct.scss";
import AttributeFilter from "../Filters/AttributeFilter/AttributeFilter";

const filterData = [
    {
        name: "Relevance",
        value: null,
    },
    {
        name: "price : low to high",
        value: "Price_low_to_high",
    },
    {
        name: "price : high to low",
        value: "Price_high_to_low",
    },
    {
        name: "Recommended",
        value: "recommended",
    },
    {
        name: "Top Rated",
        value: "top_rated",
    },
    {
        name: "New Arrivals",
        value: "newProduct",
    },
    {
        name: "Discount",
        value: "discount",
    },
];

const SelectedProduct = ({ filterList, clearAllHandler, isListingVisible }) => {
    const selectedFilters = useSelector((state) => state.filterSlice);
    const filters = Object.assign(selectedFilters);
    const finalFilters = [];

    Object.keys(filters)?.forEach((filterType) => {
        if (filterType === "attributesList") {
            const transformedObj = filters?.[filterType].map((item) => {
                const id = item.split("-")[0];
                const value = item.split("-")[1];
                return {
                    type: filterType,
                    id: item,
                    name: `${
                        filterList?.Attribute?.find((ele) => ele._id === id)
                            ?.attributeName
                    }: ${value}`,
                };
            });
            finalFilters.push(...transformedObj);
        } else if (filterType === "Discount") {
            const transformedObj = filters?.[filterType].map((item) => {
                return {
                    type: filterType,
                    id: item,
                    name: `Discount: ${item}% & above`,
                };
            });
            finalFilters.push(...transformedObj);
        } else if (filterType === "universalFit") {
            finalFilters.push({
                type: filterType,
                name: "Universal fit",
            });
        } else if (filterType === "minPrice" || filterType === "maxPrice") {
            finalFilters.push({
                type: filterType,
                name: `${filterType === "minPrice" ? "Min" : "Max"} Price: ${
                    filters?.[filterType]
                }`,
            });
        } else if (
            filterType != "fromYear" &&
            filterType != "toYear" &&
            filterType != "minPrice" &&
            filterType != "maxPrice" &&
            filterType != "sortby" &&
            filterType != "productIdentifier"
        ) {
            const filterObj = filters[filterType]?.map((filter) => {
                const obj = {
                    type: filterType,
                    id: filter,
                    name: filterList[filterType].find(
                        (item) => item._id === filter
                    )?.name,
                };
                return obj;
            });
            finalFilters.push(...filterObj);
        }
    });

    return (
        <div className="selected-product">
            {finalFilters?.length > 0 && (
                <div className="lft-filter">
                    {finalFilters?.length == 0 ||
                    finalFilters == undefined ? null : (
                        <div
                            className="clear-wrapper"
                            onClick={clearAllHandler}
                        >
                            <i className="icon-clear"></i>
                            <button
                                className="clear-all"
                                aria-label="Clear all"
                                role="button"
                            >
                                Clear All
                            </button>
                        </div>
                    )}
                    <SelectedItem selectedData={finalFilters} />
                </div>
            )}
            <FilterDropdown
                filterData={filterData}
                isListingVisible={isListingVisible}
            />
        </div>
    );
};

export default SelectedProduct;
