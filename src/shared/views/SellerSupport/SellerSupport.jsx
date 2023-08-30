import React, { useState } from "react";
import "./SellerSupport.scss";
import { Dropdown } from "primereact/dropdown";
import "./SellerSupport.scss";
import "../../components/AccountForm/AccountForm.scss";

const SellerSupport = () => {
    const [city, setCity] = useState();
    const citySelectItems = [
        { label: "Product damage", value: "NY" },
        { label: "shipping box damage", value: "RM" },
        { label: "wrong item was sent", value: "LDN" },
        { label: "item or parts missing", value: "IST" },
        { label: "item defective", value: "PRS" },
    ];
    return (
        <div className="seller-support-wrapper">
            <div className="container">
                <div className="get-support-wrapper">
                    <h2>Get support</h2>
                    <h4>
                        Welcome to the seller central technical support page
                    </h4>
                    <p>
                        Please contact us using the form below. We apologize for
                        any inconvenience
                    </p>
                    <div className="form-wrapper">
                        <form>
                            <div className="form-block select-wrap valid-wrap valid-select-wrap">
                                <div className="select-wrapper">
                                    <label className="form-label">Topic:</label>
                                    <Dropdown
                                        value={city}
                                        options={citySelectItems}
                                        onChange={(e) => setCity(e.value)}
                                        placeholder="Select a topic"
                                    />
                                </div>
                            </div>
                            <div className="form-block textarea-wrapper">
                                <label className="form-label">
                                    Contact the seller and allow the seller two
                                    days to get back to you:
                                </label>
                                <div className="text-area-element form-control">
                                    <textarea
                                        rows="5"
                                        cols="0"
                                        placeholder="Describe your issue"
                                        className="text-area"
                                    ></textarea>
                                </div>
                                <span className="min-word">
                                    400 words maximum
                                </span>
                            </div>
                            <div className="btn-wrap">
                                <button type="submit" className="form-btn">
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerSupport;
