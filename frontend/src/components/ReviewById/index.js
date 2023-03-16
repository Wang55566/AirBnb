import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { readReviews } from "../../store/review";

import './review.css';

const ReviewsByReviewId = () => {

  const dispatch = useDispatch();

  const {id} = useParams();

  const spotReviews = useSelector(state => state.reviews)

  useEffect(() => {
    dispatch(readReviews(id));
  }, [dispatch, id]);

  return (
    <div className='reviews'>
      <h1>Review</h1>
      {Object.values(spotReviews).length && Object.values(spotReviews.reviews).map((review) =>
          <div key={review.id} className='review-box'>
            <div className='firstName'>
              {review && review.User.firstName}
            </div>
            <div className='year'>
              {review && review.createdAt.split("-")[0]}
            </div>
            <div className='comment'>
              {review && review.review}
            </div>
          </div>
      )}
    </div>
  )
}

export default ReviewsByReviewId
