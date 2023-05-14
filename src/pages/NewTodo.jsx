import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

//Internals
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function NewTodo() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    const cookie = Cookie.get("user-cookie");

    axios
      .post(
        process.env.REACT_APP_NEW_TODO,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      )
      .then(() => {
        setTitle("");
        setDescription("");
        navigate("/dashboard");
      })
      .catch(navigate("/login"));
  };

  return (
    <div>
      <Nav />
      <div className="app">
        <h2 className="login-title">Make a todo</h2>
        <form action="" onSubmit={addTodo}>
          <label htmlFor="title">Todo title:</label>
          <input
            type="text"
            id="title"
            placeholder="Insert title"
            value={title}
            onChange={(e) => setTitle(() => e.target.value)}
            required
          />
          <label htmlFor="description">Todo description:</label>
          <textarea
            name="description"
            cols="30"
            rows="10"
            id="description"
            placeholder="Insert description"
            value={description}
            onChange={(e) => setDescription(() => e.target.value)}
            required
          />
          <button type="submit" className="btn-primary login">
            Add Todo
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default NewTodo;
