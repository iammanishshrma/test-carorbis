import React from "react";

import Link from "next/link";
import Image from "next/image";
import "./DiscountNew.scss";

const DiscountNew = ({ bannerData }) => {
    return (
        <>
            <div className="discount-categories">
                <div className="discount-categories-lists cat-list">
                    {bannerData.map(({ _id: id, translationData }) => {
                        const webBannerData = translationData.bannerWebData[0];
                        const mobBannerData = translationData.bannerMobData[0];
                        return (
                            <div className="about-discount" key={id}>
                                <Link
                                    href={webBannerData.url}
                                    style={{ position: "relative" }}
                                    aria-label="discount banner"
                                >
                                    <picture>
                                        <source
                                            media="(min-width: 768px)"
                                            srcSet={webBannerData.image}
                                        />
                                        <Image
                                            // fill
                                            // sizes="100%"
                                            src={mobBannerData.image}
                                            alt={webBannerData.title}
                                            width={680}
                                            height={200}
                                            priority
                                            title={webBannerData.title}
                                        />
                                    </picture>
                                    <div className="discount-details">
                                        {/* <span className="save-text">
                                            Bundle & Save
                                        </span> */}
                                        <h4>{webBannerData.title}</h4>
                                        <span className="filter-text">
                                            {webBannerData.desc}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
                {/* <div className="discount-categories-lists">
                    <div className="about-discount">
                        <Link href="/">
                            <img
                                src={DiscountBanner1.src}
                                alt="discount-banner"
                            />
                            <div className="discount-details">
                                <span className="save-text">Bundle & Save</span>
                                <span className="filter-text">
                                    Car Filter Change
                                </span>
                                <h4>Special</h4>
                            </div>
                        </Link>
                    </div>
                    <div className="about-discount discount-upto">
                        <Link href="/">
                            <img
                                src={DiscountBanner2.src}
                                alt="discount-banner"
                            />
                            <div className="discount-details">
                                <h4>uPTO 25% OFF</h4>
                                <span className="save-text">
                                    on all interior accessories
                                </span>
                            </div>
                        </Link>
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default DiscountNew;
