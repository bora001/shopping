import axios from "axios";
import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import ProductList from "../ProductList/ProductList";

function LandingPage() {
  const [UserInfo, setUserInfo] = useState("");

  useEffect(() => {
    axios.get("/api/test").then((response) => {
      console.log(response);
    });

    let token = window.localStorage.getItem("x_auth");
    axios.post("/api/auth", { token }).then((response) => {
      setUserInfo(response.data.user);
      console.log("landing auth res", response.data.user);
    });
  }, []);
  console.log("userinfo", UserInfo);

  const onLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setUserInfo("");
  };

  return (
    <div>
      <div
        className="header"
        style={{
          display: "flex",
          backgroundColor: "#ffdc8c",
          padding: "1% 2%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Bakery 🍞</h1>
        {UserInfo && UserInfo ? (
          <div>
            <p>Welcome ! {UserInfo.name}</p>
            <a href="/upload">
              <button>Upload</button>
            </a>
            <ShoppingCartOutlined
              style={{ fontSize: "25px", color: "#Da9D26" }}
            />
            <button onClick={onLogout}>logout</button>
          </div>
        ) : (
          <div>
            <a href="/login">
              <button>login</button>
            </a>
            <a href="/register">
              <button>register</button>
            </a>
          </div>
        )}
      </div>
      <ProductList />
    </div>
  );
}

export default LandingPage;
