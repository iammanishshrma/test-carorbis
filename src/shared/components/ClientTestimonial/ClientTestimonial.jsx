import React, { useRef } from "react";

import Slider from "react-slick";
import formatDate from "@/shared/utils/formatDate";
import "./ClientTestimonial.scss";
import { useWindowSize } from "@/shared/hooks/windowSize";
import { debounce } from "lodash";
import Rating from "react-rating";
const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 4,
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
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 1022,
            settings: {
                slidesToShow: 2,
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
const ClientTestimonial = ({ testimonialList }) => {
    const [windowWidth] = useWindowSize();
    const sliderRef1 = useRef();

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
            <h3>What Our Customers Have To Say</h3>
            <div className="feedback-wrapper">
                <div
                    className="client-slider-wrp"
                    onWheel={(e) => onWheelSlider(e, sliderRef1)}
                >
                    {testimonialList?.length ? (
                        <Slider {...settings} ref={sliderRef1}>
                            {testimonialList.map((testimonial) => (
                                <div key={testimonial._id} className="feeds">
                                    <div className="testimonial-head">
                                        <h4>
                                            {
                                                testimonial.translationData[0]
                                                    .name
                                            }
                                        </h4>
                                        <span className="date">
                                            {formatDate(testimonial.createdAt)}
                                        </span>
                                    </div>
                                    <div className="feed-description">
                                        <div className="rating-column">
                                            {/* {[...Array(5)].map(
                                                (items, index1) => {
                                                    return (
                                                        <div
                                                            key={index1}
                                                            className={
                                                                testimonial.rating <=
                                                                    index1
                                                                    ? "transparent-star"
                                                                    : "colored-star"
                                                            }
                                                        ></div>
                                                    );
                                                }
                                            )} */}
                                            <Rating
                                                initialRating={
                                                    testimonial.rating
                                                }
                                                readonly
                                                emptySymbol={
                                                    <div
                                                        className={
                                                            "transparent-star"
                                                        }
                                                    />
                                                }
                                                fullSymbol={
                                                    <div
                                                        className={
                                                            "colored-star"
                                                        }
                                                    />
                                                }
                                            />
                                        </div>
                                        <p>
                                            {
                                                testimonial.translationData[0]
                                                    .content
                                            }
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div>No testimonial found!!!</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ClientTestimonial;
