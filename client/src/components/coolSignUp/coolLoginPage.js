import React, { useState } from "react";
import Axios from "axios";
import { useAuth } from "../../auth-context";
import { useHistory } from "react-router-dom";

import "./signup.css";
import LoginForm from "./loginForm";
import SignUpForm from "./signupForm";

function CoolLoginPage() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const { authLogin } = useAuth();
  let pageHistory = useHistory();

  const handleLogin = async (value) => {
    console.log("Handling Log In: ", value);
    let success = false;

    await Axios({
      method: "POST",
      data: {
        username: value.email,
        password: value.password,
      },
      withCredentials: true,
      url: "http://localhost:5000/api/auth/login",
    })
      .then((res) => {
        if (res.data.message === "Successfully Authenticated") {
          localStorage.setItem("token", "true");
          authLogin();
          pageHistory.push("/");
          success = true;
        }
        console.log("Login POST response: ", res);
      })
      .catch((error) => {
        console.log(error);
        success = false;
      });
    return success;
  };

  const handleSignUp = async (value) => {
    console.log("Handling Sign Up: ", value);
    let success = false;

    await Axios({
      method: "POST",
      data: {
        email: value.email,
        password: value.password,
      },
      withCredentials: true,
      url: "http://localhost:5000/api/auth/register",
    })
      .then((res) => {
        if (res.data.message === "A new user has been added to the database") {
          handleLogin(value);
          success = true;
        }
        console.log("Sign Up POST response: ", res);
      })
      .catch((error) => {
        console.log(error);
        success = false;
      });

    console.log("Sign up after stuff", success);
    return success;
  };

  const showOverlayPanel = () => {
    return (
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To Keep connected with us please login with your personal info
            </p>
            <button
              class="ghost"
              id="signIn"
              onClick={() => setIsSignUpMode(!isSignUpMode)}
            >
              Sign In
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>KAIZEN!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button
              class="ghost"
              id="signUp"
              onClick={() => setIsSignUpMode(!isSignUpMode)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="SignUp">
      <body>
        <div
          class={"container " + (isSignUpMode && "right-panel-active")}
          id="container"
        >
          {isSignUpMode ? (
            <SignUpForm handleSubmit={handleSignUp} />
          ) : (
            <LoginForm handleSubmit={handleLogin} />
          )}
          {showOverlayPanel()}
        </div>
      </body>
    </div>
  );
}

export default CoolLoginPage;
