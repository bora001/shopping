import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

function ProductList() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/product/list").then((response) => {
      console.log(response.data.products);
      setProducts(response.data.products);
    });
  }, []);
  return (
    <div>
      {Products &&
        Products.map((info, index) => {
          return (
            <Col lg={6} md={8} xs={24} key={index}>
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
    </div>
  );
}

export default ProductList;
