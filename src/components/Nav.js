import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { RxHamburgerMenu } from "react-icons/rx";

//Internals
import "../style/nav.css";

function Nav() {
  const [toogle, setToggle] = useState("hidden");
  const [loggedIn, setLoggedIn] = useState(false);

  const cookie = Cookie.get("user-cookie");
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie === undefined) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [cookie]);

  const logOut = () => {
    Cookie.remove("user-cookie");
    navigate("/login");
  };

  const toogleHandler = () => {
    if (toogle === "show") {
      setToggle("hidden");
    } else {
      setToggle("show");
    }
  };

  return (
    <div className="nav">
      <div className="nav-container">
        <div className="nav-left">
          <Link to={"/"}>
            <h3>Shadow Todos</h3>
          </Link>
          <button onClick={toogleHandler} className="toggle-btn">
            <RxHamburgerMenu />
          </button>
        </div>
        <div className={"nav-right"}>
          <ul>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
            <li className={loggedIn ? "show" : "hide"}>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li className={loggedIn ? "show" : "hide"}>
              <Link to={"/new-todo"}>New Todo</Link>
            </li>
            <li className={!loggedIn ? "show" : "hide"}>
              <Link to={"/login"}>Login</Link>
            </li>
            <li className={loggedIn ? "show" : "hide"}>
              <button
                className="log-out"
                onClick={() => {
                  logOut();
                }}
              >
                Log out
              </button>
            </li>
            <li className={!loggedIn ? "show" : "hide"}>
              <Link to={"/signup"}>Signup</Link>
            </li>
          </ul>
        </div>
        {/*========
         Responsive-nav 
         ==========*/}
        <div className={`responsive-nav ${toogle}`}>
          <ul>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
            <li className={loggedIn ? "show" : "hide"}>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li className={loggedIn ? "show" : "hide"}>
              <Link to={"/new-todo"}>New Todo</Link>
            </li>
            <li className={!loggedIn ? "show" : "hide"}>
              <Link to={"/login"}>Login</Link>
            </li>
            <li className={loggedIn ? "show" : "hide"}>
              <button
                className="log-out"
                onClick={() => {
                  logOut();
                }}
              >
                Log out
              </button>
            </li>
            <li className={!loggedIn ? "show" : "hide"}>
              <Link to={"/signup"}>Signup</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
