import React from "react";

import "./CustomRadio.scss";

const CustomRadio = (props) => {
    return (
        <div className="radiobtn-wrap" style={props.style}>
            <label className="custom-label">
                <span className="label-name">{props.items.name}</span>
                <input
                    type="radio"
                    name={props.name}
                    value={props.value}
                    onChange={(event) => props.onChange(event)}
                    checked={props.checked}
                />
                <span className="checkmark"></span>
            </label>
        </div>
    );
};

export default CustomRadio;
