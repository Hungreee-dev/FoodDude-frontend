import React from "react";
import "./style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const index = ({ rating, review, photoURL, username }) => {
  const ratings = Math.round(rating);
  const emptyRatings = 5 - ratings;
  return (
    <div className="review_card shadow">
      <div className="review_card_user">
        <img
          className="reviewcard_user_photo"
          src={photoURL}
          alt={`${username}'s profile'`}
        />
        <p className="review_card_user_name">
          <span>{username}</span>
        </p>
      </div>
      <div className="line-1"></div>
      <p className="review_card_review">{review}</p>
      <div className="review_card_ratings">
        {Array(ratings)
          .fill(1)
          .map((ele, i) => (
            <FontAwesomeIcon key={i} className="star_fill" icon={faStar} />
          ))}
        {Array(emptyRatings)
          .fill(1)
          .map((ele, i) => (
            <FontAwesomeIcon key={i} icon={faStar} />
          ))}
      </div>
      <div className="line-2"></div>
    </div>
  );
};

export default index;
