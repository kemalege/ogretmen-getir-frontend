
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Stars {
    stars : number,
    reviews?: number
}
const Star = ({stars, reviews}:Stars) => {

  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;

    return (
        <span key={index}>
            {stars >= index + 1 ? (
                    <FontAwesomeIcon className="h-5 text-yellow-500" icon={faStar} />
                ): stars >= number ? (
                    <FontAwesomeIcon className="h-5 text-yellow-500"icon={faStarHalfStroke} />
                ): (
                    <FontAwesomeIcon className="h-5 text-yellow-500"icon={regularStar} />
                )}
        </span>
    )
  });
  return (
    <div className="flex items-center justify-center">
        {ratingStar}
    </div>
  )
};

export default Star;
