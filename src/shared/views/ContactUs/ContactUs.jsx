import React from "react";
import "./ContactUs.scss";

const ContactUs = () => {
    return (
        <section className="contact-ready-section">
            <div className="container">
                <div className="contact-ready-wrapper">
                    <div className="ltl-contact-wrap">
                        <h2>Ready to start growing your business online?</h2>
                        <p>
                            Carorbis gives you the keys to growth via a
                            nationwide audience, turnkey tools and built-in
                            trust.Get hyperlocal delivery across India.Bazaar
                            gives you the keys to growth via a nationwide
                            audience, turnkey tools and built-in trust.Get
                            hyperlocal delivery across India. Set up in just a
                            few minutes. Carorbis gives you the keys to growth
                            via a nationwide audience, turnkey tools and
                            built-in trust.Get hyperlocal delivery across
                            India.Bazaar gives you the keys to growth via a
                            nationwide audience, turnkey tools and built-in
                            trust.Get hyperlocal delivery across India. Set up
                            in just a few minutes.
                        </p>
                    </div>
                    <div className="rtl-contact-wrap">
                        <div className="ready-form-control">
                            <form>
                                <div className="form-block">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="form-block type-number">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Phone Number"
                                    />
                                </div>
                                <div className="form-block">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="form-block">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Company Name"
                                    />
                                </div>
                                <div className="form-block">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="What do you sell"
                                    />
                                </div>
                                <div className="btn-wrap">
                                    <button
                                        type="submit"
                                        className="btn btn-orange"
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
