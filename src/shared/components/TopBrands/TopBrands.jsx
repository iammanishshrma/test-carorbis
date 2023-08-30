import React from "react";

import Link from "next/link";

import BrandCard from "../BrandCard/BrandCard";

import "./TopBrands.scss";

const TopBrands = ({ brandsList }) => {
    const brandsShowCount = 12;
    const brands = brandsList.topBrand;
    const imgPath = brandsList.PRODUCTSHOWIMAGEPATH;

    return (
        <>
            <h3>Top Brands</h3>
            <div className="brands-wrap homepage-top-brand">
                {brands.slice(0, brandsShowCount).map((brand) => {
                    return (
                        <BrandCard
                            brand={brand}
                            imgPath={imgPath}
                            key={brand.slug}
                        />
                    );
                })}
            </div>

            <div className="brands-wrap desktop-data">
                {brands.slice(0, brandsShowCount).map((brand) => {
                    return (
                        <BrandCard
                            brand={brand}
                            imgPath={imgPath}
                            key={brand.slug}
                        />
                    );
                })}
            </div>
            <div className="view-brands">
                <Link href="/brands" aria-label="View All Brands">
                    View All Brands
                    <span className="arrow">
                        <svg
                            width="13"
                            height="8"
                            viewBox="0 0 13 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.25 1.5L6.25 6.5L11.25 1.5"
                                stroke="#111E6C"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </span>
                </Link>
            </div>
        </>
    );
};

export default TopBrands;
