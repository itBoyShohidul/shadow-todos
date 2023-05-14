import React from "react";

//Internals
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Todos from "../components/Todos";

function Dashboard() {
  return (
    <div>
      <Nav />
      <div className="app">
        <Todos />
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
