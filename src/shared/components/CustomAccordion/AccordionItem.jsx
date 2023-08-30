import React, { useState } from "react";

import { CSSTransition } from "react-transition-group";

import "./Accordion.scss";

const AccordionItem = ({ id, title, content }) => {
    const [isActive, setIsActive] = useState(false);

    const activeChangeHandler = () => {
        // if (activeId === id) {
        //     onActiveChange(null);
        // } else {
        //     onActiveChange(id);
        // }
        setIsActive((prev) => !prev);
    };
    return (
        <div className="accordion-item">
            <div
                className="accordion-title"
                onClick={() => activeChangeHandler(id)}
            >
                <div>{title}</div>
                <span className={`caret ${isActive ? "up" : "down"}`}></span>
            </div>
            {/* {activeId === id && ( */}
            <CSSTransition
                in={isActive}
                timeout={200}
                classNames="slide-up-bottom"
                mountOnEnter
                unmountOnExit
            >
                <div>
                    <p className="accordion-content">{content}</p>
                </div>
            </CSSTransition>
            {/* )} */}
        </div>
    );
};

export default AccordionItem;
