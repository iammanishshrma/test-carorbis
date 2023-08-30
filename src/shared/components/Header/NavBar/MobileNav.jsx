import Link from "next/link";
import React, { useState } from "react";

const DesktopNav = ({ categoryList }) => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeSubCategory, setActiveSubcategory] = useState(null);

    const toggleMegaMenu = (activeMenuId, subCategoryId) => {
        if (activeMenuId === activeCategory) {
            return setActiveCategory(null);
        }
        setActiveCategory(activeMenuId);
        setActiveSubcategory(subCategoryId);
    };

    const toggleSubMenu = (activeMenuId) => {
        if (activeMenuId === activeSubCategory) {
            return setActiveSubcategory(null);
        }
        setActiveSubcategory(activeMenuId);
    };

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
        <ul className="navigation naviagtion-mobile header-navigation">
            {categoryList?.map((category) => {
                return (
                    <li
                        key={category._id}
                        // onMouseLeave={() => toggleMegaMenu()}
                    >
                        <div className="list-nav">
                            <Link
                                href={getUrl(
                                    category.slug,
                                    category.navigationLevel
                                )}
                                aria-label="navigation data"
                                className={
                                    activeCategory === category._id
                                        ? "main-head-list active"
                                        : "main-head-list"
                                }
                            >
                                {category.categoryName}
                            </Link>
                            <button
                                className="arrow arrow-list"
                                onClick={() =>
                                    toggleMegaMenu(
                                        category._id,
                                        category?.subCategoryList?.[0]._id
                                    )
                                }
                            >
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
                            </button>
                        </div>
                        {activeCategory === category._id && (
                            <div className="megamenu-wrap">
                                <ul className="ltl-menu">
                                    {categoryList
                                        .find(
                                            (cat) => cat._id === activeCategory
                                        )
                                        ?.subCategoryList?.map(
                                            (subCategory) => {
                                                return (
                                                    <li
                                                        key={subCategory._id}
                                                        // onMouseLeave={() =>
                                                        //     toggleSubMenu()
                                                        // }
                                                    >
                                                        <div className="list-nav list-sub-nav">
                                                            <Link
                                                                href={getUrl(
                                                                    subCategory.slug,
                                                                    subCategory.navigationLevel
                                                                )}
                                                                aria-label="navigation item"
                                                                className="sub-menu-list"
                                                            >
                                                                {
                                                                    subCategory.categoryName
                                                                }
                                                            </Link>
                                                            <button
                                                                className="arrow"
                                                                onClick={() =>
                                                                    toggleSubMenu(
                                                                        subCategory._id
                                                                    )
                                                                }
                                                            >
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
                                                            </button>
                                                        </div>
                                                        {subCategory._id ===
                                                            activeSubCategory && (
                                                            <div className="rtl-menu">
                                                                {subCategory?.subCategoryList?.map(
                                                                    (
                                                                        subSubCategory
                                                                    ) => {
                                                                        return (
                                                                            <div
                                                                                className="rtl-menu-wrap"
                                                                                key={
                                                                                    subSubCategory._id
                                                                                }
                                                                            >
                                                                                <h4>
                                                                                    {
                                                                                        subSubCategory.categoryName
                                                                                    }
                                                                                </h4>
                                                                                <ul>
                                                                                    {subSubCategory?.subCategoryList?.map(
                                                                                        (
                                                                                            subSubSubCategory
                                                                                        ) => {
                                                                                            return (
                                                                                                <li
                                                                                                    key={
                                                                                                        subSubSubCategory._id
                                                                                                    }
                                                                                                >
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
                                                                                                    <Link
                                                                                                        href={getUrl(
                                                                                                            subSubSubCategory.slug,
                                                                                                            subSubSubCategory.navigationLevel
                                                                                                        )}
                                                                                                        aria-label="navigation item"
                                                                                                    >
                                                                                                        {
                                                                                                            subSubSubCategory.categoryName
                                                                                                        }
                                                                                                    </Link>
                                                                                                </li>
                                                                                            );
                                                                                        }
                                                                                    )}
                                                                                </ul>
                                                                            </div>
                                                                        );
                                                                    }
                                                                )}
                                                            </div>
                                                        )}
                                                    </li>
                                                );
                                            }
                                        )}
                                </ul>
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default DesktopNav;
