import React, { useState, useEffect } from "react";
import {
  PlusSquareOutlined,
  MinusSquareOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";

function CartItem({ info }) {
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
          <DeleteTwoTone twoToneColor="#eb2f96" />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
