import React, { forwardRef } from "react";

import "./Warranty.scss";

const Warranty = forwardRef(function Warranty(props, ref) {
    return (
        <div id="warranty" className="detail-wrp-block warrenty-details-block">
            <div ref={ref} className="details-block">
                <h3>Warranty</h3>
                {props?.warrantyDetails?.length > 0 ? (
                    <div
                        className="warrenty-content"
                        dangerouslySetInnerHTML={{
                            __html: props.warrantyDetails,
                        }}
                    />
                ) : (
                    <span>This product is covered under general warranty.</span>
                )}
            </div>
        </div>
    );
});

export default Warranty;
