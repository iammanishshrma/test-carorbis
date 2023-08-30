import React from "react";

import CategoriesBlock from "../FeaturedCategoriesBlock/CategoriesBlock";
import "./FeaturedCategories.scss";

const FeaturedCategory = ({ featuredHead, categoryList }) => {
    return (
        <>
            <h3>{featuredHead}</h3>
            <div className="categories-wrap">
                <div className="categories-lists">
                    {categoryList.map((categoryItem) => {
                        return (
                            <CategoriesBlock
                                categoryItem={categoryItem}
                                key={categoryItem._id}
                            />
                        );
                    })}
                </div>
                <div className="categories-lists categroies-mobile">
                    {categoryList.map((categoryItem) => {
                        return (
                            <CategoriesBlock
                                categoryItem={categoryItem}
                                key={categoryItem._id}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};
export default FeaturedCategory;
