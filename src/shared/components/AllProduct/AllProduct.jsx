import React, { useState, useEffect } from "react";

import { pageLimit } from "@/shared/utils/constants";

import Product from "../Product/Product";
import Pagination from "../Pagination/Pagination";
import "../BestSellers/BestSellers.scss";
import "./AllProduct.scss";

const AllProduct = ({
    productsList,
    imgPath,
    totalRecords,
    setCurrentPage,
}) => {
    const [firstPage, GetfirstPage] = useState(0);
    const [EndPage, GetEndPage] = useState(pageLimit);

    const OnPageChange = (data) => {
        useEffect(() => {
            GetfirstPage(data.customFirst3);
            GetEndPage(data.GetLastItems);
            setCurrentPage(data.page);
        }, [data]);
    };

    return (
        <>
            {productsList?.length > 0 ? (
                <>
                    <div className="bestseller-product all-product">
                        {productsList?.map((product) => {
                            return (
                                <Product
                                    product={product}
                                    imagePath={imgPath}
                                    key={product._id}
                                />
                            );
                        })}
                    </div>
                    {totalRecords > pageLimit && (
                        <div className="pagination-wrap">
                            <Pagination
                                totalRecords={totalRecords}
                                OnPageChange={OnPageChange}
                                limit={pageLimit}
                            />
                        </div>
                    )}
                </>
            ) : (
                <p>No products found!!!</p>
            )}
        </>
    );
};

export default AllProduct;
