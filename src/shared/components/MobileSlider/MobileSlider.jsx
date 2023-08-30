import React, { useEffect, useState, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Navigation, Pagination, Autoplay } from "swiper/modules";

import { EmailShareButton } from "react-share";

// Import Swiper styles
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./MobileSlider.scss";
import Image from "next/image";
import { useRouter } from "next/router";

const MobileSlider = ({ mobileSlider, imgPaths }) => {
    const [shareUrl, setShareUrl] = useState(
        process.env.NEXT_PUBLIC_FRONTEND_HOST
    );

    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setShareUrl(process.env.NEXT_PUBLIC_FRONTEND_HOST + router.asPath);
        setIsClient(true);
    }, [router]);

    return (
        <div className="mob-slide-wrp">
            {isClient && (
                <EmailShareButton url={shareUrl}>
                    <button
                        type="button"
                        className="share"
                        aria-label="share"
                        role="button"
                    >
                        <i className="icon-share"></i>
                    </button>
                </EmailShareButton>
            )}
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                zoom={true}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                }}
                modules={[Autoplay, Zoom, Navigation, Pagination]}
                className="mySwiper"
            >
                {mobileSlider?.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className="swiper-zoom-container">
                                <div className="img-wrap">
                                    <Image
                                        sizes="100%"
                                        fill
                                        priority
                                        src={`${imgPaths.original}/${item}`}
                                        alt="slider-img"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default MobileSlider;
