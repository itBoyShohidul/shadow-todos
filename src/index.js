// Dependancies
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";

//Internals
import "./style/index.css";
import App from "./App";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewTodo from "./pages/NewTodo";
import EditTodo from "./pages/EditTodo";
import About from "./pages/About";
import Contact from "./pages/Contact";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/new-todo" element={<NewTodo />} />
      <Route path="/edit-todo/:id" element={<EditTodo />} />

      {/* 404 not found */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
