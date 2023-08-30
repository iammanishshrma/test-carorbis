import React from "react";

import Link from "next/link";
import Image from "next/image";

import "./BrandCard.scss";

const BrandCard = ({ brand, imgPath }) => {
    return (
        <>
            <div className="category-boxes">
                <Link href={`/brands/${brand.slug}`} aria-label="product image">
                    <div
                        className="image-wrap"
                        style={{ position: "relative" }}
                    >
                        <Image
                            src={`${imgPath?.original}/${brand.brandLogo}`}
                            alt={brand.name}
                            priority
                            width={108}
                            height={99}
                            title={brand.name}
                        />
                    </div>
                    <span className="category-title">{brand.name}</span>
                </Link>
            </div>
        </>
    );
};

export default BrandCard;
