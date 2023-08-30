import React from "react";

import Link from "next/link";

import "./BreadCrumb.scss";

const BreadCrumbSection = (props) => {
    const breadcrumbData = props.breadcrumbData;
    return (
        <>
            <div className="breadcrumb-wrap">
                <div className="container">
                    <ul className="breadcrumb-list">
                        {breadcrumbData?.map((item, index) => {
                            return (
                                <li key={index}>
                                    {item.link ? (
                                        <Link
                                            style={{
                                                textTransform: "capitalize",
                                            }}
                                            href={item.link}
                                            aria-label="breadcum list"
                                        >
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <span
                                            style={{
                                                textTransform: "capitalize",
                                            }}
                                            className="breadcum-text"
                                        >
                                            {item.name}
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default BreadCrumbSection;
