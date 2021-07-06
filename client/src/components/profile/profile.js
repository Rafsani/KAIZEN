import React, { useState, useEffect } from "react";
import Axios from "axios";
import LenderProfile from "./lenderProfile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import formatDate from "../../utils/formatDate";
import AppNavBar from "../navbar/navbar";

function Profile() {
  const [userId, setUserId] = useState([]);
  const [hiddenData, setHiddenData] = useState([]);
  const [history, setHistory] = useState([]);

  const fetchdata = async () => {
    let tempUserId, tempHiddenData;

    // Get userId 
    await Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/api/auth/isloggedin",
    }).then((res) => {
      tempUserId = res.data.data.data;
      console.log("tempUserId: ", tempUserId);
      setUserId(tempUserId);
    })

    // Get hiddenData
    await Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:5000/api/user/${tempUserId}`,
    }).then((res) => {
      tempHiddenData = res.data.data;
      console.log("tempHiddenData: ", tempHiddenData);
      setHiddenData(tempHiddenData);
    })
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const showProfile = () => {
    const userType = hiddenData.usertype;
    if (userType === "Lender") {
      return (
        <LenderProfile
          userId={userId}
          hiddenData={hiddenData}
        />
      )
    }
    else {
      return <p>Hello world!</p>
    }
  }

  return (
    <div>
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
