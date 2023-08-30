import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import "./ReturnPopUp.scss";
import "../CancelPopup/CancelPopup.scss";
const ReturnPopUp = ({ close }) => {
    const closePopUp = () => {
        close(false);
        document.body.classList.toggle("modal-open");
    };
    const [city, setCity] = useState();
    const citySelectItems = [
        { label: "Product damage", value: "NY" },
        { label: "shipping box damage", value: "RM" },
        { label: "wrong item was sent", value: "LDN" },
        { label: "item or parts missing", value: "IST" },
        { label: "item defective", value: "PRS" },
    ];
    return (
        <div className="popup-wrapper">
            <div className="popup-content">
                <div className="cancel-head">
                    <h3>Return Item</h3>
                    <button onClick={closePopUp} className="close-btn" aria-label="Close" role="button">
                        <i className="cancel-icon"></i>
                    </button>
                </div>
                <div className="cancel-body">
                    <div className="select-wrapper">
                        <label className="label">
                            Select Reason for Return
                            <span className="imp-field">*</span>
                        </label>
                        <Dropdown
                            value={city}
                            options={citySelectItems}
                            onChange={(e) => setCity(e.value)}
                            placeholder="Select"
                        />
                    </div>
                    <div className="add-img">
                        <div className="label-wrap">
                            <label className="label">Add Images</label>
                            <span className="optional-field">Optional</span>
                        </div>
                        <div className="file-upload">
                            <button className="file-wrap" aria-label="file upload" role="button">
                                <label htmlFor="1"></label>
                                <input
                                    type="file"
                                    id="1"
                                    className="file-input"
                                />
                            </button>
                            <button className="file-wrap" aria-label="file upload" role="button">
                                <label htmlFor="2"></label>
                                <input
                                    type="file"
                                    id="2"
                                    className="file-input"
                                />
                            </button>
                            <button className="file-wrap" aria-label="file upload" role="button">
                                <label htmlFor="3"></label>
                                <input
                                    type="file"
                                    id="3"
                                    className="file-input"
                                />
                            </button>
                            <button className="file-wrap" aria-label="file upload" role="button">
                                <label htmlFor="4"></label>
                                <input
                                    type="file"
                                    id="4"
                                    className="file-input"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="textarea-wrapper">
                        <div className="label-wrap">
                            <label className="label">Add Comment</label>
                            <span className="optional-field">Optional</span>
                        </div>
                        <textarea
                            rows="5"
                            cols="0"
                            placeholder="Type here"
                            className="text-area"
                        ></textarea>
                        <span className="min-word">800 words maximum</span>
                    </div>
                    <div className="btn-wrapper">
                        <button className="save" aria-label="Save" role="button">Save</button>
                        <button className="cancel" onClick={closePopUp} aria-label="Close" role="button">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnPopUp;
