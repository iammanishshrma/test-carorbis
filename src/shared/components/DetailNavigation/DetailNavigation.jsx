import React from "react";
import "./DetailNavigation.scss";

const DetailNavigation = (props) => {
    const {
        activeTab,
        detailRef,
        warrantyRef,
        featureRef,
        faqRef,
        reviewsRef,
        isSticky,
        scrollToPosition,
    } = props;

    console.log(
        "scrollToPosition",
        detailRef.current.offsetTop + scrollToPosition
    );

    return (
        <ul
            style={props.style}
            className={`navigation-block tabbing-hide ${
                !isSticky ? "not-sticky" : ""
            }`}
        >
            <div className="product-detail-tabbing">
                <ul>
                    <li
                        className={`tabbing-link ${
                            activeTab === "DETAILTAB" ? "active-tab" : ""
                        }`}
                    >
                        <span
                            onClick={() =>
                                window.scrollTo({
                                    top:
                                        detailRef.current.offsetTop -
                                        scrollToPosition,
                                    left: 0,
                                })
                            }
                        >
                            PRODUCT DETAILS
                        </span>
                    </li>
                    <li
                        className={`tabbing-link ${
                            activeTab === "FEATURETAB" ? "active-tab" : ""
                        }`}
                    >
                        <span
                            onClick={() =>
                                window.scrollTo({
                                    top:
                                        featureRef.current.offsetTop -
                                        scrollToPosition,
                                    left: 0,
                                })
                            }
                        >
                            FEATURES
                        </span>
                    </li>
                    <li
                        className={`tabbing-link ${
                            activeTab === "WARRANTYTAB" ? "active-tab" : ""
                        }`}
                    >
                        <span
                            onClick={() =>
                                window.scrollTo({
                                    top:
                                        warrantyRef.current.offsetTop -
                                        scrollToPosition,
                                    left: 0,
                                })
                            }
                        >
                            WARRANTY
                        </span>
                    </li>
                    <li
                        className={`tabbing-link ${
                            activeTab === "REVIEWTAB" ? "active-tab" : ""
                        }`}
                    >
                        <span
                            onClick={() =>
                                window.scrollTo({
                                    top:
                                        reviewsRef.current.offsetTop -
                                        scrollToPosition,
                                    left: 0,
                                })
                            }
                        >
                            REVIEWS
                        </span>
                    </li>
                    <li
                        className={`tabbing-link ${
                            activeTab === "FAQTAB" ? "active-tab" : ""
                        }`}
                    >
                        <span
                            onClick={() =>
                                window.scrollTo({
                                    top:
                                        faqRef.current.offsetTop -
                                        scrollToPosition,
                                    left: 0,
                                })
                            }
                        >
                            FAQs
                        </span>
                    </li>
                </ul>

                {/* <Tab disabled className="tabbing-link"><span onClick={() => reviewsRef.current.scrollIntoView()}>review</span></Tab>
            <Tab disabled className="tabbing-link"><span onClick={() => faqRef.current.scrollIntoView()}>FAQ</span></Tab> */}
            </div>
            {/* {navList.map((item, index) => {
        return (
          <li key={index} onClick={() => setactiveTab(`#${item.id}`)}>
            <a
              href={`#${item.id}`}
              className={
                activeTab === `#${item.id}` ? "active" : "tabbing-link"
              }
            >
              {item.name}
            </a>
          </li>
        );
      })} */}
        </ul>
    );
};

export default DetailNavigation;
