import React, { useState } from "react";

import Rating from "react-rating";
import Slider from "react-slick";

import transparent from "@/shared/assets/images/transparent.svg";
import filled from "@/shared/assets/images/yellow-star.svg";
import SliderImg1 from "@/shared/assets/images/slider-img1.png";

import "./OrderProcess.scss";
const OrderProcess = (props) => {
    const [popUp1, setPopUp1] = useState(false);
    const [refundPopUp, setRefundPopUp] = useState(false);
    const orderData = props.orderData;
    const openPopUp = () => {
        setPopUp1(true);
        document.body.classList.toggle("modal-open");
    };
    const closePopUp = () => {
        setPopUp1(false);
        document.body.classList.toggle("modal-open");
    };
    const openRefundPopUp = () => {
        setRefundPopUp(true);
        document.body.classList.toggle("modal-open");
    };
    const closeRefundPopUp = () => {
        setRefundPopUp(false);
        document.body.classList.toggle("modal-open");
    };
    const ratingImg = [
        {
            image: SliderImg1.src,
        },
        {
            image: SliderImg1.src,
        },
        {
            image: SliderImg1.src,
        },
        {
            image: SliderImg1.src,
        },
        {
            image: SliderImg1.src,
        },
        {
            image: SliderImg1.src,
        },
        {
            image: SliderImg1.src,
        },
    ];
    var settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        MobileFirst: true,
    };
    return (
        <div className="order-process-detail">
            <div className="process-bar">
                {Object.keys(props.processData).map((item, index) => {
                    return (
                        <div className="process-box" key={index}>
                            <div
                                className={`process-listing ${(props.processData?.[item]?.status ===
                                    "cancel"
                                    ? "process-cancel"
                                    : "") ||
                                    (props.processData?.[item]?.status === true
                                        ? "process-completed"
                                        : "") ||
                                    (props.processData?.[item]?.status ===
                                        "inProcess"
                                        ? "process-upcoming"
                                        : "")
                                    }`}
                            >
                                <div className="status">
                                    <span className="status-marked"></span>
                                </div>
                                <h4>{item}</h4>
                                {(props.processData?.[item]?.status === true ||
                                    props.processData?.[item]?.status ===
                                    "cancel") && (
                                        <div className="day-wrap">
                                            <span className="date">
                                                {props.processData[item].date}
                                            </span>
                                            <span className="time">
                                                {props.processData[item].time}
                                            </span>
                                        </div>
                                    )}
                                {(props.processData?.[item]?.status ===
                                    "inProcess" ||
                                    props.processData?.[item]?.status ===
                                    false) && (
                                        <div className="day-wrap">
                                            <span className="">Pending</span>
                                        </div>
                                    )}
                            </div>
                            <div className="process-separator"></div>
                        </div>
                    );
                })}
            </div>
            {orderData.returnReason ? (
                <div className="return-reason">
                    Return reason :
                    <span className="reason-desc">
                        {orderData.returnReason}
                    </span>
                </div>
            ) : null}
            {orderData.returnDescription ? (
                <div className="return-description">
                    <p>{orderData.returnDescription}</p>
                </div>
            ) : null}
            {orderData.processData["Refund Inititated"]?.status === true ? (
                <div className="return-reason refund-reason">
                    Refund Summary
                    <div className="refund-detail">
                        <div className="reason-desc">
                            Refund Total :{" "}
                            {
                                orderData.processData["Refund Inititated"]
                                    .paymentDetails.amount
                            }
                        </div>
                        <div className="reason-desc">
                            {
                                orderData.processData["Refund Inititated"]
                                    .paymentDetails.amount
                            }{" "}
                            will be sent to your{" "}
                            {
                                orderData.processData["Refund Inititated"]
                                    .paymentDetails.source
                            }
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="return-product-main-wrapper">
                <div className="return-product-wrp">
                    {orderData.returnProductImg?.map((item, index) => {
                        return (
                            <>
                                <div
                                    className="return-product-image"
                                    key={index}
                                    onClick={openRefundPopUp}
                                >
                                    <img
                                        src={item.returnImg}
                                        alt="return-product"
                                    />
                                </div>
                            </>
                        );
                    })}
                </div>
                <div className={`pop-up ${refundPopUp && "active"}`}>
                    <div className="popup-wrapper">
                        <div className="popup-content">
                            <Slider {...settings}>
                                {ratingImg.map((item, index) => {
                                    return (
                                        <div className="img-wrap" key={index}>
                                            <img
                                                src={item.image}
                                                alt="slider-img"
                                            />
                                        </div>
                                    );
                                })}
                            </Slider>
                        </div>
                    </div>
                    <button onClick={closeRefundPopUp} className="close-btn" aria-label="Close" role="button">
                        <i className="cancel-icon"></i>
                    </button>
                </div>
            </div>
            <div className="process-product-review">
                {orderData.orderStatus === "Delivered" ||
                    orderData.orderStatus === "Return Completed" ? (
                    <div className="rate-product">
                        <div className="customer-review">
                            <div className="customer-rating">
                                <span className="rate-product">
                                    Rate Product
                                </span>
                                <Rating
                                    emptySymbol={
                                        <img
                                            src={transparent.src}
                                            className="icon-transparent"
                                        />
                                    }
                                    fullSymbol={
                                        <img
                                            src={filled.src}
                                            className="icon-filled"
                                        />
                                    }
                                />
                            </div>
                            <button
                                className="write-review"
                                onClick={() => openPopUp()}
                                aria-label="write a review"
                                role="button"
                            >
                                Write a review
                            </button>
                            <div className={`pop-up ${popUp1 && "active"}`}>
                                <div className="popup-wrapper">
                                    <div className="popup-content">
                                        <h3>Write a review</h3>
                                        <div className="start-rating-wrap">
                                            <div className="rating-column">
                                                <Rating
                                                    emptySymbol={
                                                        <img
                                                            src={
                                                                transparent.src
                                                            }
                                                            className="icon-transparent"
                                                        />
                                                    }
                                                    fullSymbol={
                                                        <img
                                                            src={filled.src}
                                                            className="icon-filled"
                                                        />
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="form-block">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Product Year"
                                            />
                                        </div>
                                        <div className="form-block">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Product making"
                                            />
                                        </div>
                                        <div className="form-block">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Model name"
                                            />
                                        </div>
                                        <div className="form-block textarea-wrapper">
                                            <textarea
                                                rows="5"
                                                cols="0"
                                                placeholder="Type here"
                                                className="text-area form-control"
                                            ></textarea>
                                            <span className="min-word">
                                                800 words maximum
                                            </span>
                                        </div>
                                        <button
                                            type="submit"
                                            className="form-btn"
                                            aria-label="Submit"
                                            role="button"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => closePopUp()}
                                    className="close-btn"
                                    aria-label="Close"
                                    role="button"
                                >
                                    <i className="cancel-icon"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default OrderProcess;
