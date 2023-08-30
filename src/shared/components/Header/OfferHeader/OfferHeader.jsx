import React from "react";

import "./OfferHeader.scss";

const OfferHeader = ({ headerBanner, offer, closeOffer }) => {
    return (
        <>
            {offer && (
                <div
                    className={`announcement-bar ${offer === "hide" ? "hiding" : ""
                        }`}
                >
                    <div className="offr-wrp offer-text">
                        <div
                            style={{ color: headerBanner?.headerColor }}
                            dangerouslySetInnerHTML={{
                                __html: headerBanner.headerText,
                            }}
                        />
                        <a
                            target="_blank"
                            href={headerBanner.link}
                            className="link-main head-offer-link"
                            aria-label="View Deals"
                            style={{ color: headerBanner.buttonColor }}
                        >
                            {headerBanner.buttonText}
                        </a>
                    </div>
                    <button
                        className="close-notification"
                        onClick={closeOffer}
                        aria-label="close notification"
                        role="button"
                    >
                        <i className="icon-close"></i>
                    </button>
                </div>
            )}
        </>
    );
};
export default OfferHeader;
