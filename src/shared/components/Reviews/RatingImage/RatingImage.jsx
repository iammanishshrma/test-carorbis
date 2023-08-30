import React, { useRef, useState } from "react";
import Image from "next/image";

import Slider from "react-slick";
import { debounce } from "lodash";

import useOutsideClick from "@/shared/hooks/outsideClickHandler";

import "./RatingImage.scss";

const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: false,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    waitForAnimate: false,
    touchThreshold: 8,
};

const settings1 = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    MobileFirst: true,
    draggable: false,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    waitForAnimate: false,
    touchThreshold: 8,
};

const AboutProduct = ({ reviewImages }) => {
    const [popUp, setPopUp] = useState(false);
    const sliderRef = useRef();
    const sliderRef1 = useRef();
    const sliderRef3 = useRef();
    const popupRef = useRef();

    const openPopUp = (index) => {
        setPopUp(true);
        sliderRef3.current.slickGoTo(index);
        document.body.classList.add("modal-open");
    };
    const closePopUp = () => {
        setPopUp(false);
        document.body.classList.remove("modal-open");
    };

    useOutsideClick(popupRef, () => {
        closePopUp();
    });

    const onWheelSlider = debounce((e, ref) => {
        if (!ref?.current) return;
        if (e.deltaX > 0) {
            ref?.current?.slickNext();
        } else if (e.deltaX < 0) {
            ref?.current?.slickPrev();
        }
    }, 20);
    return (
        <div className="rating-product customer-photos-wrap">
            <h4>Photos from Customers</h4>
            <div
                className="slide-img"
                onWheel={(e) => onWheelSlider(e, sliderRef1)}
            >
                <Slider {...settings} ref={sliderRef}>
                    {reviewImages?.map((item, index) => {
                        return (
                            <div
                                className="img-wrap"
                                key={item}
                                style={{ position: "relative" }}
                            >
                                <Image
                                    src={item}
                                    alt="slider-img"
                                    priority
                                    onClick={() => openPopUp(index)}
                                    width={170}
                                    height={170}
                                    title="slider-img"
                                />
                            </div>
                        );
                    })}
                </Slider>
            </div>
            <div className={`pop-up ${popUp && "active"}`}>
                <div ref={popupRef} className="popup-wrapper">
                    <div
                        className="popup-content review-img-popup"
                        onWheel={(e) => onWheelSlider(e, sliderRef3)}
                    >
                        <Slider {...settings1} ref={sliderRef3}>
                            {reviewImages?.map((item, index) => {
                                return (
                                    <div
                                        className="img-wrap"
                                        key={item}
                                        style={{ position: "relative" }}
                                    >
                                        <Image
                                            src={item}
                                            alt="slider-img"
                                            priority
                                            width={600}
                                            height={600}
                                            title="slider-img"
                                        />
                                    </div>
                                );
                            })}
                        </Slider>
                        <button
                            onClick={closePopUp}
                            className="close-btn"
                            aria-label="Close"
                            role="button"
                        >
                            <i className="cancel-icon"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutProduct;
