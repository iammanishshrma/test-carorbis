import React, { useEffect, useRef } from "react";

import useOutsideClick from "@/shared/hooks/outsideClickHandler";

import classes from "./ConfirmBox.module.scss";

const ConfirmBox = (props) => {
    const confirmBoxRef = useRef();

    useEffect(() => {
        document.body.classList.add("modal-open");

        return () => {
            document.body.classList.remove("modal-open");
        };
    });

    useOutsideClick(confirmBoxRef, () => {
        props.onCancel();
    });

    return (
        <div className={`${classes.popupBackdrop} confirm-box-wrap`}>
            <div ref={confirmBoxRef} className={classes.confirmBox}>
                <h3 className={classes.confirmBox__heading}>{props.heading}</h3>
                <div className={classes.confirmBox__cta}>
                    <button
                        className={`btn ${classes.confirmBox__btn}`}
                        type="button"
                        onClick={props.onConfirm}
                    >
                        Confirm
                    </button>
                    <button
                        className={`btn cancel-btn ${classes.confirmBox__btn}`}
                        type="button"
                        onClick={props.onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmBox;
