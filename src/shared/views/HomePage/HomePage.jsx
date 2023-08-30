import React from "react";

import Banner from "@/shared/components/Banner/Banner";
import Services from "@/shared/components/AboutServices/AboutServices";
import SearchFilter from "@/shared/components/SearchFilter/SearchFilter";
import FeaturedCategory from "@/shared/components/FeaturedCategories/FeaturedCategories";
import DiscountBlocks from "@/shared/components/DiscountBlocks/DiscountBlocks";
import BestSeller from "@/shared/components/BestSellers/BestSellers";
import TopRatedProduct from "@/shared/components/TopRatedProduct/TopRatedProduct";
import DiscountNew from "@/shared/components/DiscountNew/DiscountNew";
import TopBrands from "@/shared/components/TopBrands/TopBrands";
import ClientTestimonial from "@/shared/components/ClientTestimonial/ClientTestimonial";
import MostReliable from "@/shared/components/MostReliable/MostReliable";

import "./HomePage.scss";

const HomePage = ({
    testimonialList,
    bannerList,
    tripleOfferBanner,
    doubleOfferBanner,
    categoryList,
    servicesList,
    bestSellerList,
    topRatedList,
    brandsList,
}) => {
    const featuredHead = "Featured Categories";

    return (
        <>
            <section className="banner">
                <Banner bannerList={bannerList} />
            </section>
            {servicesList?.data?.length > 0 && (
                <section className="about-services">
                    <div
                        className="container"
                        dangerouslySetInnerHTML={{
                            __html: servicesList?.data?.[0]?.content,
                        }}
                    />
                </section>
            )}
            <section className="search-categories select-filter-wrapper">
                <div className="container">
                    <SearchFilter />
                </div>
            </section>
            <section className="featured-category feature-cat">
                <div className="container">
                    <FeaturedCategory
                        categoryList={categoryList}
                        featuredHead={featuredHead}
                    />
                </div>
            </section>
            <section className="discount-wrap">
                <div className="container">
                    <DiscountBlocks bannerData={tripleOfferBanner} />
                </div>
            </section>
            {bestSellerList?.productDetails?.length > 0 ? (
                <section className="bestsellers-wrap">
                    <div className="container">
                        <BestSeller bestSellerList={bestSellerList} />
                    </div>
                </section>
            ) : null}
            {topRatedList?.productDetails?.length > 0 ? (
                <section className="bestsellers-wrap">
                    <div className="container">
                        <TopRatedProduct topRatedList={topRatedList} />
                    </div>
                </section>
            ) : null}
            <section className="discount-wrap discount-new">
                <div className="container">
                    <DiscountNew bannerData={doubleOfferBanner} />
                </div>
            </section>
            {brandsList.topBrand.length > 0 ? (
                <section className="top-brands featured-category new-top-brands">
                    <div className="container">
                        <TopBrands brandsList={brandsList} />
                    </div>
                </section>
            ) : null}
            <section className="client-testimonial">
                <div className="container">
                    <ClientTestimonial testimonialList={testimonialList} />
                </div>
            </section>
        </>
    );
};
export default HomePage;
