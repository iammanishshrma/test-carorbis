import React, { useRef } from "react";

import Product from "../Product/Product";
import Slider from "react-slick";
import ProductImage1 from "@/shared/assets/images/product-1.png";
import ProductImage2 from "@/shared/assets/images/product-2.png";
import ProductImage3 from "@/shared/assets/images/product-3.png";
import ProductImage4 from "@/shared/assets/images/product-4.png";
import ProductImage5 from "@/shared/assets/images/product-5.png";
import DiscountRupee from "@/shared/assets/images/grey-rupee.svg";
import ActualRupee from "@/shared/assets/images/rupee.svg";
import "./TopRatedProduct.scss";
import { useWindowSize } from "@/shared/hooks/windowSize";
import { debounce } from "lodash";

const TopRatedProduct = ({ topRatedList }) => {
    const [windowWidth] = useWindowSize();
    const sliderRef1 = useRef();
    const settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        draggable: false,
        swipe: true,
        swipeToSlide: true,
        touchMove: true,
        waitForAnimate: false,
        touchThreshold: 8,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1022,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 767,
                settings: "unslick",
            },
        ],
    };
    const ProductDetails = [
        {
            ImageLink: ProductImage1.src,
            Recomended: "Recommended",
            TopRated: "",
            BrandName: "Brand Name",
            ProductName:
                "Portronics AUTO 10 POR-320, Bluetooth device demo demo",
            DiscountRupees: DiscountRupee.src,
            DiscountPrice: 2500,
            ActualRupees: ActualRupee.src,
            ActualPrice: 1499.0,
            rating: { rate: 4 },
            ratingCount: 81,
            OfferPercent: "(40% OFF)",
        },
        {
            ImageLink: ProductImage2.src,
            Recomended: "Recommended",
            TopRated: "",
            BrandName: "Brand Name",
            ProductName: "AUTO CAR WINNER Beige Car Armrest for Maruti Ritz",
            DiscountRupees: DiscountRupee.src,
            DiscountPrice: 2500,
            ActualRupees: ActualRupee.src,
            ActualPrice: 1499.0,
            rating: { rate: 3 },
            ratingCount: 80,
            OfferPercent: "(40% OFF)",
        },
        {
            ImageLink: ProductImage3.src,
            Recomended: "",
            TopRated: "Top Rated",
            BrandName: "Brand Name",
            ProductName:
                "Auto-Ex Gear Lever Shifter Knob Compatible, Rep emo demo demo",
            DiscountRupees: DiscountRupee.src,
            DiscountPrice: 2500,
            ActualRupees: ActualRupee.src,
            ActualPrice: 1499.0,
            rating: { rate: 2 },
            ratingCount: 81,
            OfferPercent: "(40% OFF)",
        },
        {
            ImageLink: ProductImage4.src,
            Recomended: "",
            TopRated: "Top Rated",
            BrandName: "Brand Name",
            ProductName:
                "Amkette iGrip Easy View One Touch Dashboard and demo demo demo",
            DiscountRupees: DiscountRupee.src,
            DiscountPrice: 2500,
            ActualRupees: ActualRupee.src,
            ActualPrice: 1499.0,
            rating: { rate: 1 },
            ratingCount: 81,
            OfferPercent: "(40% OFF)",
        },
        {
            ImageLink: ProductImage5.src,
            Recomended: "",
            TopRated: "",
            BrandName: "Brand Name",
            ProductName:
                "Kimloo Car G7 Universal Bluetooth USB Car demo demo demo",
            DiscountRupees: DiscountRupee.src,
            DiscountPrice: 2500,
            ActualRupees: ActualRupee.src,
            ActualPrice: 1499.0,
            rating: { rate: 4 },
            ratingCount: 81,
            OfferPercent: "(40% OFF)",
        },
        {
            ImageLink: ProductImage4.src,
            Recomended: "",
            TopRated: "Top Rated",
            BrandName: "Brand Name",
            ProductName:
                "Amkette iGrip Easy View One Touch Dashboard and demo demo demo",
            DiscountRupees: DiscountRupee.src,
            DiscountPrice: 2500,
            ActualRupees: ActualRupee.src,
            ActualPrice: 1499.0,
            rating: { rate: 1 },
            ratingCount: 81,
            OfferPercent: "(40% OFF)",
        },
        {
            ImageLink: ProductImage5.src,
            Recomended: "",
            TopRated: "",
            BrandName: "Brand Name",
            ProductName:
                "Kimloo Car G7 Universal Bluetooth USB Car demo demo demo",
            DiscountRupees: DiscountRupee.src,
            DiscountPrice: 2500,
            ActualRupees: ActualRupee.src,
            ActualPrice: 1499.0,
            rating: { rate: 4 },
            ratingCount: 81,
            OfferPercent: "(40% OFF)",
        },
    ];

    const productList = topRatedList?.productDetails?.map((item) => {
        return { ...item, categoryData: item?.categoryData?.[0] };
    });
    const imgPath = topRatedList.SHOWIMAGEPATH;
    const onWheelSlider = debounce((e, ref) => {
        if (!ref?.current) return;
        if (e.deltaX > 0 && windowWidth > 767) {
            ref?.current?.slickNext();
        } else if (e.deltaX < 0 && windowWidth > 767) {
            ref?.current?.slickPrev();
        }
    }, 20);

    return (
        <>
            <h3>Top Rated</h3>
            <div
                className="bestseller-product custom-product"
                onWheel={(e) => onWheelSlider(e, sliderRef1)}
            >
                <Slider {...settings} ref={sliderRef1}>
                    {productList?.map((data, index) => {
                        return (
                            <Product
                                product={data}
                                imagePath={imgPath}
                                key={data._id}
                            />
                        );
                    })}
                </Slider>
            </div>
            {/* <div className="bestseller-product">
                {ProductDetails.map((data, index) => {
                    return <Products getData={data} key={index} />;
                })}
            </div> */}
        </>
    );
};

export default TopRatedProduct;
