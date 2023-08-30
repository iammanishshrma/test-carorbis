import React from "react";

import Accordion from "@/shared/components/CustomAccordion/Accordion";
import "./FaqPage.scss";
import "@/shared/components/Accordion/AccordionData/AccordionData.scss";

const Faq = ({ faqList }) => {
    const updatedList = faqList.map((faqItem) => {
        return {
            id: faqItem._id,
            title: `Q. ${faqItem.question}`,
            content: faqItem.answer,
        };
    });

    return (
        <div className="accordion-content faq-wrapper">
            <div className="container">
                <h2>Frequently Asked Questions</h2>
                {/* <Accordion activeIndex={0}>
                    {faqList?.map((faq, index) => (
                        <AccordionTab key={index} header={`Q. ${faq.question}`}>
                            <p>{faq.answer}</p>
                        </AccordionTab>
                    ))}
                </Accordion> */}
                {updatedList?.length ? (
                    <Accordion accordionData={updatedList} />
                ) : (
                    <div>No faq found!!!</div>
                )}
            </div>
        </div>
    );
};

export default React.memo(Faq);
