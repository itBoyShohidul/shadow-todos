import React, { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { FaEyeSlash, FaEye } from "react-icons/fa";

//Internals
import "../style/login.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const [isUserExist, setIsUserExist] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/user/login", { username, password })
      .then((res) => {
        Cookie.set("user-cookie", res.data.token_access, {
          expires: 1,
        });
        setUsername("");
        setPassword("");
        navigate("/dashboard");
      })
      .catch((err) => {
        setIsUserExist(false);
      });
  };

  const handleShow = () => {
    if (showPassword === "text") {
      setShowPassword("password");
    } else {
      setShowPassword("text");
    }
  };
  return (
    <div>
      <Nav />
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form
          action="http://localhost:5000/user/login"
          method="post"
          onSubmit={handleSubmit}
        >
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Insert username"
            value={username}
            onChange={(e) => setUsername((prev) => e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <div className="eye-holder">
            <input
              type={showPassword}
              id="password"
              placeholder="Insert Password"
              value={password}
              onChange={(e) => setPassword((prev) => e.target.value)}
              className=""
            />
            <span className="password-show eye" onClick={handleShow}>
              {showPassword === "password" ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <p
            className={!isUserExist ? "show" : "hide"}
            style={{ color: "tomato" }}
          >
            Your information does not match
          </p>

          <button type="submit" className="btn-primary login">
            Login
          </button>
          <p
            className="forgot-password"
            onClick={() => {
              alert("Please contact to admin");
            }}
          >
            Forgot your password?
          </p>
          <p className="create-account-container">
            <Link to={"/signup"} className="create-account">
              Create an account ?
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
