import React, { useState, useEffect } from "react";
import BASE_URL from "../Base_url";
import Axios from "axios";
import "./profile.css";

import formatDate from "../../utils/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalf, faStar } from "@fortawesome/free-solid-svg-icons";

function ReportPopup({lenderDetails, onCancel, onSubmit }) {
  const [reviewStars, setReviewStars] = useState(4.5);
  const [reviewComment, setReviewComment] = useState("");
  const [userId,setuserId] = useState(null);
  console.log("Review: ", reviewComment);



  const fetchUserId = async () => 
  {
      let tempUserId;
    await Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:5000/api/auth/isloggedin",
      })
        .then((res) => {
          tempUserId = res.data.data.data;
          console.log("tempUserId: ", tempUserId);
          setuserId(tempUserId);
        })
        .catch((error) => {
          console.log(error);
          setuserId(null);
        });
  };



  
useEffect(() => {
    fetchUserId();
  }, []);

    const sendReport = async () => {
        await Axios({
            method: "POST",
            data: {
                contractId: lenderDetails.contractId,
                description: reviewComment,
            },
            withCredentials: true,
            url: `${BASE_URL}/api/user/report/${userId}`,
          })
            .then((res) => {
              
            })
            .catch((error) => {
              console.log(error);
            });

            onCancel();
    };



  return (
    <div class="post-review-popup " id="post-review-popup">
      <div class="post-review-card content-box " id="popup-review">
        <div class="title-card">
          <h1> Report An Issue </h1>
        </div>
        <div class="form">
          {/* <!-- Amount --> */}
          

          {/* <!-- Details of the loan --> */}
          <div class="text-area-input-field inputs-div">
            <aside>
              <h3>Write in brief:</h3>
              <p>Max 140 Characters</p>
            </aside>
            <div class="input-field">
              {/* <!-- <input type="text" class="small-input" max="10000" min="1000" required> --> */}
              <textarea
                class="text-area-input"
                cols="20"
                rows="10"
                maxlength="140"
                minlength="1"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* <!-- Buttons --> */}
          <div class="buttons inputs-div">
            <a href="#!" class="btn-form btn-light" onClick={onCancel}>
              Cancel
            </a>
            <a
              href="#!"
              class="btn-form btn-dark"
              onClick={  sendReport  }
            >
              Post
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportPopup;
