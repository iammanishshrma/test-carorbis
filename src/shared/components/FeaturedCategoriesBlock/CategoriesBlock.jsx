import React from "react";

import Link from "next/link";
import Image from "next/image";

import placeholderImg from "@/shared/assets/images/category-placeholder.png";
import "./CategoriesBlock.scss";

const CategoriesBlock = ({ categoryItem }) => {
    const getUrl = (slug, navigationLevel) => {
        if (navigationLevel === "category_level") {
            return `/category/${slug}`;
        } else if (navigationLevel === "sub_category_level") {
            return `/sub-category/${slug}`;
        } else {
            return `/${slug}`;
        }
    };
    return (
        <>
            <div className="category-boxes">
                <Link
                    href={getUrl(
                        categoryItem.slug,
                        categoryItem.navigationLevel
                    )}
                    aria-label="category image"
                >
                    <div
                        className="image-wrap"
                        style={{ position: "relative" }}
                    >
                        <Image
                            width={175}
                            height={110}
                            priority
                            src={
                                categoryItem.translationData.categoryLogo.length
                                    ? categoryItem.translationData
                                        .categoryLogo[0]
                                    : placeholderImg.src
                            }
                            alt={categoryItem.translationData.categoryName}
                            title={categoryItem.translationData.categoryName}
                        />
                    </div>
                    <span className="category-title">
                        {categoryItem.translationData.categoryName}
                    </span>
                </Link>
            </div>
        </>
    );
};

export default CategoriesBlock;
