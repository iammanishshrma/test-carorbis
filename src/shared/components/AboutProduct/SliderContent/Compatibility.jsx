import React, { useEffect, useState, useCallback, useRef } from "react";

import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import Slider from "react-slick";
import { axiosInstance } from "@/shared/api/axios";
import { catalogEndPoints } from "@/shared/api/endpoints";

import GarageCompatibility from "./GarageCompatibility";
import LoaderUi from "@/shared/components/LoaderUi/LoaderUi";
import AddVehicle from "../../Header/HeaderGarage/AddVehicle/AddVehicle";
import useOutsideClick from "@/shared/hooks/outsideClickHandler";
import { debounce } from "lodash";

const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
    touchThreshold: 8,
    MobileFirst: true,
    draggable: false,
    swipe: true,
    touchMove: true,
    waitForAnimate: false,
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                draggable: true,
            },
        },
    ],
};
const settings2 = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    swipeToSlide: true,
    touchThreshold: 8,
    MobileFirst: true,
    draggable: false,
    swipe: true,
    touchMove: true,
    waitForAnimate: false,
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                draggable: true,
            },
        },
    ],
};

const Compatibility = ({ productId, handleSlider, sliderActive }) => {
    const isLoggedIn = useSelector(
        (state) => state.checkLoginSlice?.isLoggedIn
    );
    const garageList = useSelector((state) => state.garageList.garage);
    const [makeList, setMakeList] = useState(null);
    const [modelList, setModelList] = useState(null);
    const [yearList, setYearList] = useState(null);
    const [variantList, setVariantList] = useState(null);

    const [activeMake, setActiveMake] = useState(null);
    const [activeModel, setActiveModel] = useState(null);
    const [activeYear, setActiveYear] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const sliderRef1 = useRef();
    const sliderRef2 = useRef();
    const [showAddVehicle, setShowAddVehicle] = useState(false);
    const addPopupRef = useRef();

    useOutsideClick(addPopupRef, () => {
        setShowAddVehicle(false);
    });

    const router = useRouter();
    const getList = useCallback(
        (payload) => {
            const listType = payload.listType;
            delete payload.listType;
            setIsLoading(true);
            axiosInstance
                .post(catalogEndPoints.checkCompatibility, payload)
                .then((res) => {
                    const list = res.data.data;
                    if (listType === "make") {
                        const updatedList = list.map((item, index) => {
                            return {
                                ...item,
                                isActive: index === 0,
                            };
                        });
                        setMakeList(updatedList);
                        if (list.length) {
                            const payload = {
                                productSlug: router.query.product,
                                makeId: list[0]?._id,
                                listType: "model",
                            };
                            setActiveMake(list[0]?._id);
                            getList(payload);
                        }
                    } else if (listType === "model") {
                        const updatedList = list.map((item, index) => {
                            return {
                                ...item,
                                isActive: index === 0,
                            };
                        });
                        setModelList(updatedList);
                        if (list.length) {
                            const payload = {
                                productSlug: router.query.product,
                                modelId: list[0]?._id,
                                listType: "year",
                            };
                            setActiveModel(list[0]?._id);
                            getList(payload);
                        }
                    } else if (listType === "year") {
                        const updatedList = list.map((item, index) => {
                            return {
                                ...item,
                                isActive: index === 0,
                            };
                        });
                        setYearList(updatedList);
                        if (list.length) {
                            const payload = {
                                productSlug: router.query.product,
                                yearId: list[0]?._id,
                                listType: "variant",
                            };

                            setActiveYear(list[0]?._id);
                            getList(payload);
                        }
                    } else if (listType === "variant") {
                        setVariantList(list);
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                });
        },
        [router.query.product]
    );

    useEffect(() => {
        const payload = {
            productSlug: router.query.product,
            listType: "make",
        };
        getList(payload);
    }, [router.query.product, getList]);

    const makeChangeHandler = (event) => {
        const makeId = event.target.value;
        setActiveMake(makeId);

        const payload = {
            productSlug: router.query.product,
            listType: "model",
            makeId: makeId,
        };
        getList(payload);
    };
    const modelChangeHandler = (event) => {
        const modelId = event.target.value;
        setActiveModel(modelId);

        const payload = {
            productSlug: router.query.product,
            listType: "year",
            modelId,
        };
        getList(payload);
    };
    const yearChangeHandler = (event) => {
        const yearId = event.target.value;
        setActiveYear(yearId);

        const payload = {
            productSlug: router.query.product,
            listType: "variant",
            yearId,
        };
        getList(payload);
    };

    const toggleAddVehicleHandler = () => {
        setShowAddVehicle((prev) => !prev);
    };

    const onWheelSlider = debounce((e, ref) => {
        if (!ref?.current) return;
        if (e.deltaX > 0) {
            ref?.current?.slickNext();
        } else if (e.deltaX < 0) {
            ref?.current?.slickPrev();
        }
    }, 20);

    return makeList?.length > 0 ? (
        <>
            {isLoading && <LoaderUi />}
            {(!garageList || garageList?.length == 0) && isLoggedIn ? (
                <button
                    className="add-vechile-garage"
                    onClick={toggleAddVehicleHandler}
                >
                    Add vehicle to garage
                </button>
            ) : null}
            <h3>Compatibility</h3>
            {isLoggedIn && <GarageCompatibility productId={productId} />}
            <>
                <button
                    onClick={handleSlider}
                    className="check-fitment"
                    aria-label="check fitment"
                    role="button"
                >
                    Check fit with all vehicles{" "}
                    <i
                        className={`icon-arrow ${sliderActive ? "active" : ""}`}
                    ></i>
                </button>
                <div className={`all-sliders ${sliderActive ? "active" : ""}`}>
                    <div className="slider-one first-slider">
                        <div
                            className="slider-container"
                            onWheel={(e) => onWheelSlider(e, sliderRef1)}
                        >
                            <Slider {...settings} ref={sliderRef1}>
                                {makeList?.map((make) => (
                                    <div key={make._id}>
                                        <label
                                            htmlFor={`1option${make._id}`}
                                            className="radio-button"
                                        >
                                            <input
                                                type="radio"
                                                id={make._id}
                                                name="options1"
                                                value={make._id}
                                                onChange={makeChangeHandler}
                                                checked={
                                                    make._id === activeMake
                                                }
                                            />
                                            <span className="radio-button-text">
                                                <h5>{make.name}</h5>
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <div className="slider-one">
                        <div
                            className="slider-container"
                            onWheel={(e) => onWheelSlider(e, sliderRef2)}
                        >
                            <Slider {...settings} ref={sliderRef2}>
                                {modelList?.map((model, index) => (
                                    <div key={model._id}>
                                        <label
                                            htmlFor={`2option${model._id}`}
                                            className="radio-button"
                                        >
                                            <input
                                                type="radio"
                                                id={model._id}
                                                name="options2"
                                                value={model._id}
                                                onChange={modelChangeHandler}
                                                checked={
                                                    model._id === activeModel
                                                }
                                            />
                                            <span className="radio-button-text">
                                                <h5>{model.name}</h5>
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <div className="slider-one">
                        <div className="slider-container">
                            <Slider {...settings2}>
                                {yearList?.map((year) => (
                                    <div key={year._id}>
                                        <label
                                            htmlFor={`3option${year._id}`}
                                            className="radio-button"
                                        >
                                            <input
                                                type="radio"
                                                id={year._id}
                                                name="options3"
                                                value={year._id}
                                                onChange={yearChangeHandler}
                                                checked={
                                                    year._id === activeYear
                                                }
                                            />
                                            <span className="radio-button-text">
                                                <h5>{`${year.fromYears} - ${year.toYears}`}</h5>
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <div className="slider-one last-slider">
                        <div className="slider-container">
                            <Slider {...settings2}>
                                {variantList?.map((variant) => {
                                    return (
                                        <div key={variant._id}>
                                            <label
                                                htmlFor={`4option${variant._id}`}
                                                className="radio-button"
                                            >
                                                <input
                                                    type="radio"
                                                    id={`4option${variant._id}`}
                                                    name="options4"
                                                    value={`option${variant._id}`}
                                                />
                                                <span className="radio-button-text">
                                                    <h5>{variant.name}</h5>
                                                </span>
                                            </label>
                                        </div>
                                    );
                                })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </>

            {showAddVehicle && (
                <div className={`pop-up ${showAddVehicle ? "active" : ""}`}>
                    <div ref={addPopupRef} className="garage-popup-box">
                        <div className="popup-wrapper">
                            <div className="popup-content">
                                <AddVehicle
                                    closePopUp={toggleAddVehicleHandler}
                                />
                            </div>
                        </div>
                        <button
                            onClick={toggleAddVehicleHandler}
                            className="close-btn"
                            aria-label="Close"
                            role="button"
                        >
                            <i className="cancel-icon"></i>
                        </button>
                    </div>
                </div>
            )}
        </>
    ) : null;
};

export default Compatibility;
