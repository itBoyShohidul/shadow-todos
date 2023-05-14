import React from "react";
import "../style/todo.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

function Todo({ data }) {
  const { _id, title, description } = data;
  const navigate = useNavigate();

  const deleteTodo = () => {
    const cookie = Cookie.get("user-cookie");
    axios.delete(process.env.REACT_APP_DELETE_TODO + _id, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
  };
  return (
    <div className="todo">
      <h3>{title}</h3>
      <div className="todo-sec">
        <p>{description}</p>
        <div className="todo-controls">
          <button
            className="btn-todo"
            onClick={() => {
              navigate(`/edit-todo/${_id}`);
            }}
          >
            <BsFillPencilFill /> <span>Edit</span>
          </button>
          <button
            className="btn-todo btn-todo-delete"
            onClick={() => {
              deleteTodo();
            }}
          >
            <BsFillTrashFill /> <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
