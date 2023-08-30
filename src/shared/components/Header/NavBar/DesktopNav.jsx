import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { removeAllFilters } from "@/shared/store/slices/filterSlice";

const DesktopNav = ({ categoryList }) => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeCategorySlug, setActiveCategorySlug] = useState(null);
    const [activeSubCategory, setActiveSubcategory] = useState(null);
    const maxSubMenuListLength = 5;
    const maxRightMenuLenght = 6;
    const dispatch = useDispatch();
    const router = useRouter();

    const toggleMegaMenu = (activeMenuId, activeMenuSlug, subCategoryId) => {
        // const activeItem = categoryList.find(
        //     (category) => activeMenuId === category._id
        // );
        // if (activeItem?.subCategoryList?.length > 0) {
        // }
        setActiveCategory(activeMenuId);
        setActiveCategorySlug(activeMenuSlug);
        setActiveSubcategory(subCategoryId);
    };

    const toggleSubMenu = (activeMenuId) => {
        setActiveSubcategory(activeMenuId);
    };

    const navChangeHandler = (route) => {
        dispatch(removeAllFilters());
        router.push(route);
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
                        onMouseLeave={() => toggleMegaMenu()}
                    >
                        <Link
                            onMouseEnter={() =>
                                toggleMegaMenu(
                                    category._id,
                                    category.slug,
                                    category?.subCategoryList?.[0]._id
                                )
                            }
                            href={getUrl(
                                category.slug,
                                category.navigationLevel
                            )}
                            aria-label="navigation data"
                            className={
                                activeCategory === category._id ? "active" : ""
                            }
                        >
                            {category.categoryName}
                            <span className="arrow arrow-list">
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
                        </Link>
                        {activeCategory === category._id && (
                            <>
                                <div className="megamenu-wrap">
                                    <ul className="ltl-menu">
                                        {categoryList
                                            .find(
                                                (cat) =>
                                                    cat._id === activeCategory
                                            )
                                            ?.subCategoryList?.map(
                                                (subCategory) => {
                                                    return (
                                                        <li
                                                            key={
                                                                subCategory._id
                                                            }
                                                            onMouseLeave={() =>
                                                                toggleSubMenu()
                                                            }
                                                        >
                                                            <Link
                                                                href={getUrl(
                                                                    subCategory.slug,
                                                                    subCategory.navigationLevel
                                                                )}
                                                                aria-label="navigation item"
                                                                onMouseEnter={() =>
                                                                    toggleSubMenu(
                                                                        subCategory._id
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    subCategory.categoryName
                                                                }
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
                                                            </Link>
                                                            {subCategory._id ===
                                                                activeSubCategory && (
                                                                    <>
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
                                                                                                                // onClick={() =>
                                                                                                                //     navChangeHandler(
                                                                                                                //         `/${subSubSubCategory.slug}`
                                                                                                                //     )
                                                                                                                // }
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
                                                                                            {subSubCategory
                                                                                                ?.subCategoryList
                                                                                                ?.length >
                                                                                                maxSubMenuListLength && (
                                                                                                    <button className="view-more">
                                                                                                        ...
                                                                                                        View
                                                                                                        More
                                                                                                    </button>
                                                                                                )}
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </div>
                                                                        {subCategory
                                                                            ?.subCategoryList
                                                                            ?.length >
                                                                            maxRightMenuLenght && (
                                                                                <button className="view-all">
                                                                                    View
                                                                                    All
                                                                                </button>
                                                                            )}
                                                                    </>
                                                                )}
                                                        </li>
                                                    );
                                                }
                                            )}
                                    </ul>
                                </div>
                            </>
                        )}
                    </li>
                );
            })}
            {/* {categoryList?.map((category) => {
                return (
                    <li
                        key={category._id}
                        onMouseLeave={() => toggleMegaMenu()}
                    >
                        <Link
                            onMouseEnter={() =>
                                toggleMegaMenu(
                                    category._id,
                                    category?.subCategoryList?.[0]._id
                                )
                            }
                            href={`/category/${category.slug}`}
                            aria-label="navigation data"
                            className={
                                activeCategory === category._id ? "active" : ""
                            }
                        >
                            {category.categoryName}
                            <span className="arrow arrow-list">
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
                        </Link>
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
                                                        onMouseLeave={() =>
                                                            toggleSubMenu()
                                                        }
                                                    >
                                                        <Link
                                                            href="/product-listing"
                                                            aria-label="navigation item"
                                                            onMouseEnter={() =>
                                                                toggleSubMenu(
                                                                    subCategory._id
                                                                )
                                                            }
                                                        >
                                                            {
                                                                subCategory.categoryName
                                                            }
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
                                                        </Link>
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
                                                                                        <li>
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
                                                                                                href="/"
                                                                                                aria-label="navigation item"
                                                                                            >
                                                                                                Static
                                                                                                data
                                                                                            </Link>
                                                                                        </li>
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
            })} */}
        </ul>
    );
};

export default DesktopNav;
