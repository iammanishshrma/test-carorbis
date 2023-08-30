import React from "react";

import CategoryItem from "./CategoryItem";
import "./SubCategories.scss";

const SubCategories = ({ categoryData }) => {
    return (
        <>
            {categoryData?.subCategoryList?.map((subCategory) => {
                // if (
                //     subCategory?.subCategoryList?.length === 0 ||
                //     !subCategory.subCategoryList
                // ) {
                //     return <></>;
                // }
                return (
                    <React.Fragment key={subCategory._id}>
                        <h3>{subCategory?.categoryName}</h3>
                        <div className="categories-wrap">
                            <div className="categories-lists">
                                {subCategory?.subCategoryList?.map(
                                    (categoryItem) => {
                                        return (
                                            <CategoryItem
                                                categoryItem={categoryItem}
                                                key={categoryItem._id}
                                            />
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </React.Fragment>
                );
            })}
        </>
    );
};
export default SubCategories;
