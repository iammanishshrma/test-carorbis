import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";

import Slider from "react-slick";
import loadable from "@loadable/component";

import { useIsInViewport } from "@/shared/hooks/inView";

import Product from "@/shared/components/Product/Product";

const DetailNavigationComponent = loadable(() =>
    import("@/shared/components/DetailNavigation/DetailNavigation")
);

import AboutProduct from "@/shared/components/AboutProduct/AboutProduct";
import BreadCrumbSection from "@/shared/components/BreadCrumb/BreadCrumb";

import Accordion from "@/shared/components/CustomAccordion/Accordion";
import Reviews from "@/shared/components/Reviews/Reviews";

import DetailProduct from "@/shared/components/DetailProduct/DetailProduct";
import Features from "@/shared/components/Features/Features";
import Warranty from "@/shared/components/Warranty/Warranty";
import "./ProductDetails.scss";
import { debounce } from "lodash";
import { useWindowSize } from "@/shared/hooks/windowSize";
import getUrl from "@/shared/utils/getUrl";
import { useElementHeight } from "@/shared/hooks/elementHeight";

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
                slidesToShow: 4,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 1022,
            settings: {
                slidesToShow: 3,
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

const ProductDetails = ({
    productDetails,
    imgPaths,
    recommendedProducts,
    relatedProducts,
    recentProducts,
    breadcrumbList,
}) => {
    const router = useRouter();
    const detailRef = useRef();
    const warrantyRef = useRef();
    const featureRef = useRef();
    const faqRef = useRef();
    const reviewsRef = useRef();
    const tabContainerRef = useRef();
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [breadcrumbs, setBreadcrumbs] = useState(null);

    const headerElement =
        typeof window !== "undefined"
            ? document.getElementById("top-header")
            : null;
    const elementHeight = useElementHeight(headerElement);

    const [windowWidth] = useWindowSize();
    const sliderRef1 = useRef();
    const sliderRef = useRef();
    const sliderRef2 = useRef();

    useEffect(() => {
        const breadcrumbs = [{ name: "Home", link: "/" }];
        breadcrumbList?.forEach((item) => {
            breadcrumbs.push({
                name: item.categoryName,
                link: getUrl(item.slug, item.navigationLevel),
            });
        });
        breadcrumbs.push({
            name: productDetails?.name,
            link: null,
        });
        setBreadcrumbs(breadcrumbs);
        setSelectedVendor(productDetails.inventory.vendorId);
    }, [productDetails, router, breadcrumbList]);

    const observerOptions = {
        root: null,
        rootMargin: `-${elementHeight + 66}px 0px 0px 0px`,
        threshold: 0,
    };
    const isDetailVisible = useIsInViewport(detailRef, observerOptions);
    const isWarrantyVisible = useIsInViewport(warrantyRef, observerOptions);
    const isFeatureVisible = useIsInViewport(featureRef, observerOptions);
    const isFaqVisible = useIsInViewport(faqRef, observerOptions);
    const isReviewVisible = useIsInViewport(reviewsRef, observerOptions);
    const isTabContainerVisible = useIsInViewport(
        tabContainerRef,
        observerOptions
    );

    // Transformed Recommended Products List
    const recommendedList = recommendedProducts?.response?.map((product) => {
        return {
            ...product,
            categoryData: {
                slug: router.query.category,
            },
        };
    });
    const transformedRecommended = {
        ...recommendedProducts,
        response: recommendedList,
    };

    // Transformed Related Products List
    const relatedProductList = relatedProducts?.response.map((product) => {
        return {
            ...product,
            categoryData: {
                slug: router.query.category,
            },
        };
    });
    const transformedRelatedProducts = {
        ...relatedProducts,
        response: relatedProductList,
    };

    // Transformed Recent Products List
    const recentProductList = recentProducts?.recentlyViewedWithDetails?.map(
        (product) => {
            return {
                ...product.productDetails,
                brand: product.brandData.name,
                categoryData: product.categoriesDetails,
                brandData: [{ name: product.brandData.name }],
            };
        }
    );
    const transformedRecentProducts = {
        response: recentProductList,
        PRODUCTSHOWIMAGEPATH: recentProducts?.PRODUCTSHOWIMAGEPATH,
    };

    // Transformed Faq List
    const updatedFaqList = productDetails?.faqData?.map((faqItem) => {
        return {
            id: Math.random(),
            title: `Q. ${faqItem.question}`,
            content: faqItem.answer,
        };
    });

    // Transform Attributes
    const attributes = productDetails?.attributeResult?.map((attribute) => {
        const identifier = productDetails?.attributeDetails.find(
            (item) => item._id === attribute.id
        )?.identifier;
        const vendorVariants = productDetails?.variantproductDetails.find(
            (item) => item.vendorId === selectedVendor
        )?.variantData;
        const defaultAttributes = vendorVariants?.find(
            (item) => item.defaultVariant === 1
        )?.attribute;
        return {
            ...attribute,
            attributeName: productDetails?.attributeDetails.find(
                (item) => item._id === attribute.id
            )?.attributeName,
            attributeType: identifier || null,
            defaultValue: defaultAttributes?.find(
                (item) => item.id === attribute.id
            )?.value,
        };
    });
    const onWheelSlider = debounce((e, ref) => {
        if (!ref?.current) return;
        if (e.deltaX > 0 && windowWidth > 767) {
            ref?.current?.slickNext();
        } else if (e.deltaX < 0 && windowWidth > 767) {
            ref?.current?.slickPrev();
        }
    }, 20);

    return (
        <div className="product-listing">
            <div className="container">
                {breadcrumbs && (
                    <BreadCrumbSection breadcrumbData={breadcrumbs} />
                )}
                <AboutProduct
                    productDetails={productDetails}
                    imgPaths={imgPaths}
                    attributes={attributes}
                    selectedVendor={selectedVendor}
                    elementHeight={elementHeight}
                />
                <DetailNavigationComponent
                    style={{
                        top: `${elementHeight}px`,
                    }}
                    scrollToPosition={elementHeight + 66}
                    activeTab={
                        isDetailVisible
                            ? "DETAILTAB"
                            : isFeatureVisible
                            ? "FEATURETAB"
                            : isWarrantyVisible
                            ? "WARRANTYTAB"
                            : isReviewVisible
                            ? "REVIEWTAB"
                            : isFaqVisible
                            ? "FAQTAB"
                            : null
                    }
                    detailRef={detailRef}
                    featureRef={featureRef}
                    warrantyRef={warrantyRef}
                    reviewsRef={reviewsRef}
                    faqRef={faqRef}
                    isSticky={isTabContainerVisible}
                />

                <div
                    className="content-block content-product-block"
                    ref={tabContainerRef}
                >
                    <DetailProduct
                        ref={detailRef}
                        productDetail={productDetails?.description}
                    />
                    <Features ref={featureRef} features={attributes} />
                    <Warranty
                        ref={warrantyRef}
                        warrantyDetails={productDetails?.warrantyDetails}
                    />
                    <div
                        id="reviews"
                        className={`detail-wrp-block reviews-details-block`}
                    >
                        <div
                            ref={reviewsRef}
                            className="details-block detail-new-block"
                        >
                            <div className="review-head">
                                <h3>Rating & Reviews</h3>
                            </div>
                            <Reviews productId={productDetails?._id} />
                        </div>
                    </div>
                    <div
                        id="faqs"
                        className="detail-wrp-block accordion-detail-wrap"
                    >
                        <div ref={faqRef} className="details-block faq-details">
                            <h3>Frequently Asked Questions</h3>
                            {updatedFaqList?.length > 0 ? (
                                <Accordion accordionData={updatedFaqList} />
                            ) : (
                                <span>No faq found for this product.</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="product-sliders product-sliders-new">
                    {transformedRecommended?.response?.length > 0 ? (
                        <div className="similar-products recommended-similar-product">
                            <h3>Recommended Products</h3>
                            <div onWheel={(e) => onWheelSlider(e, sliderRef1)}>
                                <Slider {...settings} ref={sliderRef1}>
                                    {transformedRecommended.response.map(
                                        (product) => {
                                            return (
                                                <Product
                                                    product={product}
                                                    imagePath={
                                                        recommendedProducts?.PRODUCTSHOWIMAGEPATH
                                                    }
                                                    key={product._id}
                                                />
                                            );
                                        }
                                    )}
                                </Slider>
                            </div>
                        </div>
                    ) : null}
                    <div className="similar-products">
                        <h3>Related Products</h3>
                        <div onWheel={(e) => onWheelSlider(e, sliderRef)}>
                            <Slider {...settings} ref={sliderRef}>
                                {transformedRelatedProducts?.response?.map(
                                    (product) => {
                                        return (
                                            <Product
                                                product={product}
                                                imagePath={
                                                    relatedProducts?.PRODUCTSHOWIMAGEPATH
                                                }
                                                key={product._id}
                                            />
                                        );
                                    }
                                )}
                            </Slider>
                        </div>
                    </div>
                    {transformedRecentProducts?.response?.length > 0 && (
                        <div className="similar-products">
                            <h3>Recently Viewed</h3>
                            <div onWheel={(e) => onWheelSlider(e, sliderRef2)}>
                                <Slider {...settings} ref={sliderRef2}>
                                    {transformedRecentProducts?.response
                                        ?.reverse()
                                        ?.map((product) => {
                                            return (
                                                <Product
                                                    product={product}
                                                    imagePath={
                                                        recentProducts?.PRODUCTSHOWIMAGEPATH
                                                    }
                                                    key={product.slug}
                                                />
                                            );
                                        })}
                                </Slider>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;
