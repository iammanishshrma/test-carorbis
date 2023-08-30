import React, { useState, useEffect } from "react";

import SliderImage from "./SliderImage/SliderImage";
import SliderContent from "./SliderContent/SliderContent";
import "./AboutProduct.scss";
import MobileSlider from "../MobileSlider/MobileSlider";
import { useWindowSize } from "@/shared/hooks/windowSize";

const AboutProduct = ({
    productDetails,
    imgPaths,
    attributes,
    selectedVendor,
    elementHeight,
}) => {
    const [selectedAttributes, setSelectedAttributes] = useState(null);

    const [productInfo, setProductInfo] = useState(null);
    const [windowWidth] = useWindowSize();

    useEffect(() => {
        attributes?.map((attribute) => {
            setSelectedAttributes((prev) => {
                return {
                    [attribute.id]: attribute?.defaultValue
                        ? attribute.defaultValue
                        : attribute?.value?.[0],
                    ...prev,
                };
            });
        });
    }, [attributes]);

    useEffect(() => {
        const productVariant = productDetails?.variantproductDetails?.find(
            (item) => {
                return item.vendorId === selectedVendor;
            }
        )?.variantData;
        if (productVariant?.length === 0 || !productVariant) {
            const variantInfo = {
                name: productDetails?.name,
                price: productDetails?.price,
                sellingPrice: productDetails?.sellingPrice,
                image: productDetails?.images,
                quantity: productDetails?.inventory?.stockLeft,
            };
            return setProductInfo(variantInfo);
        }
        const selectedVariant = productVariant?.find((variant) => {
            const check = Object.keys(selectedAttributes).map((item) => {
                return selectedAttributes[item] === variant[item];
            });
            return !check.includes(false);
        });
        setProductInfo(selectedVariant);
    }, [productDetails, selectedVendor, selectedAttributes]);

    // Handle Attributes Changes
    const attributeChangeHandler = (event, attributeId) => {
        setSelectedAttributes((prev) => {
            return {
                ...prev,
                [attributeId]: event.target.value,
            };
        });
    };

    return (
        <div className="slider-content">
            {windowWidth > 767 ? (
                productDetails?.images?.length > 0 && (
                    <div
                        className="lgt-slider"
                        style={{ top: `${elementHeight + 10}px` }}
                    >
                        <SliderImage
                            sliderImg={productInfo?.image}
                            imgPaths={imgPaths}
                        />
                    </div>
                )
            ) : (
                <div className="mobile-slider">
                    <MobileSlider
                        mobileSlider={productInfo?.image}
                        imgPaths={imgPaths}
                    />
                </div>
            )}
            <div className="rgt-slider">
                <SliderContent
                    productDetails={productDetails}
                    attributes={attributes}
                    productInfo={productInfo}
                    attributeChangeHandler={attributeChangeHandler}
                    selectedAttributes={selectedAttributes}
                />
            </div>
        </div>
    );
};

export default AboutProduct;
