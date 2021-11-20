import axios from "axios";
import React, { useState } from "react";

function LoginPage() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onChange = (e) => {
    const { value, name } = e.target;
    name === "Email" ? setEmail(value) : setPassword(value);
  };

  const onLogin = (e) => {
    e.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    axios.post("/api/login", body).then((response) => {
      console.log(response.data);

      if (response.data.loginSuccess) {
        localStorage.setItem("x_auth", response.data.userId);
        // console.log(response.data.userId);
      }
    });

    // console.log(Email, "email");
    // console.log(Password, "password");
    // console.log("login");
  };

  return (
    <div>
      LoginPage✅
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          margin: "0 auto",
          textIndent: "10px",
          border: "2px solid red",
        }}
        onSubmit={onLogin}
      >
        <label htmlFor="Email">Email</label>
        <input type="email" id="Email" name="Email" onChange={onChange} />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="Password"
          name="Password"
          onChange={onChange}
        />
        <button onSubmit={onLogin}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
