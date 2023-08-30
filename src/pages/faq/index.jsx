import React from "react";

import Cookies from "cookies";

import { axiosInstance } from "@/shared/api/axios";
import { cmsEndPoints } from "@/shared/api/endpoints";

import MainLayout from "@/shared/Layouts/MainLayout";
import FaqPage from "@/shared/views/FaqPage/FaqPage";

import "@/shared/views/FaqPage/FaqPage.scss";
import "@/shared/components/Accordion/AccordionData/AccordionData.scss";

const Faq = ({ faqList }) => {
    return (
        <MainLayout>
            <FaqPage faqList={faqList} />
        </MainLayout>
    );
};

export const getServerSideProps = async (context) => {
    context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=100"
    );

    const { req, res } = context;
    const { langId } = req.cookies;
    const returnObject = { props: {} };

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

    if (langId?.length) {
        const payload = {
            languageId: languageId ? languageId : "62fb966f6b331955bdcf8268",
            skip: 2,
        };

        try {
            const response = await axiosInstance.post(
                cmsEndPoints.faqList,
                payload
            );
            return {
                props: {
                    faqList: response.data.data.data,
                },
            };
        } catch {
            res.statusCode = 404;
            return {
                props: {},
            };
        }
    }
    return returnObject;
};

export default Faq;
