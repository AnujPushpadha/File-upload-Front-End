import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";

const SignUp = () => {
  const [data, setData] = useState({
    username: "",

    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "https://file-upload-4grn.onrender.com/users/register";
    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        // console.log(response.data.token);
        //localStorage.setItem("token", response.data.token);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      });

    console.log(data);
  };

  return (
    <div className={"SignUp_container"}>
      <div className={"SignUp_form_container"}>
        <div className={"left"}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={"white_btn"}>
              SignIn
            </button>
          </Link>
        </div>
        <div className={"right"}>
          <form className={"form_container"} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type={"text"}
              name={"username"}
              placeholder={"username"}
              value={data.username}
              required
              onChange={handleChange}
              className={"input"}
            />

            <input
              type={"text"}
              name={"email"}
              placeholder={"E-Mail"}
              value={data.email}
              required
              onChange={handleChange}
              className={"input"}
            />
            <input
              type={"text"}
              name={"password"}
              placeholder={"password"}
              value={data.password}
              required
              onChange={handleChange}
              className={"input"}
            />

            {error && <div className={"error_msg"}>{error}</div>}
            <button type="submit" className={"green_btn"}>
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
