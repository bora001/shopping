import axios from "axios";
import React, { useEffect } from "react";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/test").then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <div>
      Landing Page 🎈
      <a href="/login" style={{ border: "2px solid gold", padding: "10px" }}>
        login
      </a>
      <a href="/register" style={{ border: "2px solid gold", padding: "10px" }}>
        register
      </a>
    </div>
  );
}

export default LandingPage;
