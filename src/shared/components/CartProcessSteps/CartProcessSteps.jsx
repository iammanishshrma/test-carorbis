import React from "react";
import "../OrderProcess/OrderProcess.scss";
import "./CartProcessSteps.scss";

const CartProcessSteps = (props) => {
    return (
        <div className="cart-process">
            <div className="process-bar">
                {Object.keys(props.cartProcess).map((item, index) => {
                    return (
                        <div className="process-box" key={index}>
                            <div
                                className={`process-listing ${(props.cartProcess?.[item]?.status ===
                                    "cancel"
                                    ? "process-cancel"
                                    : "") ||
                                    (props.cartProcess?.[item]?.status === true
                                        ? "process-completed"
                                        : "") ||
                                    (props.cartProcess?.[item]?.status ===
                                        "inProcess"
                                        ? "process-upcoming"
                                        : "")
                                    }`}
                            >
                                <div className="status">
                                    <span className="status-marked"></span>
                                </div>
                                <h4>{item}</h4>
                            </div>
                            <div className="process-separator"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CartProcessSteps;
