import React from "react";

import Link from "next/link";

import Team from "@/shared/assets/images/team.jpg";
import JobCategory from "@/shared/assets/images/job-category.jpg";
import Location from "@/shared/assets/images/location_copy.jpg";
import "./Career.scss";

const Career = () => {
    return (
        <div className="career-wrapper">
            <section className="form-wrapper">
                <div className="container">
                    <h3>Find jobs</h3>
                    <form>
                        <div className="form-block-wrap">
                            <div className="form-group search-block">
                                <input
                                    placeholder="Search for jobs by title or keyword"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group location-wrap">
                                <i className="icon-location"></i>
                                <input
                                    placeholder="Location"
                                    className="form-control"
                                />
                            </div>
                            <button className="search-btn">
                                <i className="icon-job-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <section className="explore-opportunities">
                <div className="container">
                    <div className="card-wrapper">
                        <Link href="/" className="card-block">
                            <div className="img-wrap">
                                <img src={Team.src} alt="team" />
                            </div>
                            <div className="card-content">
                                <h2>Teams</h2>
                                <p>
                                    Get to know about our teams. Get to know
                                    about our teams. Get to know about our
                                    teams.
                                </p>
                                <span className="card-link">See all teams</span>
                            </div>
                        </Link>
                        <Link href="/" className="card-block">
                            <div className="img-wrap">
                                <img src={JobCategory.src} alt="team" />
                            </div>
                            <div className="card-content">
                                <h2>Job Categories</h2>
                                <p>
                                    Want to be a developer?Find the right job
                                    for you. Want to be a developer?Find the
                                    right job for you
                                </p>
                                <span className="card-link">
                                    See all job categories
                                </span>
                            </div>
                        </Link>
                        <Link href="/" className="card-block">
                            <div className="img-wrap">
                                <img src={Location.src} alt="team" />
                            </div>
                            <div className="card-content">
                                <h2>Locations</h2>
                                <p>
                                    View Our office locations across the
                                    globe.View Our office locations across the
                                    globe.
                                </p>
                                <span className="card-link">
                                    See all locations
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="build-future">
                <div className="container">
                    <h2>Come build the future with us</h2>
                    <p>
                        Become a part of a technology revolution working with
                        us.We are a customer-oriented digital solutions
                        provider.Ever since our inception, we have grown by
                        leaps and bounds with the notable efforts of our
                        workforce.We are an organization working with a purpose
                        to make a change by providing equal growth opportunities
                        to everyone.
                    </p>
                    <div className="learn-btn-wrapper">
                        <Link href="/" className="learn">
                            Learn more
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Career;
