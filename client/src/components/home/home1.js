import React, { useState, useEffect } from "react";
import "./home.css";
import "./navbar.css";
import AppNavBar from "../navbar/navbar";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import BASE_URL from "../Base_url";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import LoanCards from "./LoanCards";

function getdate(dt) {
  return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
}

export default function HomePage() {
  const [showDonations, setShowDonations] = useState(false);
  const [loans, setLoans] = useState([]);
  const [donations, setDonations] = useState([]);
  const [userId, setUserId] = useState([]);
  const [hiddenData, setHiddenData] = useState([]);
  const [formBooleans, setFormBooleans] = useState([]);

  const fetchdata = async () => {
    // Get loans
    await Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/api/loans?type=loan&sort=review",
    }).then((res) => {
      // console.log(res);
      setLoans(res.data);
      console.log("Received Loans: ", loans, loans.length);
    });

    // Get donations
    await Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/api/loans?type=donation&sort=review",
    }).then((res) => {
      console.log(res);
      setDonations(res.data);
      console.log("Received Donations: ", donations, donations.length);
    });

    // Get userId
    await Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/api/auth/isloggedin",
    }).then((res) => {
      setUserId(res.data.data.data);
      console.log("UserId: ", userId);
    });

    // Get hiddenData for usertype
    await Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:5000/api/user/${userId}`,
    }).then((res) => {
      setHiddenData(res.data.data);
      console.log("All the hidden data:", hiddenData);
    });

    // Get form booleans (collateral and hiddenDetails)
    await Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:5000/api/auth/${userId}`,
    }).then((res) => {
      console.log("Verified or not: ", res);
      setFormBooleans(res.data.data);
      console.log("form Booleans: ", formBooleans);
    });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const showBanner = () => {
    if (
      formBooleans.hiddenDetails &&
      hiddenData.usertype === "Receiver" &&
      formBooleans.collateral
    ) {
      return <div></div>;
    } else {
      <div class="banner">
        <div class="text-box">
          <p>Looking For A Place to lend money to someone in need ?</p>
          <a href="/registration" class="btn btn-dark">
            Fill Up the form
          </a>
        </div>
      </div>;
    }
  };

  const switchToLoans = () => {
    if (showDonations) setShowDonations(false);
  };

  const switchToDonations = () => {
    if (!showDonations) setShowDonations(true);
  };

  return (
    <div>
      <AppNavBar />

      {showBanner()}

      <div class="content-box">
        <div class="category-box">
          <ul class="category-type">
            <li class="category">
              <a
                onClick={switchToLoans}
                class="btn-category btn-category-left btn-dark"
              >
                Loans
              </a>
            </li>
            <li class="category">
              <a
                onClick={switchToDonations}
                class="btn-category btn-category-right btn-light"
              >
                Donations
              </a>
            </li>
          </ul>
        </div>
      </div>

      <LoanCards requests={showDonations ? donations : loans} />

      <div class="footer">
        <p>You can find the project link here:</p>
        <a href="#">
          <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
          <i class="fab fa-github fa-2x"></i>
        </a>
      </div>
    </div>
  );
}
