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
import "./BestSellers.scss";
import { useWindowSize } from "@/shared/hooks/windowSize";
import { debounce } from "lodash";

const BestSeller = ({ bestSellerList }) => {
    const [windowWidth] = useWindowSize();
    const sliderRef1 = useRef();
    const settings = {
        dots: false,
        arrows: true,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 300,
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

    const productList = bestSellerList?.productDetails?.map((item) => {
        return { ...item, categoryData: item?.categoryData?.[0] };
    });
    const imgPath = bestSellerList.SHOWIMAGEPATH;

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
            <h3>Best Sellers</h3>
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
        </>
    );
};

export default BestSeller;
