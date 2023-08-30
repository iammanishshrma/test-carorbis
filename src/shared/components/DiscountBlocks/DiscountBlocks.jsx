import React from "react";

import Link from "next/link";

import "./DiscountBlocks.scss";
import Image from "next/image";

const DiscountBlocks = ({ bannerData }) => {
    return (
        <>
            <div className="discount-categories">
                {/* <div className="discount-categories-lists">
          <div className="about-discount">
            <Link href="">
              <img src={DiscountBanner1} alt="discount-banner" />
              <div className="discount-details">
                <span className="save-text">Bundle & Save</span>
                <span className="filter-text">Car Filter Change</span>
                <h4>Special</h4>
              </div>
            </Link>
          </div>
          <div className="about-discount discount-upto">
            <Link href="">
              <img src={DiscountBanner2} alt="discount-banner" />
              <div className="discount-details">
                <h4>uPTO 25% OFF</h4>
                <span className="save-text">on all interior accessories</span>
              </div>
            </Link>
          </div>
        </div> */}
                <div className="discount-categories-lists home-page-discount">
                    {bannerData.map(({ _id: id, translationData }) => {
                        const webBannerData = translationData.bannerWebData[0];
                        const mobBannerData = translationData.bannerMobData[0];
                        return (
                            <div
                                className="about-discount interior-discount"
                                key={id}
                            >
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
                                            // sizes="100%"
                                            // fill
                                            src={mobBannerData.image}
                                            alt={webBannerData.title}
                                            width={328}
                                            height={200}
                                            priority
                                            // title={webBannerData.title}
                                        />
                                    </picture>
                                    <div className="discount-details">
                                        <h4>{webBannerData.title}</h4>
                                        <span className="save-text">
                                            {webBannerData.desc}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
                {/* <div className="discount-categories-lists home-page-discount">
                    <div className="about-discount interior-discount">
                        <Link href="">
                            <img
                                src={DiscountBanner3.src}
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
                    <div className="about-discount">
                        <Link href="">
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
                    <div className="">
                        <Link href="">
                            <img
                                src={DiscountBanner3.src}
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

export default DiscountBlocks;
