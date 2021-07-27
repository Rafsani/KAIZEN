import React, { useState, useEffect } from "react";

import "./profile.css";

import formatDate from "../../utils/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalf, faStar } from "@fortawesome/free-solid-svg-icons";

function PostReviewForm({ onCancel, onSubmit }) {
  const [reviewStars, setReviewStars] = useState(4.5);
  const [reviewComment, setReviewComment] = useState("");

  console.log("Review: ", reviewComment);

  return (
    <div class="post-review-popup " id="post-review-popup">
      <div class="post-review-card content-box " id="popup-review">
        <div class="title-card">
          <h1>Post A Review</h1>
        </div>
        <div class="form">
          {/* <!-- Amount --> */}
          <div class="small-input-field inputs-div">
            <aside>
              <h3>Rate Receiver</h3>
              <p>Between (0.5 - 5 stars)</p>
            </aside>
            <div id="half-stars-example">
              <div class="rating-group">
                <input
                  class="rating__input rating__input--none"
                  name="rating2"
                  id="rating2-0"
                  value="0"
                  type="radio"
                  onChange={(e) => setReviewStars(0)}
                  checked={reviewStars === 0}
                />
                <label
                  aria-label="0 stars"
                  class="rating__label"
                  for="rating2-0"
                >
                  &nbsp;
                </label>
                <label
                  aria-label="0.5 stars"
                  class="rating__label rating__label--half"
                  for="rating2-05"
                >
                  <i class="rating__icon rating__icon--star fa fa-star-half">
                    <FontAwesomeIcon icon={faStarHalf}></FontAwesomeIcon>
                  </i>
                </label>
                <input
                  class="rating__input"
                  name="rating2"
                  id="rating2-05"
                  value="0.5"
                  type="radio"
                  onChange={(e) => setReviewStars(0.5)}
                  checked={reviewStars === 0.5}
                />
                <label
                  aria-label="1 star"
                  class="rating__label"
                  for="rating2-10"
                >
                  <i class="rating__icon rating__icon--star fa fa-star">
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                  </i>
                </label>
                <input
                  class="rating__input"
                  name="rating2"
                  id="rating2-10"
                  value="1"
                  type="radio"
                  onChange={(e) => setReviewStars(1)}
                  checked={reviewStars === 1}
                />
                <label
                  aria-label="1.5 stars"
                  class="rating__label rating__label--half"
                  for="rating2-15"
                >
                  <i class="rating__icon rating__icon--star fa fa-star-half">
                    <FontAwesomeIcon icon={faStarHalf}></FontAwesomeIcon>
                  </i>
                </label>
                <input
                  class="rating__input"
                  name="rating2"
                  id="rating2-15"
                  value="1.5"
                  type="radio"
                  onChange={(e) => setReviewStars(1.5)}
                  checked={reviewStars === 1.5}
                />
                <label
                  aria-label="2 stars"
                  class="rating__label"
                  for="rating2-20"
                >
                  <i class="rating__icon rating__icon--star fa fa-star">
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                  </i>
                </label>
                <input
                  class="rating__input"
                  name="rating2"
                  id="rating2-20"
                  value="2"
                  type="radio"
                  onChange={(e) => setReviewStars(2)}
                  checked={reviewStars === 2}
                />
                <label
                  aria-label="2.5 stars"
                  class="rating__label rating__label--half"
                  for="rating2-25"
                >
                  <i class="rating__icon rating__icon--star fa fa-star-half">
                    <FontAwesomeIcon icon={faStarHalf}></FontAwesomeIcon>
                  </i>
                </label>
                <input
                  class="rating__input"
                  name="rating2"
                  id="rating2-25"
                  value="2.5"
                  type="radio"
                  onChange={(e) => setReviewStars(2.5)}
                  checked={reviewStars === 2.5}
                />
                <label
                  aria-label="3 stars"
                  class="rating__label"
                  for="rating2-30"
                >
                  <i class="rating__icon rating__icon--star fa fa-star">
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                  </i>
                </label>
                <input
                  class="rating__input"
                  name="rating2"
                  id="rating2-30"
                  value="3"
                  type="radio"
                  onChange={(e) => setReviewStars(3)}
                  checked={reviewStars === 3}
                />
                <label
                  aria-label="3.5 stars"
                  class="rating__label rating__label--half"
                  for="rating2-35"
                >
                  <i class="rating__icon rating__icon--star fa fa-star-half">
                    <FontAwesomeIcon icon={faStarHalf}></FontAwesomeIcon>
                  </i>
                </label>
                <input
                  class="rating__input"
                  name="rating2"
                  id="rating2-35"
                  value="3.5"
                  type="radio"
                  onChange={(e) => setReviewStars(3.5)}
                  checked={reviewStars === 3.5}
                />
                <label
                  aria-label="4 stars"
                  class="rating__label"
                  for="rating2-40"
                >
                  <i class="rating__icon rating__icon--star fa fa-star">
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                  </i>
                </label>
                <input
                  class="rating__input"
                  name="rating2"
                  id="rating2-40"
                  value="4"
                  type="radio"
                  onChange={(e) => setReviewStars(4)}
                  checked={reviewStars === 4}
                />
                <label
                  aria-label="4.5 stars"
                  class="rating__label rating__label--half"
                  for="rating2-45"
                >
                  <i class="rating__icon rating__icon--star fa fa-star-half">
                    <FontAwesomeIcon icon={faStarHalf}></FontAwesomeIcon>
                  </i>
                </label>
                <input
                  class="rating__input"
                  name="rating2"
                  id="rating2-45"
                  value="4.5"
                  type="radio"
                  onChange={(e) => setReviewStars(4.5)}
                  checked={reviewStars === 4.5}
                />
                <label
                  aria-label="5 stars"
                  class="rating__label"
                  for="rating2-50"
                >
                  <i class="rating__icon rating__icon--star fa fa-star">
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                  </i>
                </label>
                <input
                  class="rating__input"
                  name="rating2"
                  id="rating2-50"
                  value="5"
                  type="radio"
                  onChange={(e) => setReviewStars(5)}
                  checked={reviewStars === 5}
                />
              </div>
            </div>
            <div class="rating-value">
              <span class="value">{reviewStars}</span>/5
            </div>
          </div>

          {/* <!-- Details of the loan --> */}
          <div class="text-area-input-field inputs-div">
            <aside>
              <h3>Post A Comment</h3>
              <p>Max 140 Characters</p>
            </aside>
            <div class="input-field">
              {/* <!-- <input type="text" class="small-input" max="10000" min="1000" required> --> */}
              <textarea
                class="text-area-input"
                cols="20"
                rows="5"
                maxlength="140"
                minlength="1"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* <!-- Buttons --> */}
          <div class="buttons inputs-div">
            <a href="#" class="btn-form btn-light" onClick={onCancel}>
              Cancel
            </a>
            <a
              href="#"
              class="btn-form btn-dark"
              onClick={() =>
                onSubmit({
                  ratingValue: reviewStars,
                  details: reviewComment,
                })
              }
            >
              Post
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostReviewForm;
