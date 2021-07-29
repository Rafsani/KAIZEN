import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./search.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import fetchImage from "../../utils/fetchImage";

function SearchCard({ userId, userType, details }) {
  console.log("SearchCard details: ", userId, userType, details);

  const getTargetToObject = () => {
    if (userType === "Receiver") {
      return {
        pathname: "/receiverViewsLender",
        lenderId: details._id,
        receiverId: userId,
      };
    } else if (userType === "Lender") {
      if (details.usertype === "Receiver") {
        return {
          pathname: "/lenderViewsReceiver",
          lenderId: userId,
          receiverId: details._id,
          lenderViewsReceiver: true,
        };
      } else if (details.usertype === "Lender") {
        return null;
      }
    }
  };

  return (
    <div class="user-item">
      <div class="user-card">
        <div
          class="photo-space"
          style={{
            backgroundImage: `url(${fetchImage(details.image.path)})`,
          }}
        ></div>
        <div class="user-info content-box">
          <div class="name-rating">
            <p>{details.username}</p>
            <div class="review">{details.usertype}</div>
          </div>
          <div class="buttons">
            <Link to={getTargetToObject()}>
              <a href="" class="btn-card btn-dark">
                View Profile
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;
