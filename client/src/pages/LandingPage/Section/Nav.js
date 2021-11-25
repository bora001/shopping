import React, { useState, useEffect } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import Search from "./Search";

function Nav({ onSearch, onChange, getMenuPage }) {
  const Menu = ["Bread", "Coffee", "Dessert", "Sandwich"];
  const [UserInfo, setUserInfo] = useState("");

  useEffect(() => {
    let token = window.localStorage.getItem("x_auth");
    axios.post("/api/auth", { token }).then((response) => {
      setUserInfo(response.data.user);
      console.log("landing auth res", response.data.user);
    });
  }, []);

  const onLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setUserInfo("");
  };

  return (
    <div
      className="header"
      style={{
        width: "100%",
        display: "flex",
        backgroundColor: "#ffdc8c",
        padding: "1% 2%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h1>
        <a href="/">Bakery 🍞</a>
      </h1>

      <div
        className="menu"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {Menu.map((menu, index) => {
          return (
            <div
              onClick={getMenuPage}
              key={index}
              style={{
                marginRight: "10px",
              }}
            >
              <a href={`/${menu}`}>{menu}</a>
            </div>
          );
        })}
        <Search onChange={onChange} onSearch={onSearch} />
      </div>

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
  );
}

export default Nav;
