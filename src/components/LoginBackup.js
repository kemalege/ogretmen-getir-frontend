import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [access_token, setAccess_token] = useState("");



  let api = axios.create({
    headers: {
      authorization: `Bearer: ${access_token}`,
    },
  });

  const handleOnChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const onLoginForm = (event) => {
    event.preventDefault();
    api
      .post("http://localhost:5000/auth/login", userData)
      .then((response) => {
        setAccess_token(response.data.access_token);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getToProfile = (event) => {
    event.preventDefault();
    api
      .get("http://localhost:5000/auth/profile")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="mx-auto my-40">
      <div class="ui middle aligned center aligned grid">
        <div class="column">
          <h2 class="ui teal image header">
            <img src="assets/images/logo.png" class="image" />
            <div class="content">Log-in to your account</div>
          </h2>
          <form class="ui large form">
            <div class="ui stacked segment">
              <div class="field">
                <div class="ui left icon input">
                  <i class="user icon"></i>
                  <input
                    onChange={handleOnChange}
                    value={userData.email}
                    type="text"
                    name="email"
                    placeholder="E-mail address"
                  />
                </div>
              </div>
              <div class="field">
                <div class="ui left icon input">
                  <i class="lock icon"></i>
                  <input
                    onChange={handleOnChange}
                    value={userData.password}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <button
                onClick={onLoginForm}
                class="ui fluid large teal submit button"
              >
                Login
              </button>
            </div>
            <button
              onClick={getToProfile}
              class="ui fluid large teal submit button"
            >
              Profile
            </button>
            <div class="ui error message"></div>
          </form>

          <div class="ui message">
            New to us? <a href="#">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
