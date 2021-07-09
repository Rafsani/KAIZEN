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
import { config } from "@fortawesome/fontawesome-svg-core";
import { Redirect, useHistory } from "react-router-dom";
import LoadingScreen from "../loadingScreen/loadingScreen";

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
  const [loadingData, setLoadingData] = useState(true);

  const fetchdata = async () => {
    let tempUserId, tempHiddenData;
    let tempLoans, tempDonations;
    let tempFormBooleans;

    // Get userId and hiddenData
    await Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/api/auth/isloggedin",
    })
      .then((res) => {
        tempUserId = res.data.data.data;
        console.log("tempUserId: ", tempUserId);
        setUserId(tempUserId);
      })
      .catch((error) => {
        console.log(error);
        setUserId(null);
      });

    if (tempUserId) {
      await Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/api/user/${tempUserId}`,
      })
        .then((res) => {
          tempHiddenData = res.data.data;
          console.log("tempHiddenData: ", tempHiddenData);
          setHiddenData(tempHiddenData);
        })
        .catch((error) => {
          console.log(error);
          setHiddenData(null);
        });
    }

    if (tempHiddenData && tempHiddenData.usertype !== "Receiver") {
      // Get loans and donations
      await Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:5000/api/loans?type=loan&sort=review",
      })
        .then((res) => {
          tempLoans = res.data;
          console.log("Received Loans: ", tempLoans, tempLoans.length);
          setLoans(tempLoans);
        })
        .catch((error) => {
          console.log(error);
          setLoans(null);
        });

      await Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:5000/api/loans?type=donation&sort=review",
      })
        .then((res) => {
          tempDonations = res.data;
          console.log(
            "Received Donations: ",
            tempDonations,
            tempDonations.length
          );
          setDonations(tempDonations);
        })
        .catch((error) => {
          console.log(error);
          setDonations(null);
        });
    }

    // Get form booleans (collateral and hiddenDetails)
    if (tempUserId) {
      await Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/api/auth/${tempUserId}`,
      })
        .then((res) => {
          tempFormBooleans = res.data.data;
          console.log("form Booleans: ", tempFormBooleans);
          setFormBooleans(tempFormBooleans);
        })
        .catch((error) => {
          console.log(error);
          setFormBooleans(null);
        });
    }

    setLoadingData(false);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const showBanner = () => {
    if (
      formBooleans &&
      (formBooleans.hiddenDetails ||
        (hiddenData.usertype === "Receiver" && formBooleans.collateral))
    ) {
      return <div></div>;
    } else {
      return (
        <div class="banner">
          <div class="text-box">
            <p>Looking For A Place to lend money to someone in need ?</p>
            <a href="/registration" class="btn btn-dark">
              Fill Up the form
            </a>
          </div>
        </div>
      );
    }
  };

  const switchToLoans = () => {
    if (showDonations) setShowDonations(false);
  };

  const switchToDonations = () => {
    if (!showDonations) setShowDonations(true);
  };

  if (hiddenData.usertype === "Receiver") {
    return <Redirect to="/profile" />;
  }

  if (loadingData) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <AppNavBar />

      {showBanner()}

      <div class="content-box">
        <div class="category-box">
          <ul class="category-type">
            <li class="category">
              <a
                href="#"
                onClick={switchToLoans}
                class="btn-category btn-category-left btn-dark"
              >
                Loans
              </a>
            </li>
            <li class="category">
              <a
                href="#"
                onClick={switchToDonations}
                class="btn-category btn-category-right btn-light"
              >
                Donations
              </a>
            </li>
          </ul>
        </div>
      </div>

      <LoanCards requests={showDonations ? donations : loans} userId={userId} />

      <div class="footer">
        <p>You can find the project link here:</p>
        <a href="#">
          <FontAwesomeIcon icon={faGithub} size="2x"></FontAwesomeIcon>
          <i class="fab fa-github fa-2x"></i>
        </a>
      </div>
    </div>
  );
}
