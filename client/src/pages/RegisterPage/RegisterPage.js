import React, { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [Email, setEmail] = useState("");
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

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
    console.log(Email, "email");
    console.log(Password, "password");
    console.log(UserName, "username");
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
