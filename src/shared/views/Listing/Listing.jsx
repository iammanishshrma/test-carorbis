import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Slider from "react-slick";
import Scrollbars from "react-custom-scrollbars-2";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "@/shared/api/axios";
import { debounce } from "lodash";

import isObjectEmpty from "@/shared/utils/isObjectEmpty";
import { pageLimit } from "@/shared/utils/constants";
import { useElementHeight } from "@/shared/hooks/elementHeight";
import { useIsInViewport } from "@/shared/hooks/inView";
import { useWindowSize } from "@/shared/hooks/windowSize";

import BreadCrumbSection from "@/shared/components/BreadCrumb/BreadCrumb";
import FilterData from "@/shared/components/Filters/FilterData/FilterData";
import AllProduct from "@/shared/components/AllProduct/AllProduct";
import Accordion from "@/shared/components/CustomAccordion/Accordion";
import SelectedProduct from "@/shared/components/SelectedProduct/SelectedProduct";
import AdditionalInformation from "@/shared/components/AdditionalInformation/AdditionalInformation";
import FilterDataMob from "@/shared/components/Filters/FilterDataMob/FilterDataMob";
import LoaderUi from "@/shared/components/LoaderUi/LoaderUi";
import getUrl from "@/shared/utils/getUrl";
import { catalogEndPoints } from "@/shared/api/endpoints";
import { removeAllFilters } from "@/shared/store/slices/filterSlice";

import "./Listing.scss";

const changeAttributeFormat = (attr) => {
    const transObj = {
        VariantProductId: [],
        VariantProductValue: [],
    };
    attr.forEach((attribute) => {
        const id = attribute.split("-")[0];
        const value = attribute.split("-")[1];
        transObj.VariantProductId.push(id);
        transObj.VariantProductValue.push(value);
    });
    return transObj;
};

