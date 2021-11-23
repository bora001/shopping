import axios from "axios";
import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import ProductList from "../ProductList/ProductList";
import Search from "./Section/Search";

function LandingPage() {
  const [CurrentPage, setCurrentPage] = useState("Main");
  const [UserInfo, setUserInfo] = useState("");
  const Menu = ["Bread", "Coffee", "Dessert", "Sandwich"];
  const [limit, setlimit] = useState(3);
  const [skip, setskip] = useState(0);
  const [search, setsearch] = useState("");
  const [Products, setProducts] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [searchActive, setsearchActive] = useState(false);

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

  const onLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setUserInfo("");
  };

  useEffect(() => {
    let body = { skip, limit };
    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/list", body).then((response) => {
      if (Products.length == 0) {
        setProducts(response.data.products);
      } else {
        console.log(response.data);
        setProducts([...Products, ...response.data.products]);
      }
    });
  };

  const onChange = (e) => {
    const { value } = e.target;
    setsearch(value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    let body = { skip: skip + limit, limit, search };
    searchProducts(body);
    setkeyword(search);
  };

  const getMenuPage = (e) => {
    e.preventDefault();
    let value = e.target.innerText;
    console.log("value", value);
    let body = { skip: skip + limit, limit, value };
    changeCategory(body);
  };

  const searchProducts = (body) => {
    axios.post("/api/product/search", body).then((response) => {
      setProducts(response.data.products);
    });
    setsearchActive(true);
  };

  const changeCategory = (body) => {
    axios.post("/api/product/category", body).then((response) => {
      setProducts(response.data.products);
    });
    setCurrentPage(body.value);
  };

  const viewMore = (e) => {
    e.preventDefault();
    let body = { skip: skip + limit, limit };
    getProducts(body);
    setskip(skip + limit);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* header */}
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
                key={index}
                style={{
                  marginRight: "10px",
                }}
              >
                <p
                  style={{
                    margin: "auto 0",
                  }}
                  onClick={getMenuPage}
                >
                  {menu}
                </p>
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

      {searchActive && Products.length === 0 ? (
        <div>
          <p>There is no result with " {keyword} "</p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ProductList Products={Products} keyword={keyword} />
          {CurrentPage === "Main" ? (
            <button onClick={viewMore}>View more</button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default LandingPage;
