import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { axiosInstance } from "@/shared/api/axios";
import { catalogEndPoints } from "@/shared/api/endpoints";

import TotalRating from "./TotalRating/TotalRating";
import RatingImage from "@/shared/components/Reviews/RatingImage/RatingImage";
import ReviewBox from "./ReviewBox/ReviewBox";
import FilterDropdown from "../SelectedProduct/FilterDropdown/FilterDropdown";
import Pagination from "../Pagination/Pagination";
import { reviewPageLimit } from "../../utils/constants";
import "./Reviews.scss";

const filterData = [
    {
        name: "Most recent",
        value: "newest",
    },
    {
        name: "Most helpful",
        value: "mostHelpful",
    },
    {
        name: "Positive first",
        value: "positive",
    },
    {
        name: "Negative first",
        value: "negative",
    },
];

const Reviews = ({ productId }) => {
    const [firstPage, GetfirstPage] = useState(0);
    const [EndPage, GetEndPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(0);
    const router = useRouter();
    const [reviews, setReviews] = useState(null);
    const [totalReviews, setTotalReviews] = useState(0);
    const [ratings, setRatings] = useState(0);
    const [avgRating, setAvgRating] = useState(0);
    const [reviewImages, setReviewImages] = useState(null);
    const [sortBy, setSortBy] = useState("newest");
    const getReviews = (payload) => {
        axiosInstance
            .post(catalogEndPoints.getReviews, payload)
            .then((res) => {
                setReviews(res.data.data.reviews);
                setTotalReviews(res.data.data.totalCount);
                setRatings(res.data.data.ratingCounts);
                setAvgRating(res.data.data.avgRatingCount);
                setReviewImages(res.data.data?.allImages);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        const payload = {
            page: currentPage + 1,
            limit: reviewPageLimit,
            slug: router.query.product,
            sort: sortBy,
        };
        getReviews(payload);
    }, [currentPage, router.query.product, sortBy]);

    const OnPageChange = (data) => {
        useEffect(() => {
            GetfirstPage(data.customFirst3);
            GetEndPage(data.GetLastItems);
            setCurrentPage(data.page);
        }, [data]);
    };

    if (!reviews || reviews?.length === 0) {
        return <div>No review found for this product.</div>;
    }

    return (
        <>
            <div className="rate-wrap">
                <TotalRating
                    ratings={ratings}
                    totalReviews={totalReviews}
                    avgRating={avgRating}
                />
                {reviewImages?.length > 0 && (
                    <RatingImage reviewImages={reviewImages} />
                )}
            </div>
            <div className="review-select">
                {totalReviews} reviews
                <FilterDropdown filterData={filterData} setSortBy={setSortBy} />
            </div>
            <div className="review-box-wrap">
                {reviews?.map((review) => {
                    return (
                        <ReviewBox
                            key={review._id}
                            review={review}
                            productId={productId}
                            getReviews={getReviews}
                            payload={{
                                page: currentPage + 1,
                                limit: reviewPageLimit,
                                slug: router.query.product,
                                sort: sortBy,
                            }}
                        />
                    );
                })}
            </div>
            {totalReviews > reviewPageLimit && (
                <div className="pagination-wrap">
                    <Pagination
                        totalRecords={totalReviews}
                        OnPageChange={OnPageChange}
                        limit={reviewPageLimit}
                    />
                </div>
            )}
        </>
    );
};

export default Reviews;
