import React, { useState, useEffect } from "react";
import {
  PlusSquareOutlined,
  MinusSquareOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";
import axios from "axios";

function CartItem({ info }) {
  const [UserId, setUserId] = useState("");
  useEffect(() => {
    let token = window.localStorage.getItem("x_auth");
    axios.post("/api/auth", { token }).then((response) => {
      setUserId(response.data.user._id);
    });
  }, []);

  const itemDelete = (id) => {
    axios
      .post("/api/product/cart/delete", { _id: UserId, ProductId: id })
      .then((response) => {
        console.log(response.data);
      });
  };
  console.log(info);
  return (
    <div
      style={{ display: "flex", border: "2px solid red", alignItems: "center" }}
    >
      <img src={`http://localhost:5000/${info.img}`} style={{ width: "20%" }} />
      <div
        style={{
          display: "flex",
          fontSize: "22px",
          width: "80%",
          padding: "0 4%",
        }}
      >
        <p
          style={{
            width: "30%",
          }}
        >
          {info.title}
        </p>
        <p
          style={{
            width: "30%",
          }}
        >
          $ {info.price}
        </p>
        <div
          style={{
            width: "30%",
          }}
        >
          <MinusSquareOutlined />
          <span style={{ margin: "0 4%", display: "inline-block" }}>
            {info.Qty}
          </span>
          <PlusSquareOutlined />
        </div>
        <p
          style={{
            width: "30%",
          }}
        >
          $ {info.total}
        </p>
        <div style={{ width: "20%" }}>
          <DeleteTwoTone
            twoToneColor="#eb2f96"
            onClick={() => itemDelete(info.ProductId)}
          />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
