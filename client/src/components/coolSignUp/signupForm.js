import React, { useState } from "react";

import "./signup.css";

function SignUpForm({ handleSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationFailed, setRegistrationFailed] = useState("");
  const passwordMinLength = 3;

  const isInputOkay = () => {
    if (
      email.length === 0 &&
      password.length === 0 &&
      confirmPassword.length === 0
    ) {
      return true;
    }
    return (
      password.length >= passwordMinLength &&
      password === confirmPassword &&
      !registrationFailed
    );
  };

  const getInputErrorMessage = () => {
    if (password.length < passwordMinLength) {
      return "Password must be at least " + passwordMinLength + " characters";
    }
    if (password !== confirmPassword) {
      return "Passwords don't match";
    }
    if (registrationFailed) {
      return "Registration failed.";
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const success = await handleSubmit({
      email: email,
      password: password,
    });
    console.log("In Form event: ", success);
    setRegistrationFailed(!success);
  };

  return (
    <div class="form-container sign-up-container">
      <form onSubmit={submitForm}>
        <h1>Create Account</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setRegistrationFailed(false);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setRegistrationFailed(false);
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setRegistrationFailed(false);
          }}
        />
        {isInputOkay() ? (
          <button type="submit" class="su">
            Sign Up
          </button>
        ) : (
          <p style={{ color: "red" }}>{getInputErrorMessage()}</p>
        )}
      </form>
    </div>
  );
}

export default SignUpForm;
