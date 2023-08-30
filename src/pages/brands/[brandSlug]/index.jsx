import React, { useEffect } from "react";

import Cookies from "cookies";

import { axiosInstance } from "@/shared/api/axios";
import { catalogEndPoints } from "@/shared/api/endpoints";
import { useWindowSize } from "@/shared/hooks/windowSize";
import { pageLimit } from "@/shared/utils/constants";

import MainLayout from "@/shared/Layouts/MainLayout";
import Listing from "@/shared/views/Listing/Listing";

const ProductListing = ({
    totalCount,
    categoryDetails,
    filterList,
    imagesPath,
}) => {
    const [windowWidth] = useWindowSize();

    const categoryId = categoryDetails[0]._id;
    const categoryInfo = categoryDetails[0].translationData?.[0];
    const categoryData = {
        _id: categoryDetails[0]?._id,
        slug: categoryDetails[0]?.slug,
    };

    const productsList = categoryDetails[0]?.productData?.map((product) => {
        return {
            ...product,
            categoryData: [
                {
                    _id: categoryDetails[0]?._id,
                    slug: categoryDetails[0]?.slug,
                },
            ],
        };
    });
    const faqData = categoryDetails[0].faqData;
    const mobBanners = categoryDetails[0]?.translationData?.[0]?.mobileBanner;
    const webBanners = categoryDetails[0]?.translationData?.[0]?.webBanner;

    useEffect(() => {
        const footer = document.getElementById("footer");
        if (windowWidth < 768) {
            footer.style.paddingBottom = "40px";
        } else {
            footer.style.paddingBottom = "10px";
        }
    }, [windowWidth]);
    return (
        <MainLayout>
            <Listing
                productsList={productsList}
                imgPath={imagesPath}
                categoryDetails={categoryInfo}
                faqsList={faqData}
                filterList={filterList}
                categoryId={categoryId}
                discountBanners={{
                    mobBanners,
                    webBanners,
                }}
                categoryData={categoryData}
                totalProducts={totalCount}
            />
        </MainLayout>
    );
};

export const getServerSideProps = async (context) => {
    context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=1"
    );
    const { req, res, params } = context;
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

    try {
        const categoryRes = await axiosInstance.post(
            catalogEndPoints.getFiltersAndProducts,
            {
                slug: params.brandSlug,
                slugType: "brand",
                page: 1,
                limit: pageLimit,
                filter: false,
            }
        );
        const totalCount = categoryRes.data.data.totalCount;
        const categoryDetails = categoryRes.data.data.top_brand_list;
        const filterList = categoryRes.data.data.brand_product_filter_list;
        const imagesPath = categoryRes.data.data.PRODUCTSHOWIMAGEPATH;
        return {
            props: {
                totalCount,
                categoryDetails,
                filterList,
                imagesPath,
            },
        };
    } catch (error) {
        return {
            props: {
                errorMessage: "Unable to fetch data!!!",
            },
            notFound: true,
        };
    }
};

export default ProductListing;
