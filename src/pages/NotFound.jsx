import React from "react";

//Internals
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function NotFound() {
  return (
    <>
      <Nav />
      <div className="app not-found">
        <h1>404 not found!</h1>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
