import React from "react";

import { adminAxiosInstance, axiosInstance } from "@/shared/api/axios";
import {
    adminEndPoints,
    catalogEndPoints,
    cmsEndPoints,
} from "@/shared/api/endpoints";

import MainLayout from "@/shared/Layouts/MainLayout";
import Category from "@/shared/views/SuperCategory/Category";

const CategoryPage = ({
    categories,
    topSeller,
    trendingProducts,
    topBrands,
    bottomText,
    errorMessage,
}) => {
    console.log("errorMessage", errorMessage);

    return (
        <MainLayout>
            <Category
                categoryData={categories?.data?.categoryData?.[0]}
                topSeller={topSeller.data}
                trendingProducts={trendingProducts.data}
                topBrands={topBrands.data}
            />

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
    );
};

export const getServerSideProps = async (context) => {
    context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=100"
    );
    const { req, res, params } = context;
    const { langId } = req.cookies;
    const errorMessage = [];
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

    const [category, topSellerRes, trendingRes, topBrandRes, bottomTextRes] =
        await Promise.all([
            axiosInstance
                .post(catalogEndPoints.getSubcategories, {
                    slug: params.categorySlug,
                })
                .catch((error) => {
                    errorMessage.push(error.response.data);
                }),
            axiosInstance
                .post(catalogEndPoints.topList, {
                    slug: params.categorySlug,
                    value: "top seller",
                })
                .catch((error) => {
                    errorMessage.push(error.response.data);
                }),
            axiosInstance
                .post(catalogEndPoints.topList, {
                    slug: params.categorySlug,
                    value: "trending products",
                })
                .catch((error) => {
                    errorMessage.push(error.response.data);
                }),
            axiosInstance
                .post(catalogEndPoints.topList, {
                    slug: params.categorySlug,
                    value: "top brand",
                })
                .catch((error) => {
                    errorMessage.push(error.response.data);
                }),
            axiosInstance
                .post(cmsEndPoints.getStaticBlocks, {
                    identifier: "categoryBottomText",
                    languageId,
                })
                .catch((error) => {
                    errorMessage.push(
                        `bottom text: ${error?.response?.data?.message}`
                    );
                }),
        ]);
    return {
        props: {
            categories: category.data,
            topSeller: topSellerRes.data,
            trendingProducts: trendingRes.data,
            topBrands: topBrandRes.data,
            bottomText: bottomTextRes?.data ? bottomTextRes.data : {},
            errorMessage,
        },
    };
};

export default CategoryPage;
