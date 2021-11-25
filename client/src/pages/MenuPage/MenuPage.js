import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductList from "../ProductList/ProductList";

function MenuPage({ newBody, searchActive, keyword }) {
  const [Products, setProducts] = useState([]);
  const [getBody, setgetBody] = useState("");

  useEffect(() => {
    let search = window.location.pathname.slice(1);
    let body = { search };
    setgetBody(newBody);

    if (Object.keys(newBody)[2] === "search") {
      axios.post("/api/product/getlist", newBody).then((response) => {
        setProducts(response.data.products);
      });
    } else {
      axios.post("/api/:menu", body).then((response) => {
        setProducts(response.data.products);
      });
    }
  }, [newBody, searchActive]);

  return (
    <div>
      <ProductList
        Products={Products}
        searchActive={searchActive}
        keyword={keyword}
      />
    </div>
  );
}

export default MenuPage;
