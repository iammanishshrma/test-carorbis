import React from "react";
import Link from "next/link";
import Image from "next/image";

import Rating from "react-rating";

import emptyStar from "@/shared/assets/images/transparent.svg";
import filledStar from "@/shared/assets/images/yellow-star.svg";

import "./Product.scss";

const Products = ({ product, imagePath }) => {
    const discountPercent = (
        ((product.price - product.sellingPrice) / product.price) *
        100
    ).toFixed(2);

    const getTag = (identifier) => {
        if (identifier === "recommended") {
            return <span className="recomended">RECOMMENDED</span>;
        } else if (identifier === "top_rated") {
            return <span className="top-rated">Top Rated</span>;
        } else {
            return null;
        }
    };

    return (
        <div className="product-wrap">
            <div className="product-image">
                {getTag(product?.productIdentifier)}
                <Link
                    href={`/${product.categoryData?.slug}/${product.slug}`}
                    style={{ position: "relative" }}
                    aria-label="product image"
                    className="product-img-wrp"
                >
                    <Image
                        src={`${imagePath.thumb}/${product.defaultImage}`}
                        alt={product.name}
                        width={251}
                        height={190}
                        title={product.name}
                        priority={true}
                    />
                </Link>
            </div>
            <div className="product-content">
                <span className="brand-name">
                    {product.brandData?.[0]?.name}
                </span>
                <div className="product-name">
                    <Link
                        href={`/${product.categoryData?.slug}/${product.slug}`}
                        style={{ position: "relative" }}
                        aria-label="product detail"
                    >
                        {product.name}
                    </Link>
                </div>
                <div className="card-bottom-wrap">
                    <div className="rating-section rating-fix">
                        {/* {[...Array(5)].map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={
                                        product.rating <= index
                                            ? "transparent-star"
                                            : "colored-star"
                                    }
                                ></div>
                            );
                        })} */}
                        <Rating
                            initialRating={product?.rating}
                            readonly
                            emptySymbol={<div className={"transparent-star"} />}
                            fullSymbol={<div className={"colored-star"} />}
                        />
                        {product.ratingCount !== 0 && (
                            <div className="rating-count">
                                ({product.ratingCount})
                            </div>
                        )}
                    </div>
                    <div className="product-discount">
                        <div className="price-wrap">
                            {product.price > product.sellingPrice && (
                                <span className="actual-price">
                                    &#8377;{product.price}
                                </span>
                            )}
                            <span className="discount-price">
                                &#8377;{product.sellingPrice}
                            </span>
                        </div>
                        {discountPercent > 0 && (
                            <span className="discount-off">
                                {`(${discountPercent}% off)`}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
