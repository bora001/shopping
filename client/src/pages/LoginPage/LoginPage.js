import React from "react";

function LoginPage() {
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
      >
        <label for="Email">Email</label>
        <input id="Email" />
        <label for="Password">Password</label>
        <input id="Password" />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
