import React, { forwardRef } from "react";

import "./Features.scss";

const Features = forwardRef(function Features(props, ref) {
    const { features } = props;
    return (
        <div id="features" className="detail-wrp-block feature-details-block">
            <div ref={ref} className="details-block">
                <h3>Features</h3>
                <div className="features-detail">
                    {features?.length > 0 ? (
                        <div className="technical-detail">
                            <table>
                                <tbody>
                                    {features.map((feature) => {
                                        return (
                                            <tr key={feature.id}>
                                                <th>{feature.attributeName}</th>
                                                <td>
                                                    {feature.value.map(
                                                        (item, index) => {
                                                            return `${item}${
                                                                feature.value
                                                                    .length -
                                                                    1 !==
                                                                index
                                                                    ? ", "
                                                                    : ""
                                                            }`;
                                                        }
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <span>No features are listed for this product.</span>
                    )}
                </div>
            </div>
        </div>
    );
});

export default Features;
