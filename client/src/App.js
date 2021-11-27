import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Nav from "./pages/LandingPage/Section/Nav";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import UploadPage from "./pages/UploadPage/UploadPage";
import axios from "axios";
import MenuPage from "./pages/MenuPage/MenuPage";

function App() {
  const [CurrentPage, setCurrentPage] = useState("Main");
  const [limit, setlimit] = useState(3);
  const [skip, setskip] = useState(0);
  const [Products, setProducts] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [searchActive, setsearchActive] = useState(false);
  const [newBody, setnewBody] = useState("");
  const [search, setsearch] = useState("");

  let method = Object.keys(newBody)[2];

  useEffect(() => {
    let body = { skip, limit };

    if (newBody) {
      if (method !== undefined) {
        setCurrentPage(method);
      }
      getProducts(newBody);
    } else {
      getProducts(body);
    }
  }, [newBody]);

  const onChange = (e) => {
    const { value } = e.target;
    setsearch(value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    let body = { skip: skip + limit, limit, search };
    console.log(search);
    setnewBody(body);
    setsearchActive(true);
    setkeyword(search);
    e.target.reset();
    console.log("Search!");
  };

  const getMenuPage = (e) => {
    let menu = e.target.innerText;
    let body = { skip: skip + limit, limit, menu };
    setnewBody(body);
  };

  const getProducts = (body) => {
    axios.post("/api/product/getlist", body).then((response) => {
      console.log(response.data);
      setProducts(response.data.products);
    });
  };

  const viewMore = (e) => {
    e.preventDefault();
    let body = { skip, limit: limit + limit };

    getProducts(body);
    setlimit(limit + limit);
  };

  return (
    <div>
      <Nav onChange={onChange} onSearch={onSearch} getMenuPage={getMenuPage} />
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <LandingPage
                Products={Products}
                CurrentPage={CurrentPage}
                keyword={keyword}
                searchActive={searchActive}
                viewMore={viewMore}
              />
            }
          />
          <Route path="/upload" element={<UploadPage path="upload" />} />
          <Route path="/login" element={<LoginPage path="/login" />} />
          <Route path="/register" element={<RegisterPage path="/register" />} />
          <Route
            path="/product/:productId"
            element={<ProductPage path="/product/" props />}
          />
          <Route
            path="/:menu"
            element={
              <MenuPage
                path="/:menu"
                onChange={onChange}
                onSearch={onSearch}
                searchActive={searchActive}
                newBody={newBody}
                keyword={keyword}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
