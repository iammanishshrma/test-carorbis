import React from "react";

import { axiosInstance } from "@/shared/api/axios";
import { catalogEndPoints, cmsEndPoints } from "@/shared/api/endpoints";

import MainLayout from "@/shared/Layouts/MainLayout";
import AllBrands from "@/shared/views/AllBrands/AllBrands";

const Brands = ({ brandsList, bottomText }) => {
    return (
        <>
            <MainLayout>
                <AllBrands brandsList={brandsList} />

                {bottomText?.data?.[0] && (
                    <section className="most-reliable">
                        <div className="container">
                            <div className="most-search-content">
                                <h3>{bottomText?.data?.[0]?.title}</h3>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: bottomText?.data[0]?.content,
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                )}
            </MainLayout>
        </>
    );
};

export const getServerSideProps = async (context) => {
    context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=100"
    );
    const errorMsg = [];

    const { req, res } = context;
    const { langId } = req.cookies;

    let languageId = langId;
    if (!langId) {
        const cookies = new Cookies(req, res);
        try {
            const langRes = await adminAxiosInstance.get(
                adminEndPoints.languageList
            );
            languageId = langRes.data.data[0]._id;
            cookies.set("langId", languageId, {
                httpOnly: false,
            });
        } catch (error) {
            cookies.set("langId", "62fb966f6b331955bdcf8268", {
                httpOnly: false,
            });
        }
    }

    const [brandsRes, bottomTextRes] = await Promise.all([
        axiosInstance
            .post(catalogEndPoints.brandList, {
                pageNo: 1,
                limit: 100,
            })
            .catch((error) => {
                errorMsg.push(`all brands: ${error?.response?.data?.message}`);
            }),
        axiosInstance
            .post(cmsEndPoints.getStaticBlocks, {
                identifier: "allBrandsBottomText",
                languageId,
            })
            .catch((error) => {
                errorMsg.push(`bottom text: ${error?.response?.data?.message}`);
            }),
    ]);

    return {
        props: {
            brandsList: brandsRes.data.data,
            bottomText: bottomTextRes.data,
            errors: errorMsg,
        },
    };
};

export default Brands;
