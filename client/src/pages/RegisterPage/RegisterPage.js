import React from "react";

function RegisterPage() {
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
      >
        <label for="Username">UserName</label>
        <input id="Username" />

        <label for="Email">Email</label>
        <input id="Email" />

        <label for="Password">Password</label>
        <input id="Password" />

        <label for="ConfirmPassword">Confirm Password</label>
        <input id="ConfirmPassword" />
        <button>Sign up</button>
      </form>
    </div>
  );
}

export default RegisterPage;
