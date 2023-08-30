import React from "react";

import AccordionData from "./AccordionData/AccordionData";
import "./Accordion.scss";

const Accordion = () => {
    return (
        <div className="accordion-wrapper">
            <h4>Frequently Asked Questions</h4>
            <AccordionData />
        </div>
    );
};

export default Accordion;
