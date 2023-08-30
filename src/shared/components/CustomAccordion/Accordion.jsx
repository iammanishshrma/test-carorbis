import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = ({ accordionData }) => {
    const [activeId, setIsActiveId] = useState(null);

    const activeChangeHandler = (id) => {
        setIsActiveId(id);
    };
    return (
        <div className="accordion">
            {accordionData.map(({ id, title, content }) => (
                <AccordionItem
                    id={id}
                    key={id}
                    title={title}
                    content={content}
                />
            ))}
        </div>
    );
};

export default Accordion;
