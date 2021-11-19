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
    console.log(Email, "email");
    console.log(Password, "password");
    console.log("login");
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
        <input id="Email" name="Email" onChange={onChange} />
        <label htmlFor="Password">Password</label>
        <input id="Password" name="Password" onChange={onChange} />
        <button onSubmit={onLogin}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
