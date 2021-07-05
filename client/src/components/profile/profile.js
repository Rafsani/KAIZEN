import React, { useState, useEffect } from "react";
import Axios from "axios";
import LenderProfile from "./lenderProfile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import formatDate from "../../utils/formatDate";

function Profile() {
  const [userId, setUserId] = useState([]);
  const [hiddenData, setHiddenData] = useState([]);

  const fetchdata = async () => {
    await Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/api/auth/isloggedin",
    }).then((res) => {
      setUserId(res.data.data.data);
      console.log("UserId: ", userId);
    });

    await Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:5000/api/user/${userId}`,
    }).then((res) => {
      setHiddenData(res.data.data);
      // console.log("All the hidden data:", hiddenData);
      // console.log("Date in Good format: ", formatDate(hiddenData.dob));
    });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <LenderProfile userId={userId} hiddenData={hiddenData} />

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
