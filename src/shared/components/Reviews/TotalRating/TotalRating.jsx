import React from "react";

import Rating from "react-rating";

import "./TotalRating.scss";

const TotalRating = (props) => {
    const { ratings, totalReviews, avgRating } = props;

    return (
        <div className="total-rating">
            <div className="right-main">
                <div className="lft-rating">
                    <div className="rating-new-head">
                        <div className="global-rating-left">
                            <div className="star-wrap">
                                <h2>
                                    {avgRating}
                                    <span className="out-of">/5</span>
                                </h2>
                            </div>
                            <div className="rating-column">
                                {/* {[...Array(5)].map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={
                                                Math.floor(avgRating) <= index
                                                    ? "transparent-star"
                                                    : "colored-star"
                                            }
                                        ></div>
                                    );
                                })} */}
                                <div className="rating-fix">
                                    <Rating
                                        initialRating={avgRating}
                                        readonly
                                        emptySymbol={
                                            <div
                                                className={"transparent-star"}
                                            />
                                        }
                                        fullSymbol={
                                            <div className={"colored-star"} />
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="global-rating">
                            {totalReviews} Rating
                        </div>
                    </div>
                </div>
                <div className="rgt-rating">
                    <ul>
                        {Object.keys(ratings)
                            .reverse()
                            .map((rating, index1) => {
                                return (
                                    <li key={rating}>
                                        <div className="star-number">
                                            <i className="icon-star"></i>
                                            <div className="star-qty">
                                                {rating}
                                            </div>
                                        </div>
                                        <div className="unfilled-box">
                                            <div
                                                className="filled-box"
                                                style={{
                                                    width: `${Math.floor(
                                                        (ratings[rating] /
                                                            totalReviews) *
                                                            100
                                                    )}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="rating-percent">
                                            {Math.floor(
                                                (ratings[rating] /
                                                    totalReviews) *
                                                    100
                                            )}
                                            %
                                        </div>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TotalRating;
