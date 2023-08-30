import Head from "next/head";
import Script from "next/script";

import Cookies from "cookies";

import { notify } from "@/shared/utils/notifyToast";
import { adminAxiosInstance, axiosInstance } from "@/shared/api/axios";
import {
    adminEndPoints,
    catalogEndPoints,
    cmsEndPoints,
} from "@/shared/api/endpoints";

import MainLayout from "@/shared/Layouts/MainLayout";
import HomePage from "@/shared/views/HomePage/HomePage";
import LoaderUi from "@/shared/components/LoaderUi/LoaderUi";

const Home = (props) => {
    const {
        testimonialList,
        bannerList,
        bannerList1,
        bannerList2,
        categoryList,
        servicesList,
        bestSellerList,
        topRatedList,
        brandsList,
        errorMessage,
        seoTagList,
        bottomText,
        errors,
    } = props;
    const seoData = seoTagList?.data?.settingsData;
    const seoImgPath = seoTagList?.SHOWIMAGEPATH;
    console.log(errors);

    if (errorMessage) {
        notify.errorToast(errorMessage);
        return (
            <MainLayout>
                <LoaderUi />
            </MainLayout>
        );
    }

    return (
        <>
            {seoData && (
                <>
                    <Head>
                        <title>{seoData.metaTitle}</title>
                        <meta
                            name="description"
                            content={seoData.metaDescription}
                        />
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                        />
                        <meta property="og:title" content={seoData.fbOgTitle} />
                        <meta
                            property="og:description"
                            content={seoData.fbOgDescription}
                        />
                        <meta
                            property="og:image"
                            content={seoImgPath + seoData.fbOg}
                        />
                        <meta
                            name="twitter:title"
                            content={seoData.twitterOgTitle}
                        />
                        <meta
                            name="twitter:description"
                            content={seoData.twitterOgDescription}
                        />
                        <meta
                            name="twitter:image"
                            content={seoImgPath + seoData.twitterOg}
                        />
                    </Head>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${seoData.analyticsCode}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${`'${seoData.analyticsCode}'`});
        `}
                    </Script>
                </>
            )}
            <MainLayout>
                <HomePage
                    testimonialList={testimonialList}
                    bannerList={bannerList.data.data}
                    categoryList={categoryList.data}
                    servicesList={servicesList}
                    tripleOfferBanner={bannerList1.data.data}
                    doubleOfferBanner={bannerList2.data.data}
                    bestSellerList={bestSellerList}
                    topRatedList={topRatedList}
                    brandsList={brandsList}
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
        </>
    );
};

export const getServerSideProps = async (context) => {
    context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=100"
    );
    const { req, res } = context;
    const { langId } = req.cookies;
    let isError = false;
    const errorMsg = [];

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

    const payload = languageId
        ? { languageId }
        : { languageId: "62fb966f6b331955bdcf8268" };

    const [
        testimonialRes,
        bannerRes,
        bannerRes1,
        bannerRes2,
        servicesRes,
        categoryRes,
        bestSellerRes,
        topRatedRes,
        brandsRes,
        seoRes,
        bottomTextRes,
    ] = await Promise.all([
        axiosInstance
            .post(cmsEndPoints.testimonialList, payload)
            .catch((error) => {
                isError = true;
                errorMsg.push(
                    `Testimonial list: ${error?.response?.data?.message}`
                );
            }),
        axiosInstance
            .post(cmsEndPoints.bannerList, {
                ...payload,
                bannerSlug: "web_banner",
                pageNo: 1,
                limit: 10,
            })
            .catch((error) => {
                isError = true;

                errorMsg.push(`web banner: ${error?.response?.data?.message}`);
            }),
        axiosInstance
            .post(cmsEndPoints.bannerList, {
                ...payload,
                bannerSlug: "offer_banner_1",
                pageNo: 1,
                limit: 10,
            })
            .catch((error) => {
                isError = true;

                errorMsg.push(
                    `offer banner 1: ${error?.response?.data?.message}`
                );
            }),
        axiosInstance
            .post(cmsEndPoints.bannerList, {
                ...payload,
                bannerSlug: "offer_banner_2",
                pageNo: 1,
                limit: 10,
            })
            .catch((error) => {
                isError = true;
                errorMsg.push(
                    `offer banner 2: ${error?.response?.data?.message}`
                );
            }),
        axiosInstance
            .post(cmsEndPoints.getStaticBlocks, {
                identifier: "homeTopText",
                languageId,
            })
            .catch((error) => {
                isError = true;
                errorMsg.push(
                    `static block: ${error?.response?.data?.message}`
                );
            }),
        axiosInstance.get(catalogEndPoints.categoryList).catch((error) => {
            isError = true;
            errorMsg.push(`categoryList: ${error?.response?.data?.message}`);
        }),
        axiosInstance
            .post(cmsEndPoints.homeProductList, {
                searchName: "Best Seller",
            })
            .catch((error) => {
                isError = true;
                errorMsg.push(`best seller: ${error?.response?.data?.message}`);
            }),
        axiosInstance
            .post(cmsEndPoints.homeProductList, {
                searchName: "Top Rated Products",
            })
            .catch((error) => {
                isError = true;
                errorMsg.push(
                    `top rated products: ${error?.response?.data?.message}`
                );
            }),
        axiosInstance
            .post(catalogEndPoints.topList, {
                value: "top brand",
            })
            .catch((error) => {
                isError = true;
                errorMsg.push(`top brand: ${error?.response?.data?.message}`);
            }),
        adminAxiosInstance.get(adminEndPoints.seoTagList).catch((error) => {
            isError = true;
            errorMsg.push(`seo: ${error?.response?.data?.message}`);
        }),

        axiosInstance
            .post(cmsEndPoints.getStaticBlocks, {
                identifier: "homeBottomText",
                languageId,
            })
            .catch((error) => {
                isError = true;
                errorMsg.push(`bottom text: ${error?.response?.data?.message}`);
            }),
    ]);
    if (isError) {
        return {
            props: {
                errorMessage: "Unable to fetch data!!!",
                errors: errorMsg,
            },
        };
    }
    return {
        props: {
            testimonialList: testimonialRes.data.data,
            bannerList: bannerRes.data,
            bannerList1: bannerRes1.data,
            bannerList2: bannerRes2.data,
            servicesList: servicesRes.data,
            categoryList: categoryRes.data,
            bestSellerList: bestSellerRes.data.data
                ? bestSellerRes.data.data
                : [],
            topRatedList: topRatedRes.data.data ? topRatedRes.data.data : [],
            brandsList: brandsRes.data.data,
            seoTagList: seoRes.data.data,
            bottomText: bottomTextRes.data,
            errors: errorMsg,
        },
    };
};

export default Home;
