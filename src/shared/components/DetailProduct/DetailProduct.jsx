import React, { forwardRef } from "react";

import "./DetailProduct.scss";

const DetailProduct = forwardRef(function DetailProduct(props, ref) {
    return (
        <div
            className="details-block product-desc-block product-det-navigation"
            ref={ref}
            id="product-details"
        >
            <h3>Product Details</h3>
            {props.productDetail?.length > 0 ? (
                <div
                    dangerouslySetInnerHTML={{ __html: props.productDetail }}
                    className="product-desc-content"
                />
            ) : (
                <span>Product details not found for this product</span>
            )}
        </div>
    );
});

export default DetailProduct;
