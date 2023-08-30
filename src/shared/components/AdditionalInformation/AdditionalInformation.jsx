import React from "react";

import Link from "next/link";

import "./AdditionalInformation.scss";

const AdditionalInformation = ({ detail }) => {
    return (
        <div className="info-wrap">
            {detail && (
                <div className="primary-info">
                    <h3>
                        Most Reliable online portal for Car Accessories In India
                    </h3>
                    {detail ? (
                        <div dangerouslySetInnerHTML={{ __html: detail }} />
                    ) : (
                        ""
                    )}
                </div>
            )}
            <div className="search-info">
                <h3>Most Searched on Carorbis</h3>
                <ul className="search-menu">
                    <li>
                        <Link href="/" aria-label="most search">
                            Lorem ipsum dolor
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            sit amet
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            consectetur adipiscing elit
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            Sagittis urna
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            scelerisque fusce vel
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            sagittis urna eget nunc
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            Eget penatibus metus
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            volutpat fusce donec vel tortor{" "}
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            {" "}
                            volutpat fusce donec vel tortor
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            Mi volutpat dui sed in
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            Pulvinar tempus dignissim{" "}
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            lobortis imperdiet
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            tortor suspendisse lectus nulla nunc
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            Tempus nascetur venenatis
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            nulla nulla suspendisse
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            Faucibus faucibus
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            sodales lectus pellentesque
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            enim lobortis facilisis
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            fermentum
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            Nulla adipiscing senectus
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            venenatis eu amet dis dignissim lectus neque
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            Condimentum sapien
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            tempus iaculis orci imperdiet est
                        </Link>
                    </li>
                    <li>
                        <Link href="/" aria-label="most search">
                            quam amet
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdditionalInformation;
