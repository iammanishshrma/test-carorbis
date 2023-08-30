import React from "react";
import Head from "next/head";

import MainLayout from "@/shared/Layouts/MainLayout";

import { axiosInstance } from "@/shared/api/axios";
import { cmsEndPoints } from "@/shared/api/endpoints";

const PaymentPartners = ({ cmsData }) => {
    return (
        <>
            {cmsData && (
                <>
                    <Head>
                        <title>{cmsData?.data?.data[0]?.pageTitle}</title>
                        <meta
                            name="description"
                            content={cmsData?.data?.data[0]?.metaDescription}
                        />
                    </Head>
                </>
            )}
            <MainLayout>
                <div className="cms-pages">
                    <div className="container">
                        <h3>{cmsData?.data?.data[0]?.contentTitle}</h3>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: cmsData?.data?.data[0]
                                    ?.web_shortDescription,
                            }}
                        ></div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export const getServerSideProps = async () => {
    const errorMessage = [];

    const [cmsData] = await Promise.all([
        axiosInstance
            .post(cmsEndPoints.getCMSPage, {
                urlKey: "payment-partners",
            })
            .catch((error) => {
                errorMessage.push(error.response.data);
            }),
    ]);
    return {
        props: {
            cmsData: cmsData.data,
            errorMessage,
        },
    };
};

export default PaymentPartners;
