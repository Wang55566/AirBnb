import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import {readSpots, readOneSpot} from '../../store/spot';

import OpenModalButton from '../OpenModalButton';

import ReserveMessageModal from '../ReserveMessageModal';

import './SpotDetails.css';

import PostReview from '../PostReview';

import { readReviews } from "../../store/review";

const SpotDetails = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  const spot = useSelector(state => state.spot.singleSpot);
  const review = useSelector(state => state.reviews);
  const currentUser = useSelector(state => state.session.user);


  useEffect(() => {
     dispatch(readOneSpot(id));
  //   dispatch(readReviews(spot.id));
  },[dispatch]);

  // useEffect(() => {
  //   console.log("spot:", spot);
  //   console.log("review:", review);
  // })

  return (
    <>
    <div className='spot-details'>
      <div className='title'>
        <h1>{spot.name}</h1>
        <h2>{spot.city}, {spot.state}, {spot.country}</h2>
      </div>
      <div className='spot-pictures'>
        <div className='image1'>
        {spot && Object.values(spot).length !== 0 && spot.SpotImages.map(img =>
        <img key={img.id} src= {img.url} alt='' width='600px' height='400px'/>
        )}
        {/* {!spot.SpotImages? <img src= {spot.previewImage} alt='' width='600px' height='400px'/> : ""} */}
        {/* {spot.previewImage ? <img className="image_placeholder" src= {spot.previewImage} alt=''/> : <img className="image_placeholder"/>} */}
        </div>
        <div className='image2-image3'>
          <div className='image2'><img className="image_placeholder"/></div>
          <div className='image3'><img className="image_placeholder"/></div>
      </div>
        <div className='image4-image5'>
          <div className='image4'><img className="image_placeholder"/></div>
          <div className='image5'><img className="image_placeholder"/></div>
        </div>
    </div>

    </div>
      <div className='spot-content'>
        <div className='host-name-spot-info'>
          <p className ='host-text'>Host By {Object.values(spot).length && spot?.Owner?.firstName} {Object.values(spot)?.length && spot?.Owner?.lastName}</p>
          <p>{spot.description}</p>
        </div>
      <div className='reserve-box'>
        <div className='review-dot-rating'>
          <div className='reserve-review-rating'>
            <div>{spot?.numReviews > 0 ? `${spot?.numReviews}` : <span className="fa fa-star">NEW</span>}</div>
          </div>
          <div claaName='review'>
            <div>{spot?.numReviews === 1 ? `review`: ''}</div>
            <div>{spot?.numReviews > 1 ? `reviews`: ''}</div>
            <div>{spot?.numReviews === 0 ?  "": ""}</div>
          </div>
          <div className='dot'>{spot?.numReviews === 0 ? "" :"·"}</div>
          <div className='rating'><span className="fa fa-star"></span>{spot?.avgStarRating}</div>
        </div>
        <div className='price'>${spot?.price} night</div>
        <div className='reserve-button'>
              <OpenModalButton
                id='id'
                buttonText="Reserve"
                modalComponent={<ReserveMessageModal />}
              />
        </div>
      </div>
    </div>
           <div>
            {/* <div className='post-review-button'>
              <PostReview/>
            </div> */}
          </div>
    </>
  )
}

export default SpotDetails;
