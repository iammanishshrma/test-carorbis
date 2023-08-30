import { debounce } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import Slider from "react-slick";
import "../DiscountBlocks/DiscountBlocks.scss";
import './CategoryDetails.scss'
import { useWindowSize } from "@/shared/hooks/windowSize";


const CategoryDetails = ({ categoryData }) => {
    const [windowWidth] = useWindowSize();

    const settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: false,
        swipe: true,
        swipeToSlide: true,
        touchMove: true,
        waitForAnimate: false,
        touchThreshold: 8,
        responsive: [
            {
                breakpoint: 767,
                settings: "unslick",
            },
        ],
    };

    //slider-scroll starts
    const sliderRef = useRef(null);
    const onWheelSlider = debounce((e, ref) => {
        if (!ref?.current) return;
        if (e.deltaX > 0 && windowWidth > 767) {
            ref?.current?.slickNext();
        } else if (e.deltaX < 0 && windowWidth > 767) {
            ref?.current?.slickPrev();
        }
    }, 20);
    return (
        <div className="car-accessories-category sub-cat-accessories">
            <h3>{categoryData?.categoryName}</h3>
            <p>{categoryData?.categoryShortDescription}</p>
            <div className="discount-categories">
                <div className="discount-categories-lists">
                    <div onWheel={(e) => onWheelSlider(e, sliderRef)}>
                        <Slider {...settings} ref={sliderRef}>
                            {categoryData?.categoryWebBanner?.map((banner) => {
                                return (<div className="about-discount" key={banner?.image}>
                                    <Link href={banner?.url}>
                                        <img
                                            src={banner?.image}
                                            alt={
                                                banner?.title?.length > 0
                                                    ? banner.title
                                                    : banner.image
                                            }
                                        />
                                        <div className="discount-details">
                                            <span className="save-text">
                                                {banner?.title}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryDetails;
