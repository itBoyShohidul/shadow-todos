import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";

//Internals
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";

function EditTodo() {
  const params = useParams();
  const navigate = useNavigate();

  // const [prevTitle, setPrevTitle] = useState("");
  // const [prevDesciption, setPrevDescription] = useState("");

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const cookie = Cookie.get("user-cookie");

  // Fucntions and lifcycle
  const getAtodo = () => {
    axios
      .get(process.env.REACT_APP_UPDATE_TODO + params.id, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      })
      .then((res) => {
        const { title, description } = res.data.result[0];
        setUpdatedTitle(title);
        setUpdatedDescription(description);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getAtodo();

    // eslint-disable-next-line
  }, []);

  const updateTodo = (e) => {
    e.preventDefault();

    axios
      .put(
        process.env.REACT_APP_UPDATE_TODO + params.id,
        { title: updatedTitle, description: updatedDescription },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      )
      .then()
      .catch((err) => {
        console.log(err.message);
      });

    setUpdatedTitle("");
    setUpdatedDescription("");
    navigate("/dashboard");
  };
  return (
    <div>
      <Nav />
      <div className="app">
        <h2 className="login-title">Edit todo</h2>
        <form action="" onSubmit={updateTodo}>
          <label htmlFor="title">New title:</label>
          <input
            type="text"
            id="title"
            placeholder="Insert title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle((prev) => e.target.value)}
          />
          <label htmlFor="description">New description:</label>
          <textarea
            name="description"
            cols="30"
            rows="10"
            id="description"
            placeholder="Insert description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(() => e.target.value)}
          />
          <button type="submit" className="btn-primary login">
            Update Todo
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default EditTodo;
