import React from "react";

import Link from "next/link";

import NewsTabbingOne from "@/shared/assets/images/team.jpg";
import NewsTabbingTwo from "@/shared/assets/images/job-category.jpg";
import NewsTabbingThree from "@/shared/assets/images/location_copy.jpg";
import "./Blogs.scss";

const Blogs = () => {
    const blogData = [
        {
            tabImg: NewsTabbingOne.src,
            name: "2022 Researcher Innovation",
            date: "12 May 2022",
            description:
                "2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings.2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings’...",
        },
        {
            tabImg: NewsTabbingTwo.src,
            name: "2022 Researcher Innovation",
            date: "09 May 2022",
            description:
                "2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings.2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings’...",
        },
        {
            tabImg: NewsTabbingThree.src,
            name: "2022 Researcher Innovation",
            date: "07 May 2022",
            description:
                "2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings.2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings’...",
        },
        {
            tabImg: NewsTabbingOne.src,
            name: "2022 Researcher Innovation",
            date: "12 May 2022",
            description:
                "2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings.2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings’...",
        },
        {
            tabImg: NewsTabbingTwo.src,
            name: "2022 Researcher Innovation",
            date: "09 May 2022",
            description:
                "2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings.2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings’...",
        },
        {
            tabImg: NewsTabbingThree.src,
            name: "2022 Researcher Innovation",
            date: "07 May 2022",
            description:
                "2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings.2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings’...",
        },
        {
            tabImg: NewsTabbingOne.src,
            name: "2022 Researcher Innovation",
            date: "12 May 2022",
            description:
                "2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings.2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings’...",
        },
        {
            tabImg: NewsTabbingTwo.src,
            name: "2022 Researcher Innovation",
            date: "09 May 2022",
            description:
                "2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings.2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings’...",
        },
        {
            tabImg: NewsTabbingThree.src,
            name: "2022 Researcher Innovation",
            date: "07 May 2022",
            description:
                "2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings.2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings’...",
        },
        {
            tabImg: NewsTabbingOne.src,
            name: "2022 Researcher Innovation",
            date: "12 May 2022",
            description:
                "2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings.2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings’...",
        },
        {
            tabImg: NewsTabbingTwo.src,
            name: "2022 Researcher Innovation",
            date: "09 May 2022",
            description:
                "2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings.2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings’...",
        },
        {
            tabImg: NewsTabbingThree.src,
            name: "2022 Researcher Innovation",
            date: "07 May 2022",
            description:
                "2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings.2022 Researcher Innovation   videos help support lab training and real-life application of research findings.’... 2022 Researcher Innovation   videos help support lab training and real-life application of research findings’...",
        },
    ];
    return (
        <div className="blog-box">
            <div className="container">
                <h2>All Blog</h2>
                <div className="blog-wrapper">
                    {blogData.map((item, index) => {
                        return (
                            <div key={index} className="blog-data">
                                <div className="blog-img">
                                    <img src={item.tabImg} alt="video=img" />
                                </div>
                                <div className="box-content">
                                    <h3>
                                        <Link href="/" className="news-heading">
                                            {item.name}
                                        </Link>
                                    </h3>
                                    <span className="date-article">
                                        {item.date}
                                    </span>
                                    <p>{item.description}</p>
                                    <Link href="/" className="read-article">
                                        Read Article
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
