import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { readReviews } from "../../store/review";

import {readSpots } from '../../store/spot';

import './review.css';

import OpenModalButton from '../OpenModalButton';

import DeleteReviewModal from "../DeleteReviewModal";

import { readOneReview } from "../../store/user";

const ReviewsByReviewId = () => {

  const dispatch = useDispatch();

  const {id} = useParams();

  const spotReviews = useSelector(state => state.reviews)
  const spot = useSelector(state => state.spot.singleSpot);

  const onClickDelete = async () => {

    await dispatch(readOneReview(spot.id));

  }

  useEffect(() => {
    dispatch(readReviews(id));
  },[spot]);

  return (
    <div className='reviews'>
      <div className='review-header'>
      <div className='reserve-detail'>
          <div className='review-numbers'>{spot.numReviews > 0 ? `${spot.numReviews}` : <span className="fa fa-star">NEW</span>}</div>
          <div>
            <div>{spot.numReviews === 1 ? `review`: ''}</div>
            <div>{spot.numReviews > 1 ? `reviews`: ''}</div>
            <div>{spot.numReviews === 0 ?  "": ""}</div>
          </div>
            <div className='dot'>{spot.numReviews === 0 ? "" :"·"}</div>
            <div className='rating'><span className="fa fa-star"></span>{spot?.avgStarRating}</div>
        <div>


        </div>
      </div>
      <h1>Reviews</h1>
      </div>
      <div className='review-content'>
      {Object.values(spotReviews).length && Object.values(spotReviews.reviews).map((review) =>
          <div key={review.id} className='review-box'>
            <div className='firstName'>
              <span>{review?.User?.firstName}</span>
            </div>
            <div className='year-month'>
              {review.createdAt.split("-")[1]}/{review.createdAt.split("-")[0]}
            </div>
            <div className='comment'>
              {review.review}
            </div>
          </div>
      )}
      </div>
         <div className='be-the-first'>
           {!Object.values(spotReviews.reviews).length ? <h2>Be the frst to post a review!</h2> : ""}
         </div>
       <div className='delete-review-botton'>
              <OpenModalButton
                buttonText="Delete"
                onButtonClick={onClickDelete}
                modalComponent={<DeleteReviewModal />}
              />
      </div>
    </div>
  )
}

export default ReviewsByReviewId
