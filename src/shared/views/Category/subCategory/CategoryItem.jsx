import React from "react";

import Link from "next/link";
import Image from "next/image";

import placeholderImg from "@/shared/assets/images/category-placeholder.png";
import "./CategoryItem.scss";

const CategoryItem = ({ categoryItem }) => {
    return (
        <>
            <div className="category-boxes">
                <Link
                    href={`/${categoryItem?.slug}`}
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
                            src={categoryItem?.categoryLogo?.[0]}
                            alt={categoryItem?.categoryName}
                            title={categoryItem?.categoryName}
                        />
                    </div>
                    <span className="category-title">
                        {categoryItem?.categoryName}
                    </span>
                </Link>
            </div>
        </>
    );
};

export default CategoryItem;
