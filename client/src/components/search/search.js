import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./search.css";

import BASE_URL from "../Base_url";
import LoadingScreen from "../loadingScreen/loadingScreen";
import SearchCard from "./searchCard";
import AppNavBar from "../navbar/navbar";

function Search(props) {
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [searchBase, setSearchBase] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const searchKey = props.match.params.id;

  const fetchData = async () => {
    let tempUserId, tempUserType;
    let tempSearchBase;

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
      // Get search base
      await Axios({
        method: "GET",
        withCredentials: true,
        url: `${BASE_URL}/api/user/search/${tempUserId}`,
      })
        .then((res) => {
          tempSearchBase = res.data.data;
          console.log("SearchBase: ", tempSearchBase);
          setSearchBase(tempSearchBase);
        })
        .catch((error) => {
          console.log(error);
          setSearchBase(null);
        });

      // get usertype
      await Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/api/user/${tempUserId}`,
      })
        .then((res) => {
          tempUserType = res.data.data.usertype;
          console.log("User type: ", tempUserType);
          setUserType(tempUserType);
        })
        .catch((error) => {
          console.log(error);
          setUserType(null);
        });
    }

    setLoadingData(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const doesMatchSearchKey = (text) => {
    text = text.toLowerCase().replace(/\s+/g, "");
    const key = searchKey.toLowerCase().replace(/\s+/g, "");
    return text.includes(key);
  };

  const showSearchCards = () => {
    return (
      userId &&
      userType &&
      searchKey &&
      searchBase &&
      searchBase.map((searchedUser) => {
        if (doesMatchSearchKey(searchedUser.username)) {
          return (
            <SearchCard
              userId={userId}
              userType={userType}
              details={searchedUser}
            />
          );
        }
      })
    );
  };

  if (loadingData) {
    return <LoadingScreen />;
  }

  return (
    <div className="Search">
      <AppNavBar />

      <div class="page-header">
        <h1>You searched for "{searchKey}" !</h1>
      </div>

      <div class="receiver-list">{showSearchCards()}</div>
    </div>
  );
}

export default Search;
