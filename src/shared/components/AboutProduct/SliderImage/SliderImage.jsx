import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import InnerImageZoom from "react-inner-image-zoom";
import Image from "next/image";
import { ScrollPanel } from "primereact/scrollpanel";

import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import "./SliderImage.scss";

const SliderImage = ({ sliderImg, imgPaths }) => {
    const [nav1, setNav1] = useState(null);
    const [SlideUrl, setSlideUrl] = useState();
    const [largeSlideUrl, setLargeSlideUrl] = useState();
    const [arrayLength, setArrayLength] = useState(sliderImg?.length);
    const [nav2, setNav2] = useState(null);
    const slider1 = useRef(null);
    const slider2 = useRef(null);
    const [active, slickActive] = useState(0);
    const router = useRouter();
    const [shareUrl, setShareUrl] = useState(
        process.env.NEXT_PUBLIC_FRONTEND_HOST
    );

    useEffect(() => {
        setShareUrl(process.env.NEXT_PUBLIC_FRONTEND_HOST + router.asPath);

        if (sliderImg) {
            setNav1(slider1.current);
            setNav2(slider2.current);
            setSlideUrl(`${imgPaths.thumb}/${sliderImg[0]}`);
            setLargeSlideUrl(`${imgPaths.original}/${sliderImg[0]}`);
        }
    }, [sliderImg, imgPaths, router]);

    const handleSlider = (e) => {
        e.stopPropagation();
        setArrayLength(sliderImg.length);
    };
    const getImage = (data) => {
        setSlideUrl(data);
        setLargeSlideUrl(data);
    };
    return (
        <div className="detail-slider">
            <div className="nav-first">
                <div className="img-wrap">
                    {SlideUrl ? (
                        <>
                            <InnerImageZoom
                                zoomType={"hover"}
                                src={SlideUrl}
                                zoomSrc={largeSlideUrl}
                            />
                        </>
                    ) : null}
                </div>
                <div className="social-media">
                    <span className="share-product">Share with a friend:</span>
                    <ul className="share-media">
                        <li>
                            <FacebookShareButton url={shareUrl}>
                                <i className="icon-fb social-icon" />
                            </FacebookShareButton>
                        </li>
                        <li>
                            <TwitterShareButton url={shareUrl}>
                                <i className="icon-twitter social-icon" />
                            </TwitterShareButton>
                        </li>
                        <li>
                            <EmailShareButton url={shareUrl}>
                                <i className="icon-email social-icon"></i>
                            </EmailShareButton>
                        </li>
                        <li>
                            <Link href="/" aria-label="instagram icon">
                                <i className="icon-insta social-icon"></i>
                            </Link>
                        </li>
                        <li>
                            <WhatsappShareButton url={shareUrl}>
                                <i className="icon-wtsapp social-icon"></i>
                            </WhatsappShareButton>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="nav-second">
                <ScrollPanel className="custom">
                    {sliderImg?.slice(0, arrayLength).map((item, index) => {
                        return (
                            <div
                                key={index}
                                style={{ position: "relative" }}
                                onClick={() => slickActive(index)}
                                onMouseEnter={() => slickActive(index)}
                                className={`slide-img ${
                                    active === index ? "active-slick" : ""
                                }`}
                            >
                                <Image
                                    priority
                                    src={`${imgPaths.thumb}/${item}`}
                                    alt="slider-img"
                                    width={504}
                                    height={156}
                                    title={item}
                                    onMouseOver={() =>
                                        getImage(`${imgPaths.original}/${item}`)
                                    }
                                />
                                {index === 4 &&
                                    arrayLength === 5 &&
                                    !(sliderImg?.length === 5) && (
                                        <div
                                            onClick={handleSlider}
                                            className="slide-wrapper"
                                        >
                                            <div className="add-wrap">
                                                <i className="add-icon"></i>
                                                <h4>
                                                    {sliderImg.length - 4}{" "}
                                                    Images
                                                </h4>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        );
                    })}
                </ScrollPanel>
            </div>
        </div>
    );
};

export default SliderImage;
