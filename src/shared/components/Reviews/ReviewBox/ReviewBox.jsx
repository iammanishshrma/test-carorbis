import React, { useRef, useState } from "react";

import Slider from "react-slick";

import { axiosInstance } from "@/shared/api/axios";
import { catalogEndPoints } from "@/shared/api/endpoints";

import "./ReviewBox.scss";
import "../RatingImage/RatingImage.scss";
import Image from "next/image";
import formatDate from "@/shared/utils/formatDate";
import { notify } from "@/shared/utils/notifyToast";
import { useSelector } from "react-redux";
import { useWindowSize } from "@/shared/hooks/windowSize";
import { debounce } from "lodash";
import useOutsideClick from "@/shared/hooks/outsideClickHandler";
import Rating from "react-rating";

const settings = {
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
    accessibility: true,
};
const ReviewBox = ({
    review,
    productId,
    getReviews,
    payload: reviewPayload,
}) => {
    const [popUp, setPopUp] = useState(false);
    const [likeType, setLikeType] = useState(null);
    const sliderRef = useRef();
    const popupRef = useRef();

    const isLoggedIn = useSelector(
        (state) => state.checkLoginSlice?.isLoggedIn
    );

    const openPopUp = (index) => {
        setPopUp(true);
        sliderRef.current?.slickGoTo(index);
        document.body.classList.add("modal-open");
    };
    const closePopUp = () => {
        document.body.classList.remove("modal-open");
        setPopUp(false);
    };
    useOutsideClick(popupRef, () => {
        closePopUp();
    });

    const likeDislikeHandler = (likeType, reviewId) => {
        if (!isLoggedIn) {
            return notify.errorToast("You are not logged in.");
        }
        const payload = {
            productId,
            likeType,
            reviewId,
        };
        setLikeType((prev) => (prev === likeType ? null : likeType));
        axiosInstance
            .post(catalogEndPoints.likeDislike, payload)
            .then((res) => {
                getReviews(reviewPayload);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const onWheelSlider = debounce((e, ref) => {
        if (!ref?.current) return;
        if (e.deltaX > 0) {
            ref?.current?.slickNext();
        } else if (e.deltaX < 0) {
            ref?.current?.slickPrev();
        }
    }, 20);

    const imgClickHandler = (index) => {
        openPopUp(index);
        // sliderRef?.current?.focus();
    };
    return (
        <div className="review-panel">
            <div className="review-rate">
                <div className="rating-section rating-fix">
                    {/* {[...Array(5)].map((items, index1) => {
                        return (
                            <div
                                key={index1}
                                className={
                                    review.ratingCount <= index1
                                        ? "transparent-star"
                                        : "colored-star"
                                }
                            ></div>
                        );
                    })} */}
                    <Rating
                        initialRating={review.ratingCount}
                        readonly
                        emptySymbol={<div className={"transparent-star"} />}
                        fullSymbol={<div className={"colored-star"} />}
                    />
                    <div className="rating-count">{review.ratingCount}/5</div>
                </div>
                <h5>{formatDate(review.createdAt)}</h5>
                {review.orderStatus === "Delivered" && (
                    <div className="verified">
                        <i className="icon-verify"></i>
                        Verified Purchase
                    </div>
                )}
                <div className="helpful-box">
                    <button
                        className="helpful-btn"
                        aria-label="Was this Helpful?"
                        role="button"
                    >
                        Was this Helpful?
                    </button>
                    <div className="likes">
                        <div className="like-wrp-icon">
                            <i
                                className={"icon-like"}
                                onClick={() =>
                                    likeDislikeHandler("like", review._id)
                                }
                            >
                                <svg
                                    width="20"
                                    height="19"
                                    viewBox="0 0 20 19"
                                    fill={
                                        likeType === "like" || review.isLiked
                                            ? "#111E6C"
                                            : "none"
                                    }
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.705 2.43381L17.7062 2.43504C19.3982 4.12699 19.6018 7.0727 17.2832 9.4376L10 16.7208L2.71683 9.43759C0.398177 7.07269 0.601812 4.12698 2.29375 2.43504L2.29498 2.43381C2.70336 2.02401 3.18862 1.69886 3.72293 1.477C4.25724 1.25514 4.83009 1.14093 5.40863 1.14093C5.98717 1.14093 6.56002 1.25514 7.09433 1.477C7.62793 1.69857 8.11262 2.02316 8.52066 2.43219C8.5212 2.43273 8.52174 2.43327 8.52227 2.43381L9.28835 3.20985L10 3.93075L10.7117 3.20985L11.4777 2.43381C11.4783 2.43327 11.4788 2.43273 11.4793 2.43219C11.8874 2.02316 12.3721 1.69857 12.9057 1.477C13.44 1.25514 14.0128 1.14093 14.5914 1.14093C15.1699 1.14093 15.7428 1.25514 16.2771 1.477C16.8114 1.69886 17.2966 2.02401 17.705 2.43381Z"
                                        stroke="#111E6C"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </i>
                            <span className="rating-length">
                                {review?.likeData.length
                                    ? review.likeData[0]?.likeCount?.length
                                    : 0}
                            </span>
                        </div>
                        <div className="dislike-wrap-icon">
                            <i
                                className={"icon-dislike"}
                                onClick={() =>
                                    likeDislikeHandler("dislike", review._id)
                                }
                            >
                                <svg
                                    width="20"
                                    height="19"
                                    viewBox="0 0 20 19"
                                    fill={
                                        likeType === "dislike" ||
                                        review.isDisliked
                                            ? "#111E6C"
                                            : "none"
                                    }
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.705 2.43381L17.7062 2.43504C19.3982 4.12699 19.6018 7.0727 17.2832 9.4376L10 16.7208L2.71683 9.43759C0.398177 7.07269 0.601812 4.12698 2.29375 2.43504L2.29498 2.43381C2.70336 2.02401 3.18862 1.69886 3.72293 1.477C4.25724 1.25514 4.83009 1.14093 5.40863 1.14093C5.98717 1.14093 6.56002 1.25514 7.09433 1.477C7.62793 1.69857 8.11262 2.02316 8.52066 2.43219C8.5212 2.43273 8.52174 2.43327 8.52227 2.43381L9.28835 3.20985L10 3.93075L10.7117 3.20985L11.4777 2.43381C11.4783 2.43327 11.4788 2.43273 11.4793 2.43219C11.8874 2.02316 12.3721 1.69857 12.9057 1.477C13.44 1.25514 14.0128 1.14093 14.5914 1.14093C15.1699 1.14093 15.7428 1.25514 16.2771 1.477C16.8114 1.69886 17.2966 2.02401 17.705 2.43381Z"
                                        stroke="#111E6C"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </i>
                            <span className="rating-length">
                                {review?.likeData.length
                                    ? review.likeData[0]?.dislikeCount?.length
                                    : 0}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="review-post">
                <p>{review.review}</p>
            </div>
            <div className="review-images">
                <div className="images-wrap">
                    {review?.reviewImage.slice(0, 3).map((image, index) => {
                        return (
                            <div
                                className="image"
                                key={image}
                                style={{ position: "relative" }}
                            >
                                <Image
                                    src={image}
                                    alt="Rating"
                                    onClick={() => imgClickHandler(index)}
                                    priority
                                    width={84}
                                    height={84}
                                    title="slider-img"
                                />
                                {index === 2 &&
                                    review?.reviewImage.length > 3 && (
                                        <div className="slide-wrapper">
                                            <div
                                                className="add-wrap"
                                                onClick={() => openPopUp(0)}
                                            >
                                                <i className="add-icon"></i>
                                                <h4>
                                                    {review?.reviewImage
                                                        ?.length - 2}
                                                    &nbsp; Images
                                                </h4>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        );
                    })}
                </div>
                <div className={`pop-up ${popUp && "active"}`}>
                    <div ref={popupRef} className="popup-wrapper">
                        <div
                            className="popup-content"
                            onWheel={(e) => onWheelSlider(e, sliderRef)}
                        >
                            <Slider {...settings} ref={sliderRef}>
                                {review?.reviewImage?.map((image) => {
                                    return (
                                        <div
                                            className="img-wrap"
                                            key={image}
                                            style={{ position: "relative" }}
                                        >
                                            <Image
                                                src={image}
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
                        </div>
                    </div>
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
    );
};

export default ReviewBox;
