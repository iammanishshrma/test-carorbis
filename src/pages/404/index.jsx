import Link from "next/link";
import Image from "next/image";

import errorImg from "@/shared/assets/images/error-page-img.png";

import "./404.scss";

const pageStyles = {
    color: "#232129",
    padding: "96px",
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
    marginTop: 0,
    marginBottom: 64,
    maxWidth: 320,
};

const paragraphStyles = {
    marginBottom: 48,
};
const codeStyles = {
    color: "#8A6534",
    padding: 4,
    backgroundColor: "#FFF4DB",
    fontSize: "1.25rem",
    borderRadius: 4,
};

const PageNotFound = () => {
    return (
        <main style={pageStyles} className="not-found-wrapper">
            <div className="page-content">
                <section className="error-section">
                    <h1>Error 404</h1>
                    <div
                        style={{ position: "relative" }}
                        className="not-found-img"
                    >
                        <Image
                            sizes="100%"
                            fill
                            priority
                            src={errorImg.src}
                            alt="error 404"
                        />
                    </div>
                    {/* <img src={errorImg.src} alt="error 404" /> */}
                    <h4>Looking for something?</h4>
                    <p>Ooopps! That page can’t be found.</p>
                    <p>
                        Go to &nbsp;
                        <Link
                            href="/"
                            className="go-home-btn"
                            aria-label="home page link"
                        >
                            Home
                        </Link>
                        &nbsp; page
                    </p>
                </section>
            </div>
        </main>
    );
};

export default PageNotFound;
