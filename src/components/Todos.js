import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import Todo from "./Todo";
import { useNavigate } from "react-router-dom";

function Todos() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getAllTodos = () => {
    const cookie = Cookie.get("user-cookie");
    axios(process.env.REACT_APP_GET_ALL_TODO, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setData([]);
        navigate("/login");
      });
  };

  useEffect(() => {
    getAllTodos();
    // eslint-disable-next-line
  }, [data]);

  return (
    <div>
      <h2 className="login-title">Todos</h2>
      <div style={{ paddingTop: "20px" }}>
        {data.map((todo) => (
          <Todo key={todo._id} data={todo} />
        ))}
      </div>
    </div>
  );
}

export default Todos;
