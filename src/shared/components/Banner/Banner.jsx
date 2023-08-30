import React, { useRef } from "react";

import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";
import "./Banner.scss";
import { debounce } from "lodash";

const Banner = ({ bannerList }) => {
    const sliderRef = useRef();
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        accessibility: true,
        autoplaySpeed: 4000,
    };
    const onWheelSlider = debounce((e, ref) => {
        if (!ref?.current) return;
        if (e.deltaX > 0) {
            ref?.current?.slickNext();
        } else if (e.deltaX < 0) {
            ref?.current?.slickPrev();
        }
    }, 20);

    return (
        <>
            <div onWheel={(e) => onWheelSlider(e, sliderRef)}>
                <Slider {...settings} className="banner-block" ref={sliderRef}>
                    {bannerList.map(({ _id: id, translationData }) => {
                        const webBannerData = translationData.bannerWebData[0];
                        const mobBannerData = translationData.bannerMobData[0];
                        return (
                            <div
                                key={id}
                                className="banner-wrap"
                                style={{ position: "relative" }}
                            >
                                <picture>
                                    <source
                                        media="(min-width: 768px)"
                                        srcSet={webBannerData.image}
                                    />
                                    <Image
                                        src={mobBannerData.image}
                                        width={1600}
                                        height={340}
                                        priority
                                        alt={mobBannerData.title}
                                        title="banner"
                                    />
                                </picture>
                                <div className="container">
                                    <h1>{webBannerData.title}</h1>
                                    <span className="banner-head">
                                        {webBannerData.desc}
                                    </span>
                                    <div className="btn">
                                        <Link
                                            href={webBannerData.url}
                                            aria-label="shop now"
                                        >
                                            Shop Now
                                            <svg
                                                width="21"
                                                height="18"
                                                viewBox="0 0 21 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M2.57572 16.5L1.28784 15.2121L7.46208 9L1.28784 2.78788L2.57572 1.5L9.99996 9L2.57572 16.5Z"
                                                    fill="white"
                                                    stroke="white"
                                                />
                                                <path
                                                    d="M12.2879 16.5L11 15.2121L17.1742 9L11 2.78788L12.2879 1.5L19.7121 9L12.2879 16.5Z"
                                                    fill="white"
                                                    stroke="white"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </>
    );
};
export default Banner;
