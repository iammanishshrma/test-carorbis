import React from "react";

import Slider from "react-slick";

import BrandCard from "@/shared/components/BrandCard/BrandCard";

import "./AllBrands.scss";
import "@/shared/components/TopBrands/TopBrands.scss";

const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const AllBrands = ({ brandsList }) => {
    const brands = brandsList?.data;
    const imgPath = brandsList.SHOWIMAGEPATH;

    // return console.log(brandsList);
    return (
        <div className="view-all-brand">
            <div className="container">
                <h3>All Brands</h3>
                <div className="brands-wrap">
                    <Slider {...settings}>
                        {brands?.map((brand) => {
                            return (
                                <BrandCard
                                    brand={brand}
                                    imgPath={imgPath}
                                    key={brand._id}
                                />
                            );
                        })}
                    </Slider>
                </div>
                <div className="brands-wrap desktop-data">
                    {brands.map((brand) => {
                        return (
                            <BrandCard
                                brand={brand}
                                imgPath={imgPath}
                                key={brand._id}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AllBrands;
