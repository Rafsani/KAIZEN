import React, { useState } from "react";

import "./signup.css";

function LoginForm({ handleSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logInFailed, setLoginFailed] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    const success = await handleSubmit({
      email: email,
      password: password,
    });
    console.log("In Form event: ", success);
    setLoginFailed(!success);
  };

  return (
    <div class="form-container sign-in-container">
      <form onSubmit={submitForm}>
        <h1
          style={{
            fontFamily: "Staatliches, cursive",
            letterSpacing: "2.5px",
            fontSize: "2.5rem",
            paddingBottom: "15px",
          }}
        >
          Sign In
        </h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setLoginFailed(false);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setLoginFailed(false);
          }}
        />
        {logInFailed ? (
          <p style={{ color: "red" }}>Sign In failed</p>
        ) : (
          <button type="submit" class="si">
            Sign In
          </button>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
