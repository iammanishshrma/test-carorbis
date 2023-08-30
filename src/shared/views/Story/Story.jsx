import React from "react";

import Link from "next/link";

import Team from "@/shared/assets/images/team.jpg";
import JobCategory from "@/shared/assets/images/job-category.jpg";
import Location from "@/shared/assets/images/location_copy.jpg";
import "./Story.scss";
const OurStory = () => {
    return (
        <>
            <section className="text-wrap">
                <div className="container">
                    <h2>Who are we?</h2>
                    <p>
                        We are a recognized,digital solutions provider serving
                        for more than 1 years. The company has been accredited
                        several prestigious recognitions for its quality
                        products. Our wide range of services includes mobile and
                        web app development using the latest technologies. We
                        are a recognized,digital solutions provider serving for
                        more than 1 years. The company has been accredited
                        several prestigious recognitions for its quality
                        products. Our wide range of services includes mobile and
                        web app development using the latest technologies We are
                        a recognized,digital solutions provider serving for more
                        than 1 years. The company has been accredited several
                        prestigious recognitions for its quality products. Our
                        wide range of services includes mobile and web app
                        development using the latest technologies
                    </p>
                </div>
            </section>
            <section className="our-story-wrap">
                <div className="container">
                    <div className="card-wrapper">
                        <Link href="/" className="card-block">
                            <div className="img-wrap">
                                <img src={Team.src} alt="team" />
                            </div>
                            <div className="card-content">
                                <h2>Core Values</h2>
                                <p>
                                    Get to know about our teams. Get to know
                                    about our teams. Get to know about our
                                    teams.
                                </p>
                                <span className="card-link">know more</span>
                            </div>
                        </Link>
                        <Link href="/" className="card-block">
                            <div className="img-wrap">
                                <img src={JobCategory.src} alt="team" />
                            </div>
                            <div className="card-content">
                                <h2>Progressive Solutions</h2>
                                <p>
                                    Want to be a developer?Find the right job
                                    for you. Want to be a developer?Find the
                                    right job for you
                                </p>
                                <span className="card-link">know more</span>
                            </div>
                        </Link>
                        <Link href="/" className="card-block">
                            <div className="img-wrap">
                                <img src={Location.src} alt="team" />
                            </div>
                            <div className="card-content">
                                <h2>Who Do We Serve?</h2>
                                <p>
                                    View Our office locations across the
                                    globe.View Our office locations across the
                                    globe.
                                </p>
                                <span className="card-link">know more</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="text-wrap">
                <div className="container">
                    <h2>Our Mission</h2>
                    <p>
                        We deliver client-centric solutions that bring maximum
                        productivity with minimum resources while upholding
                        service delivery principles. As our motto says, ‘Ideate,
                        Innovate, Create’, we aspire to bring in result-oriented
                        strategies to carve product design and creation
                        procedures. Our professionals contribute the best of
                        their skills to work on the ultimate mission of
                        establishing our identity as credible technology
                        leaders. We deliver client-centric solutions that bring
                        maximum productivity with minimum resources while
                        upholding service delivery principles. As our motto
                        says, ‘Ideate, Innovate, Create’, we aspire to bring in
                        result-oriented strategies to carve product design and
                        creation procedures. Our professionals contribute the
                        best of their skills to work on the ultimate mission of
                        establishing our identity as credible technology
                        leaders.
                    </p>
                </div>
            </section>
        </>
    );
};

export default OurStory;
