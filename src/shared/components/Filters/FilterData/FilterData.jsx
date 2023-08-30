import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import Filter from "../Filter/Filter";
import BrandFilter from "../BrandFilter/BrandFilter";
import RangeSlider from "../RangeSlider.js/RangeSlider";
import YearRange from "../YearRange/YearRange";
import AttributeFilter from "../AttributeFilter/AttributeFilter";
import { removeAttributeById } from "@/shared/store/slices/filterSlice";
import Discount from "../Discount/Discount";
import Fitment from "../Fitment/Fitment";

const FilterData = ({ filterList, attributes }) => {
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
    return (
        <>
            {filterList &&
                Object.keys(filterList).map((item, index) => {
                    return !checkOtherFilters(item) &&
                        filterList[item].length > 0 ? (
                        <Filter
                            key={index}
                            filterList={filterList[item]}
                            item={item}
                        />
                    ) : null;
                })}
            {yearData.length > 0 && minYear && maxYear && (
                <YearRange minYear={minYear} maxYear={maxYear} />
            )}
            {brandFilter?.length > 0 && (
                <BrandFilter brandsFilter={brandFilter} />
            )}
            {attributes?.map((attribute) => {
                return (
                    <AttributeFilter
                        key={attribute.id}
                        attributeFilters={attribute}
                    />
                );
            })}
            <Fitment />
            <Discount />
            {minPrice && maxPrice && (
                <RangeSlider minPrice={minPrice} maxPrice={maxPrice} />
            )}
            {/* <OriginFilter /> */}
        </>
    );
};

export default FilterData;