const Listing = ({
    productsList,
    imgPath,
    categoryDetails,
    faqsList,
    filterList,
    categoryData,
    totalProducts,
    breadcrumbList,
}) => {
    const [products, setProducts] = useState(null);
    const selectedFilters = useSelector((state) => state.filterSlice);
    const discountBanners = categoryDetails?.webBanner;
    console.log("discountBanners", discountBanners);
    const [showFilter, setShowFilter] = useState(false);
    const [windowWidth] = useWindowSize();
    const dispatch = useDispatch();
    const [totalRecords, setTotalRecords] = useState(0);
    const currentRoute = useRouter().query.category;
    const brandSlug = useRouter().query.brandSlug;
    const [currentPage, setCurrentPage] = useState(0);
    const [attributes, setAttributes] = useState(null);
    const productListRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [breadcrumbs, setBreadCrumbs] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const headerElement =
        typeof window !== "undefined"
            ? document.getElementById("top-header")
            : null;
    const elementHeight = useElementHeight(headerElement);

    const sliderRef = useRef(null);
    const listingRef = useRef();

    const observerOptions = {
        root: null,
        rootMargin: `-${elementHeight + 0}px 0px 0px 0px`,
        threshold: 0,
    };

    useEffect(() => {
        setIsMounted(true);
        if (brandSlug) {
            setBreadCrumbs([
                { name: "Home", link: "/" },
                { name: categoryDetails?.name },
            ]);
        } else {
            const breadcrumbs = [{ name: "Home", link: "/" }];
            breadcrumbList?.forEach((item) => {
                breadcrumbs.push({
                    name: item?.categoryName,
                    link:
                        item?.navigationLevel === "sub_category_level" ||
                        item?.navigationLevel === "category_level"
                            ? getUrl(item.slug, item.navigationLevel)
                            : null,
                });
            });
            setBreadCrumbs(breadcrumbs);
        }
    }, [categoryDetails, breadcrumbList, brandSlug]);

    const isListingVisible = useIsInViewport(listingRef, observerOptions);

    useEffect(() => {
        setTotalRecords(totalProducts);
        setIsLoading(false);
    }, [totalProducts]);

    useEffect(() => {
        let attributeVariant = null;
        if (!attributes) {
            attributeVariant = filterList?.AttributeVariant.map((attribute) => {
                return {
                    ...attribute,
                    attributeName: filterList.Attribute.filter(
                        (item) => item._id === attribute.id
                    )?.[0]?.attributeName,
                };
            });
        }
        setAttributes(attributeVariant);
    }, [filterList.AttributeVariant, filterList.Attribute]);

    useEffect(() => {
        document
            .querySelectorAll("input[type=checkbox]")
            .forEach((el) => (el.checked = false));
        document
            .querySelectorAll("input[type=radio]")
            .forEach((el) => (el.checked = false));
        setTimeout(() => {
            setProducts(null);
            dispatch(removeAllFilters());
        }, 100);
    }, [currentRoute, dispatch]);

    useEffect(() => {
        if (isObjectEmpty(selectedFilters)) {
            let payload = {
                slug: currentRoute,
                page: currentPage + 1,
                limit: pageLimit,
                filter: false,
            };
            if (brandSlug) {
                payload["slugType"] = "brand";
                payload["slug"] = brandSlug;
            }
            setIsLoading(true);
            axiosInstance
                .post(catalogEndPoints.getFiltersAndProducts, payload)
                .then((res) => {
                    let productsData;
                    let attributes;
                    let attributeDetails;
                    if (brandSlug) {
                        productsData =
                            res.data.data.top_brand_list[0].productData;
                        attributes =
                            res.data.data.brand_product_filter_list.Attribute;
                        attributeDetails =
                            res.data.data.brand_product_filter_list
                                .AttributeVariant;
                    } else {
                        productsData =
                            res.data.data.category_product_list[0].productData;
                        attributes =
                            res.data.data.category_product_filter_list
                                .Attribute;
                        attributeDetails =
                            res.data.data.category_product_filter_list
                                .AttributeVariant;
                    }

                    const transformedAttribute = attributeDetails?.map(
                        (attribute) => {
                            return {
                                ...attribute,
                                attributeName: attributes?.filter(
                                    (item) => item._id === attribute.id
                                )[0].attributeName,
                            };
                        }
                    );

                    setAttributes(transformedAttribute);
                    setProducts(
                        productsData.map((product) => {
                            return { ...product, categoryData };
                        })
                    );

                    setTotalRecords(res.data.data.totalCount);
                    setIsLoading(false);
                    window.scrollTo(0, 0);
                })
                .catch((error) => {
                    console.error("ssssss", error);
                    setIsLoading(false);
                });
        } else {
            const filters = Object.assign({}, selectedFilters);
            const attributes = selectedFilters?.attributesList;
            if (filters.attributesList) {
                delete filters.attributesList;
            }
            let payload = {
                slug: currentRoute,
                ...filters,
                filter: true,
                page: currentPage + 1,
                limit: pageLimit,
            };
            if (attributes?.length > 0) {
                const transformedAttributes = changeAttributeFormat(attributes);
                payload = { ...payload, ...transformedAttributes };
            }

            if (brandSlug) {
                payload["slugType"] = "brand";
                payload["slug"] = brandSlug;
            }

            axiosInstance
                .post(catalogEndPoints.getFiltersAndProducts, payload)
                .then((res) => {
                    const productsData = res.data.data.productData;
                    const attributeDetails = res.data.data.AttributeDetails;
                    const attributeVariant = attributeDetails.map(
                        (attribute) => {
                            return {
                                ...attribute,
                                attributeName: filterList.Attribute.filter(
                                    (item) => item._id === attribute.id
                                )[0].attributeName,
                            };
                        }
                    );
                    setAttributes(attributeVariant);
                    setProducts(
                        productsData.map((product) => {
                            return { ...product, categoryData };
                        })
                    );

                    setTotalRecords(res.data.data.totalCount);
                    setIsLoading(false);
                    window.scrollTo(0, 0);
                })
                .catch((error) => {
                    console.error("ssssss", error);
                    setIsLoading(false);
                });
        }
    }, [currentPage, selectedFilters]);

    const settings2 = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: discountBanners?.length === 1 ? 1 : 2.07,
        slidesToScroll: 1,
        draggable: true,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: discountBanners?.length === 1 ? 1 : 2.07,
                    slidesToScroll: 1,
                    arrows: true,
                    centerMode: false,
                },
            },
            {
                breakpoint: 767,
                settings: "unslick",
            },
        ],
    };

    const updatedFaqList = faqsList?.map((faq) => {
        return {
            id: Math.random(),
            title: `Q. ${faq.question}`,
            content: faq.answer,
        };
    });
    const toggleFilterHandler = () => {
        document.body.classList.toggle("modal-open");
        setShowFilter((prev) => !prev);
    };
    const clearAllHandler = () => {
        dispatch(removeAllFilters());
        document
            .querySelectorAll("input[type=checkbox]")
            .forEach((el) => (el.checked = false));
        document
            .querySelectorAll("input[type=radio]")
            .forEach((el) => (el.checked = false));
    };

    //slider-scroll starts
    const onWheelSlider = debounce((e, ref) => {
        if (!ref?.current) return;
        if (e.deltaX > 0 && windowWidth > 767) {
            ref?.current?.slickNext();
        } else if (e.deltaX < 0 && windowWidth > 767) {
            ref?.current?.slickPrev();
        }
    }, 20);
    //slider-scroll ends

    return (
        <>
            {isLoading && <LoaderUi />}
            <div className="product-listing">
                <div className="container">
                    <div ref={listingRef}>
                        {breadcrumbs && (
                            <BreadCrumbSection breadcrumbData={breadcrumbs} />
                        )}
                        <div className="main-wrapper">
                            {windowWidth < 768 && isListingVisible ? (
                                <>
                                    <button
                                        onClick={toggleFilterHandler}
                                        type={"button"}
                                        className={`apply-btn ${
                                            productsList?.length === 0 &&
                                            products?.length === 0
                                                ? "full-apply"
                                                : ""
                                        }`}
                                        aria-label="Apply Filter"
                                        role="button"
                                    >
                                        <i className="icon-filter"></i>Apply
                                        Filter
                                    </button>
                                    <CSSTransition
                                        in={showFilter}
                                        timeout={200}
                                        classNames="slide-in-left"
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                        <div className="ltl-wrapper filter-active">
                                            <div className="filter-head">
                                                <button
                                                    className="filter-bck"
                                                    aria-label="Filter"
                                                    role="button"
                                                    type={"button"}
                                                    onClick={
                                                        toggleFilterHandler
                                                    }
                                                >
                                                    <i className="icon-bck"></i>
                                                    Filter
                                                </button>
                                                <button
                                                    className="clear-all"
                                                    aria-label="Clear All"
                                                    role="button"
                                                    type="button"
                                                    onClick={clearAllHandler}
                                                >
                                                    Clear All
                                                </button>
                                            </div>
                                            <FilterDataMob
                                                filterList={filterList}
                                                attributes={attributes}
                                                toggleFilterHandler={
                                                    toggleFilterHandler
                                                }
                                            />
                                        </div>
                                    </CSSTransition>
                                </>
                            ) : (
                                <div
                                    className="ltl-wrapper brand-filter-scroll"
                                    style={{
                                        position: "sticky",
                                        top: `${elementHeight + 10}px`,
                                        left: 0,
                                        height: `calc(100vh - ${
                                            elementHeight + 20
                                        }px)`,
                                    }}
                                >
                                    {isMounted && (
                                        <Scrollbars
                                            style={{
                                                width: "auto",
                                                height: "100%",
                                            }}
                                            renderThumbVertical={(props) => (
                                                <div
                                                    {...props}
                                                    className="thumb-vertical"
                                                />
                                            )}
                                            renderTrackVertical={(props) => (
                                                <div
                                                    {...props}
                                                    className="track-vertical"
                                                />
                                            )}
                                        >
                                            <div className="filter-data">
                                                <FilterData
                                                    filterList={filterList}
                                                    attributes={attributes}
                                                />
                                            </div>
                                        </Scrollbars>
                                    )}
                                </div>
                            )}

                            <div
                                ref={productListRef}
                                className="product-details listing-page-right"
                            >
                                <h1>{categoryDetails?.name}</h1>
                                <p>
                                    {categoryDetails?.shortDescription?.length
                                        ? categoryDetails.shortDescription
                                        : "This is dummy/static description."}
                                </p>
                                {/* <div className="product-blocks listing-product-details">
                                <div className="brands-wrap"></div>
                            </div> */}
                                {productsList?.length > 0 ||
                                products?.length > 0 ? (
                                    <div className="product-discount">
                                        <div className="discount-categories">
                                            <div
                                                className={`discount-categories-lists listing-page-discount ${
                                                    discountBanners?.length ===
                                                    1
                                                        ? "single-slide"
                                                        : ""
                                                }`}
                                                onWheel={(e) =>
                                                    onWheelSlider(e, sliderRef)
                                                }
                                            >
                                                <Slider
                                                    {...settings2}
                                                    ref={sliderRef}
                                                >
                                                    {discountBanners?.map(
                                                        (banner) => {
                                                            return (
                                                                <div
                                                                    key={
                                                                        banner.image
                                                                    }
                                                                    className="about-discount discount-upto"
                                                                >
                                                                    <Link
                                                                        href=""
                                                                        aria-label="discount banner"
                                                                    >
                                                                        {/* <img
                                                                    src={
                                                                        DiscountBanner2.src
                                                                    }
                                                                    alt="discount-banner"
                                                                /> */}
                                                                        <div
                                                                            style={{
                                                                                position:
                                                                                    "relative",
                                                                            }}
                                                                            className="next-img-new"
                                                                        >
                                                                            <Image
                                                                                // sizes="100%"
                                                                                // fill
                                                                                priority
                                                                                src={
                                                                                    banner.image
                                                                                }
                                                                                alt="discount-banner"
                                                                                width={
                                                                                    504
                                                                                }
                                                                                height={
                                                                                    156
                                                                                }
                                                                                title="discount"
                                                                            />
                                                                        </div>
                                                                        <div className="discount-details">
                                                                            <h4>
                                                                                {
                                                                                    banner.title
                                                                                }
                                                                            </h4>
                                                                            <span className="save-text">
                                                                                {
                                                                                    banner?.desc
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </Slider>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                                {productsList?.length > 0 ||
                                products?.length > 0 ? (
                                    <SelectedProduct
                                        filterList={filterList}
                                        clearAllHandler={clearAllHandler}
                                        isListingVisible={isListingVisible}
                                    />
                                ) : null}
                                <AllProduct
                                    productsList={
                                        products ? products : productsList
                                    }
                                    imgPath={imgPath}
                                    totalRecords={totalRecords}
                                    setCurrentPage={setCurrentPage}
                                />
                            </div>
                        </div>
                    </div>
                    {updatedFaqList && updatedFaqList.length > 0 && (
                        <div className="faq-listing-page">
                            <h3>Frequently Asked Questions</h3>
                            <Accordion
                                accordionData={updatedFaqList?.splice(0, 5)}
                            />
                        </div>
                    )}
                    <AdditionalInformation
                        detail={categoryDetails?.description}
                    />
                </div>
            </div>
        </>
    );
};
export default Listing;
