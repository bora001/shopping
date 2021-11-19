import React, { useState, useRef } from "react";
import axios from "axios";
import { message } from "antd";
import "antd/dist/antd.css";

function RegisterPage() {
  const [Email, setEmail] = useState("");
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const ref = useRef("");

  const onChange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "Username":
        setUserName(value);
        return;
      case "Email":
        setEmail(value);
        return;
      case "Password":
        setPassword(value);
        return;
      case "ConfirmPassword":
        setConfirmPassword(value);
        return;
    }
  };

  const onRegister = (e) => {
    e.preventDefault();

    let emailCheck = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$/;

    if (Password !== ConfirmPassword) {
      return message.error("Incorrect password, try again");
    } else if (Password.length < 5) {
      return message.warning(
        "Password should be longer than 5 characters, try again"
      );
    } else if (UserName > 50) {
      return message.warning(
        "Username should be less than 50 characters, try again"
      );
    } else if (!emailCheck.test(Email)) {
      return message.error("Please Enter valid Email address");
    }

    let body = {
      name: UserName,
      email: Email,
      password: Password,
    };

    axios.post("/api/register", body).then((response) => {
      if (response.data.success) {
        message.success(`Welcome! ${UserName}`);
        ref.current.reset();
        setTimeout(() => {
          window.location.assign("/login");
        }, 1000);
      } else {
        alert("failed to register, Please try again");
      }
    });
  };

  return (
    <div>
      <p>Register Page 📝</p>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          margin: "0 auto",
          textIndent: "10px",
          border: "2px solid red",
        }}
        onSubmit={onRegister}
        ref={ref}
      >
        <label htmlFor="Username">UserName</label>
        <input id="Username" name="Username" onChange={onChange} />

        <label htmlFor="Email">Email</label>
        <input id="Email" name="Email" onChange={onChange} />

        <label htmlFor="Password">Password</label>
        <input id="Password" name="Password" onChange={onChange} />

        <label htmlFor="ConfirmPassword">Confirm Password</label>
        <input
          id="ConfirmPassword"
          name="ConfirmPassword"
          onChange={onChange}
        />
        <button onSubmit={onRegister}>Sign up</button>
      </form>
    </div>
  );
}

export default RegisterPage;
