import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import Filter from "../Filter/Filter";
import BrandFilter from "../BrandFilter/BrandFilter";
import RangeSlider from "../RangeSlider.js/RangeSlider";
import YearRange from "../YearRange/YearRange";
import AttributeFilter from "../AttributeFilter/AttributeFilter";
import { removeAttributeById } from "@/shared/store/slices/filterSlice";

import Fitment from "../Fitment/Fitment";
import Scrollbars from "react-custom-scrollbars-2";
import Discount from "../Discount/Discount";

const checkOtherFilters = (filter) => {
    if (
        filter.toLowerCase() === "attribute" ||
        filter.toLowerCase() === "brand" ||
        filter.toLowerCase() === "minprice" ||
        filter.toLowerCase() === "maxprice" ||
        filter.toLowerCase() === "year" ||
        filter.toLowerCase() === "attributevariant"
    ) {
        return true;
    } else {
        return false;
    }
};

const FilterDataMob = ({ filterList, attributes, toggleFilterHandler }) => {
    const [activeFilterTab, setActiveFilterTab] = useState("budget");
    const attributeFilters = useSelector(
        (state) => state.filterSlice.attributesList
    );
    const dispatch = useDispatch();
    const yearData = filterList?.Year;

    const brandFilter = filterList?.Brand;
    const minPrice = filterList?.minPrice;
    const maxPrice = filterList?.maxPrice;
    const minYear = Math.min(
        ...yearData.map((year) => {
            return +year.fromYears;
        })
    );
    const maxYear = Math.max(
        ...yearData.map((year) => {
            return +year.toYears;
        })
    );

    const filterHeadings = Object.keys(filterList).filter(
        (item) => !checkOtherFilters(item)
    );

    useEffect(() => {
        const attr = attributes
            ?.map((attribute) => {
                return attribute.value.map((item) => {
                    return attribute.id + "-" + item;
                });
            })
            .flat();
        attributeFilters?.length > 0 &&
            attributeFilters.forEach((element) => {
                if (!attr) {
                    dispatch(removeAttributeById(element));
                } else if (!attr.find((item) => item === element)) {
                    dispatch(removeAttributeById(element));
                }
            });
    }, [attributes]);

    const showFilterTabHandler = (filter) => {
        setActiveFilterTab(filter);
    };

    return (
        <div className="filter-main-wrp">
            <div className="left-head-filter">
                <Scrollbars
                    style={{ width: 123, height: "100vh" }}
                    renderThumbVertical={(props) => (
                        <div {...props} className="thumb-vertical" />
                    )}
                    renderTrackVertical={(props) => (
                        <div {...props} className="track-vertical" />
                    )}
                >
                    {filterHeadings?.map((item) => {
                        return (
                            <h4
                                key={item}
                                className={
                                    activeFilterTab === item ? "active" : ""
                                }
                                onClick={() => showFilterTabHandler(item)}
                            >
                                {item}
                                <i className="icon-arrow"></i>
                            </h4>
                        );
                    })}
                    <h4
                        className={activeFilterTab === "year" ? "active" : ""}
                        onClick={() => showFilterTabHandler("year")}
                    >
                        Year
                        <i className="icon-arrow"></i>
                    </h4>
                    <h4
                        className={activeFilterTab === "brands" ? "active" : ""}
                        onClick={() => showFilterTabHandler("brands")}
                    >
                        Brands
                        <i className="icon-arrow"></i>
                    </h4>
                    {attributes?.map((attribute) => {
                        return (
                            <h4
                                key={attribute.id}
                                className={
                                    activeFilterTab === attribute.id
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    showFilterTabHandler(attribute.id)
                                }
                            >
                                {attribute.attributeName}
                                <i className="icon-arrow"></i>
                            </h4>
                        );
                    })}
                    <h4
                        className={
                            activeFilterTab === "fitment" ? "active" : ""
                        }
                        onClick={() => showFilterTabHandler("fitment")}
                    >
                        Fitment
                        <i className="icon-arrow"></i>
                    </h4>
                    <h4
                        className={
                            activeFilterTab === "discount" ? "active" : ""
                        }
                        onClick={() => showFilterTabHandler("discount")}
                    >
                        Discount
                        <i className="icon-arrow"></i>
                    </h4>
                    <h4
                        className={activeFilterTab === "budget" ? "active" : ""}
                        onClick={() => showFilterTabHandler("budget")}
                    >
                        Price Range
                        <i className="icon-arrow"></i>
                    </h4>
                </Scrollbars>
            </div>
            <div className="filter-data">
                <>
                    {filterList &&
                        Object.keys(filterList).map((item, index) => {
                            return !checkOtherFilters(item) &&
                                filterList[item].length > 0 ? (
                                <Filter
                                    style={{
                                        display:
                                            activeFilterTab === item
                                                ? "block"
                                                : "none",
                                    }}
                                    key={index}
                                    filterList={filterList[item]}
                                    item={item}
                                />
                            ) : null;
                        })}
                    {yearData.length > 0 && minYear && maxYear && (
                        <YearRange
                            style={{
                                display:
                                    activeFilterTab === "year"
                                        ? "block"
                                        : "none",
                            }}
                            minYear={minYear}
                            maxYear={maxYear}
                        />
                    )}
                    {brandFilter?.length > 0 && (
                        <BrandFilter
                            style={{
                                display:
                                    activeFilterTab === "brands"
                                        ? "block"
                                        : "none",
                            }}
                            brandsFilter={brandFilter}
                        />
                    )}
                    {attributes?.map((attribute) => {
                        return (
                            <AttributeFilter
                                style={{
                                    display:
                                        activeFilterTab === attribute.id
                                            ? "block"
                                            : "none",
                                }}
                                key={attribute.id}
                                attributeFilters={attribute}
                            />
                        );
                    })}

                    <Fitment
                        style={{
                            display: `${
                                activeFilterTab === "fitment" ? "block" : "none"
                            }`,
                        }}
                    />

                    <Discount
                        style={{
                            display: `${
                                activeFilterTab === "discount"
                                    ? "block"
                                    : "none"
                            }`,
                        }}
                    />
                    {minPrice && maxPrice && (
                        <RangeSlider
                            style={{
                                display:
                                    activeFilterTab === "budget"
                                        ? "block"
                                        : "none",
                            }}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                        />
                    )}
                </>

                <button
                    className="apply-filter"
                    aria-label="Apply"
                    role="button"
                    type="button"
                    onClick={toggleFilterHandler}
                >
                    APPLY
                </button>
            </div>
        </div>
    );
};

export default FilterDataMob;
