import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";

//Internals
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState("password");
  const [isUserNameExist, setIsUserNameExist] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      password === rePassword &&
      password.length > 7 &&
      password.length < 17
    ) {
      successSubmit();
    } else {
      setIsPasswordMatch(false);
    }
  };

  const successSubmit = () => {
    axios
      .post("http://localhost:5000/user/signup", {
        firstName,
        lastName,
        username,
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/login");
          setFirstName("");
          setLastname("");
          setEmail("");
          setUsername("");
          setPassword("");
          setRePassword("");
          setChecked(false);
        }
      })
      .catch(() => setIsUserNameExist(true));
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
      <div className="app signup-container">
        <h2 className="signup-title">Create an account</h2>

        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            placeholder="Insert first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            placeholder="Insert last name"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Insert a valid email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Insert username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <p
            className={isUserNameExist ? "show" : "hide"}
            style={{ color: "tomato" }}
          >
            This username already exist.
          </p>

          <label htmlFor="password">Password:</label>
          <div className="eye-holder">
            <input
              type={showPassword}
              id="password"
              placeholder="Insert password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="password-show eye" onClick={handleShow}>
              {showPassword === "password" ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <label htmlFor="repassword">Re-enter Password:</label>
          <div className="eye-holder">
            <input
              type={showPassword}
              id="repassword"
              placeholder="Insert password again"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              required
            />
            <span className="password-show eye" onClick={handleShow}>
              {showPassword === "password" ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <p
            className={!isPasswordMatch ? "show" : "hide"}
            style={{ color: "tomato" }}
          >
            Password does not match.
          </p>
          <label className="checkbox">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              checked={checked}
              onChange={() => {
                if (!checked) {
                  setChecked(true);
                } else {
                  setChecked(false);
                }
              }}
              required
            />{" "}
            <span className="checktext">I agee to all terms & conditions</span>
          </label>
          <button type="submit" className="btn-primary login">
            Signup
          </button>
          <p>
            <Link to={"/login"} className="forgot-password">
              Already have an account?
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
