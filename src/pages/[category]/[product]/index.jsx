import React from "react";
import Head from "next/head";

import { axiosInstance } from "@/shared/api/axios";
import { catalogEndPoints, cmsEndPoints } from "@/shared/api/endpoints";

import MainLayout from "@/shared/Layouts/MainLayout";
import ProductDetails from "@/shared/views/ProductDetails/ProductDetails";

const ProductDetailsPage = (props) => {
    const {
        productDetails,
        imgPaths,
        recommendedProducts,
        relatedProducts,
        recentProducts,
        productSeo,
        bottomText,
        error,
        breadcrumbList,
    } = props;
    console.log("error", error);
    console.log("bottomText", bottomText);
    return (
        <>
            {productSeo && (
                <Head>
                    <title>{productSeo?.metaTitle}</title>
                    <meta
                        name="description"
                        content={productSeo?.metaDescription}
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                    />
                    {/* <script>{productSeo?.product_schema}</script>
                    <meta>product?.metaKeyword</meta>
                    <script>{productSeo?.faq_schema}</script> */}
                    <link rel="canonical" href={productSeo?.canonical}></link>
                </Head>
            )}
            <MainLayout>
                {productDetails && (
                    <ProductDetails
                        productDetails={productDetails}
                        imgPaths={imgPaths}
                        recommendedProducts={recommendedProducts}
                        relatedProducts={relatedProducts}
                        recentProducts={recentProducts}
                        breadcrumbList={breadcrumbList}
                    />
                )}
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
    const { params, req, res } = context;

    const { authToken, langId } = req.cookies;
    const config = {
        headers: {
            Authorization: authToken,
        },
    };
    const payload = {
        productSlug: params.product,
    };
    const returnProps = {};
    let error = [];

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

    //Product details api
    await axiosInstance
        .post(catalogEndPoints.getProductDetails, payload, config)
        .then((res) => {
            returnProps["productDetails"] = res.data.data.productDetails;
            returnProps["breadcrumbList"] = res.data.data.breadcrumb;
            returnProps["imgPaths"] = res.data.data.PRODUCTSHOWIMAGEPATH;
        })
        .catch((err) => {
            error.push(`ProductDetails: ${err.response.data.message}`);
        });

    //Recommended products api
    await axiosInstance
        .post(catalogEndPoints.getRecommendedProducts, {
            productSlug: params.product,
            slug: params.category,
        })
        .then((res) => {
            returnProps["recommendedProducts"] = res.data.data;
        })
        .catch((err) => {
            error.push(`RecommendedProducts: ${err.response.data.message}`);
        });

    // Related products api
    await axiosInstance
        .post(catalogEndPoints.getRelatedProducts, {
            productSlug: params.product,
            slug: params.category,
        })
        .then((res) => {
            returnProps["relatedProducts"] = res.data.data;
        })
        .catch((err) => {
            error.push(`RelatedProducts: ${err.response.data.message}`);
        });

    // Recently viewed products api
    await axiosInstance
        .get(catalogEndPoints.getRecentProducts, config)
        .then((res) => {
            returnProps["recentProducts"] = res.data.data;
        })
        .catch((err) => {
            error.push(`RecentProducts: ${err.response.data.message}`);
        });

    // Seo
    await axiosInstance
        .post(catalogEndPoints.productSeo, payload)
        .then((res) => {
            returnProps["productSeo"] = res.data.data.data;
        })
        .catch((err) => {
            error.push(`ProductSeo: ${err.response.data.message}`);
        });

    // Bottom text api
    await axiosInstance
        .post(cmsEndPoints.getStaticBlocks, {
            identifier: "detailsBottomText",
            languageId,
        })
        .then((res) => {
            returnProps["bottomText"] = res.data;
        })
        .catch((error) => {
            error.push(`bottomText: ${err.response.data.message}`);
        });

    return {
        props: {
            ...returnProps,
            error: error.length ? error : null,
        },
    };
};
export default ProductDetailsPage;
