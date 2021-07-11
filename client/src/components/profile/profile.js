import React, { useState, useEffect } from "react";
import Axios from "axios";
import LenderProfile from "./lenderProfile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import formatDate from "../../utils/formatDate";
import AppNavBar from "../navbar/navbar";
import ReceiverProfile from "./receiverProfile";
import LoadingScreen from "../loadingScreen/loadingScreen";

function Profile() {
  const [userId, setUserId] = useState([]);
  const [hiddenData, setHiddenData] = useState([]);
  const [formBooleans, setFormBooleans] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  const fetchdata = async () => {
    let tempUserId, tempHiddenData;
    let tempFormBooleans;

    // Get userId
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
      // Get hiddenData
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

  const showProfile = () => {
    const userType = hiddenData.usertype;
    if (userType === "Lender") {
      return <LenderProfile userId={userId} hiddenData={hiddenData} />;
    } else if (userType == "Receiver") {
      return <ReceiverProfile userId={userId} hiddenData={hiddenData} />;
    }
  };

  if (loadingData) {
    return <LoadingScreen />;
  }

  if (!formBooleans || !formBooleans.hiddenDetails) {
    return (
      <div class="Profile">
        <div class="user-info">
          <div class="description">
            <h1 style={{ flexDirection: "column" }}>Heads Up!</h1>
            <p style={{ paddingTop: "30px", textAlign: "left" }}>
              You are a new user, and you haven't provided your necessary info
              yet. Thus, you can't see your profile or others'. You may do any
              of the following:
              <ul style={{ padding: "20px 10px 10px 50px" }}>
                <li>
                  Provide your info in <a href="/registration">/registration</a>
                  . <i style={{ color: "green" }}>(Recommended)</i>
                </li>
                <li>
                  Hover over the loan requests in <a href="/">/home</a>.
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="Profile">
      <AppNavBar />

      {showProfile()}

      <div class="footer">
        <p>
          You can find the project link here:
          <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
        </p>
        <a href="#">
          <i class="fab fa-github fa-2x"></i>
        </a>
      </div>
    </div>
  );
}

export default Profile;
