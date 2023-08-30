import React, { useEffect, useState } from "react";
import ScrollTop from "@/shared/assets/images/top.svg";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Top: 0 takes us all the way back to the top of the page
    // Behavior: smooth keeps it smooth!
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    useEffect(() => {
        // Button is displayed after scrolling for 500 pixels
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <>
            {isVisible && (
                <div className="scroll-top circle-wrap" onClick={scrollToTop}>
                    {/* <img src={ScrollTop.src} alt="scroll to top" /> */}
                    <i className="arrow-icon"></i>
                </div>
            )}
        </>
    );
};

export default ScrollToTop;
