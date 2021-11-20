import axios from "axios";
import React, { useEffect } from "react";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/test").then((response) => {
      console.log(response);
    });

    let token = window.localStorage.getItem("x_auth");
    axios.post("/api/auth", { token }).then((response) => {
      console.log("landing auth res", response.data.user);
      console.log("landing auth res");
    });
  }, []);

  const onLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    console.log("logout");
  };

  return (
    <div>
      Landing Page 🎈
      <a href="/login" style={{ border: "2px solid gold", padding: "10px" }}>
        login
      </a>
      <a href="/register" style={{ border: "2px solid gold", padding: "10px" }}>
        register
      </a>
      <button onClick={onLogout}>logout</button>
    </div>
  );
}

export default LandingPage;
