import React from "react";
import { Row, Col } from "antd";

function ProductList({ Products }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "85%",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Row style={{ border: "2px solid red" }}>
            {Products.map((info, index) => {
              return (
                <Col
                  lg={8}
                  md={8}
                  xs={24}
                  key={index}
                  style={{ padding: "2%" }}
                  // onClick={() => getProductInfo(info)}
                >
                  <a href={`/product/${info._id}`}>
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
                  </a>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
