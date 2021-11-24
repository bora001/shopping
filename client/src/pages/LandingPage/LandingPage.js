import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductList from "../ProductList/ProductList";

function LandingPage({ newBody }) {
  const [CurrentPage, setCurrentPage] = useState("Main");
  const [limit, setlimit] = useState(3);
  const [skip, setskip] = useState(0);
  const [Products, setProducts] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [searchActive, setsearchActive] = useState(false);

  useEffect(() => {
    let body = { skip, limit };
    if (newBody) {
      getProducts(newBody);
      let method = Object.keys(newBody)[2];
      if (method !== undefined) {
        setCurrentPage(method);
      }
    } else {
      getProducts(body);
    }
  }, [newBody]);

  const getProducts = (body) => {
    console.log(body);
    axios.post("/api/product/getlist", body).then((response) => {
      console.log("api/getlist", response.data.products);
      setProducts(response.data.products);
    });
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
          <ProductList Products={Products} />
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
