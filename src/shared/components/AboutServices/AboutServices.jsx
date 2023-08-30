import Image from "next/image";
import React from "react";

import "./AboutServices.scss";

const Services = ({ serviceList }) => {
    return (
        <>
            {/* {serviceList?.map(({ _id: id, translationData }) => {
                const serviceItem = translationData.bannerWebData[0];
                return (
                    <div className="service-wrap" key={id}>
                        <div style={{ position: "relative" }}>
                            <Image
                                src={`${serviceItem?.image}`}
                                width={48}
                                height={36}
                                priority
                                alt={serviceItem.title}
                            />
                        </div>
                        <div className="content-wrap">
                            <h3>{serviceItem.title}</h3>
                            <span className="service-title">
                                {serviceItem.desc}
                            </span>
                        </div>
                    </div>
                );
            })} */}
        </>
    );
};
export default Services;
