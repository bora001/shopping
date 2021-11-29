import React, { useState, useEffect } from "react";
import {
  PlusSquareOutlined,
  MinusSquareOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";

function CartItem({ info, modifyQty, itemDelete }) {
  const [total, settotal] = useState(0);

  useEffect(() => {
    console.log(info);
    console.log(total);
  }, [info, total]);

  return (
    <div
      style={{ display: "flex", border: "2px solid red", alignItems: "center" }}
    >
      <a
        href={`http://localhost:3000/product/${info.ProductId}`}
        style={{ width: "20%" }}
      >
        <img
          src={`http://localhost:5000/${info.img}`}
          style={{ width: "100%" }}
        />
      </a>
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
          <MinusSquareOutlined
            onClick={() => modifyQty("minus", info.ProductId)}
          />
          <span style={{ margin: "0 4%", display: "inline-block" }}>
            {info.Qty}
          </span>
          <PlusSquareOutlined
            onClick={() => modifyQty("plus", info.ProductId)}
          />
        </div>
        <p
          style={{
            width: "30%",
          }}
        >
          {`${info.price * info.Qty}`}
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
