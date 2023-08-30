import React from "react";

import Link from "next/link";

import "./CategoriesBlock.scss";
import Image from "next/image";

const CategoriesBlock = (props) => {
    return (
        <>
            <div className="category-boxes">
                <Link href="/product-listing" aria-label="product image">
                    <div
                        className="image-wrap"
                        style={{ position: "relative" }}
                    >
                        <Image
                            // fill
                            // sizes="100%"
                            src={props.getData.imageLink}
                            alt="category"
                            priority
                            width={108}
                            height={110}
                            title={props.getData.title}
                        />
                    </div>
                    <span className="category-title">
                        {props.getData.title}
                    </span>
                </Link>
            </div>
        </>
    );
};

export default CategoriesBlock;
