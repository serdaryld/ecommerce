import React, { useState } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

export default function Rating({ rating, numReviews, onClick, isEditable, size }) {
  const [hover, setHover] = useState(null);
  const [currentRating, setCurrentRating] = useState(rating);

  const getStarType = (index, ratingValue) => {
    if (ratingValue >= index - 0.25) {
      return <FaStar />;
    } else if (ratingValue >= index - 0.75) {
      return <FaStarHalfAlt />;
    } else {
      return <FaRegStar />;
    }
  };

  const handleMouseEnter = (index) => {
    if (isEditable) {
      setHover(index);
      setCurrentRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (isEditable) {
      setHover(null);
      setCurrentRating(rating);
    }
  };

  const handleClick = (index) => {
    if (isEditable) {
      onClick(index);
      setCurrentRating(index);
    }
  };

  return (
    <div className={`rating ${size}`}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        const starType = getStarType(index, hover || rating);
        return (
          <span
            key={index}
            className={"star"}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
          >
            {starType}
          </span>
        );
      })}
      {numReviews && <span className='rating-text'>{rating.toFixed(1)}</span>}
      {isEditable && <span className='rating-value'>{currentRating}/5</span>}
    </div>
  );
}
