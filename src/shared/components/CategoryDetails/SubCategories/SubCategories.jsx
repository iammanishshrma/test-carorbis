import React from "react";

import Link from "next/link";

import "./SubCategories.scss";

const SubCategories = ({ subCategories }) => {
    return (
        <>
            <div className="cat-wrapper">
                {subCategories?.map((category, index) => {
                    return (
                        <div className="main-cat" key={category._id}>
                            <div className="cat-box">
                                <h4>{category?.categoryName}</h4>
                                <div className="block-wrp">
                                    <div className="ltl-block">
                                        {category?.subCategoryList?.map(
                                            (subCategory, index) => {
                                                const categories =
                                                    subCategory?.subCategoryList?.map(
                                                        (childCategory) => {
                                                            return childCategory;
                                                        }
                                                    );
                                                return categories?.map(
                                                    (item) => {
                                                        return (
                                                            <ul key={item._id}>
                                                                <li>
                                                                    <Link
                                                                        href={`/${item?.slug}`}
                                                                    >
                                                                        {
                                                                            item.categoryName
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        );
                                                    }
                                                );
                                            }
                                        )}
                                    </div>
                                    {category?.categoryLogo?.[0] && (
                                        <div className="rtl-block">
                                            <img
                                                src={category?.categoryLogo[0]}
                                                title={category?.categoryName}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="view-all-wrap">
                                    <Link
                                        href={`/sub-category/${category?.slug}`}
                                        className="view-all"
                                    >
                                        View all
                                    </Link>
                                    <span className="arrow">
                                        <svg
                                            width="13"
                                            height="8"
                                            viewBox="0 0 13 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1.25 1.5L6.25 6.5L11.25 1.5"
                                                stroke="#111E6C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default SubCategories;
