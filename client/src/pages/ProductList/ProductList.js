import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "antd";
import Search from "../LandingPage/Section/Search";

function ProductList() {
  const [Products, setProducts] = useState([]);
  const [limit, setlimit] = useState(4);
  const [skip, setskip] = useState(0);
  const [search, setsearch] = useState("");

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

  const searchProducts = (body) => {
    axios.post("/api/product/search", body).then((response) => {
      setProducts(response.data.products);
    });
  };

  const viewMore = (e) => {
    e.preventDefault();
    let body = { skip: skip + limit, limit };
    getProducts(body);
    setskip(skip + limit);
  };

  // search
  const onChange = (e) => {
    const { value } = e.target;
    setsearch(value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    let body = { skip: skip + limit, limit, search };
    searchProducts(body);
  };

  return (
    <div>
      <Search onChange={onChange} onSearch={onSearch} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "85%",
          margin: "0 auto",
        }}
      >
        <Row>
          {Products &&
            Products.map((info, index) => {
              return (
                <Col
                  lg={6}
                  md={8}
                  xs={24}
                  key={index}
                  style={{ padding: "2%" }}
                >
                  <div
                    className="img_box"
                    style={{
                      width: "100%",
                      height: "50%",
                      border: "2px solid blue",
                      display: "flex",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={`http://localhost:5000/${info.Image}`}
                      style={{ width: "100%", height: "100 %" }}
                    />
                  </div>
                  <div
                    className="txt_box"
                    style={{
                      fontSize: "22px",
                      padding: "3%",
                      border: "2px solid gold",
                    }}
                  >
                    <p>{info.title}</p>
                    <p>$ {info.price}</p>
                  </div>
                </Col>
              );
            })}
        </Row>
        {Products.length === 0 ? (
          <div>
            <p>
              Can not find the product by "
              <span style={{ fontWeight: "700" }}> {search}</span> "
            </p>
            <a href="/">
              <button herf="/">main page</button>
            </a>
          </div>
        ) : (
          <button onClick={viewMore}>View more</button>
        )}
      </div>
    </div>
  );
}

export default ProductList;
