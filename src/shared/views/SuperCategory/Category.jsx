import React, { useEffect, useRef, useState } from "react";

import { debounce } from "lodash";
import Slider from "react-slick";

import { useWindowSize } from "@/shared/hooks/windowSize";

import TopBrands from "@/shared/components/TopBrands/TopBrands";

import Product from "@/shared/components/Product/Product";
import Accordion from "@/shared/components/CustomAccordion/Accordion";
import BestCarAccessories from "@/shared/components/BestCarAccessories/BestCarAccessories";
import BreadCrumbSection from "@/shared/components/BreadCrumb/BreadCrumb";
import CategoryDetails from "@/shared/components/CategoryDetails/CategoryDetails";
import SubCategories from "@/shared/components/CategoryDetails/SubCategories/SubCategories";

import "../../views/HomePage/HomePage.scss";
import "../../components/BrandCard/BrandCard.scss";
import "./Category.scss";

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

const Category = ({ categoryData, topSeller, trendingProducts, topBrands }) => {
    const updatedFaqList = categoryData?.faqData?.map((faq) => {
        return {
            id: Math.random(),
            title: `Q. ${faq.question}`,
            content: faq.answer,
        };
    });

    const [breadCrumbs, setBreadCrumbs] = useState(null);

    const [windowWidth] = useWindowSize();
    const sliderRef1 = useRef();
    const sliderRef2 = useRef();

    useEffect(() => {
        setBreadCrumbs([
            {
                name: "Home",
                link: "/",
            },
            {
                name: categoryData?.categoryName,
            },
        ]);
    }, [categoryData]);

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
            <section className="category-breadcum">
                <div className="container">
                    {breadCrumbs && (
                        <BreadCrumbSection breadcrumbData={breadCrumbs} />
                    )}
                </div>
            </section>
            <section className="discount-wrap category-discount-block">
                <div className="container">
                    <CategoryDetails categoryData={categoryData} />
                </div>
            </section>

            <section className="featured-category feature-cat category-page-feature trending-cat">
                <div className="container">
                    <SubCategories
                        subCategories={categoryData?.subCategoryList}
                    />
                </div>
            </section>
            {trendingProducts?.trendingProduct?.length > 0 && (
                <section className="trending-cat super-cat-trending">
                    <div className="container">
                        <div className="similar-products">
                            <h3>Trending</h3>
                            <div onWheel={(e) => onWheelSlider(e, sliderRef1)}>
                                <Slider {...settings} ref={sliderRef1}>
                                    {trendingProducts?.trendingProduct?.map(
                                        (product, index) => {
                                            return (
                                                <Product
                                                    product={product}
                                                    imagePath={
                                                        trendingProducts.PRODUCTSHOWIMAGEPATH
                                                    }
                                                    key={product._id}
                                                />
                                            );
                                        }
                                    )}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {topSeller?.bestSellerProduct?.length > 0 && (
                <section className="trending-cat super-cat-trending">
                    <div className="container">
                        <div className="similar-products">
                            <h3>Top Sellers</h3>
                            <div onWheel={(e) => onWheelSlider(e, sliderRef2)}>
                                <Slider {...settings} ref={sliderRef2}>
                                    {topSeller?.bestSellerProduct?.map(
                                        (product, index) => {
                                            return (
                                                <Product
                                                    product={product}
                                                    imagePath={
                                                        topSeller.PRODUCTSHOWIMAGEPATH
                                                    }
                                                    key={product._id}
                                                />
                                            );
                                        }
                                    )}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <section className="category-page brand-category new-top-brands">
                {topBrands?.topBrand.length > 0 ? (
                    <section className="top-brands featured-category">
                        <div className="container">
                            <TopBrands brandsList={topBrands} />
                        </div>
                    </section>
                ) : null}
            </section>
            <section className="best-car-accessories">
                <BestCarAccessories
                    description={categoryData?.categoryDescription}
                />
            </section>
            <section className="faq-category-page sub-cat-faq">
                <div className="container">
                    <h3>Frequently asked questions</h3>
                    {updatedFaqList?.length > 0 ? (
                        <Accordion
                            accordionData={updatedFaqList?.splice(0, 5)}
                        />
                    ) : (
                        <span>No faq found!!!</span>
                    )}
                </div>
            </section>
        </>
    );
};
export default Category;
