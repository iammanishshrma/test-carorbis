import React from "react";

import "./CustomCheckbox.scss";

const CustomCheckbox = (props) => {
    return (
        <div className="checkbox-wrapper">
            <label className="custom-label">
                <span className="label-name">{props.items.name}</span>
                <input
                    type="checkbox"
                    value={props.items._id}
                    onChange={(event) => props.handleChange(event)}
                    checked={props.checked}
                />
                <span className="checkmark"></span>
            </label>
        </div>
    );
};

export default CustomCheckbox;
