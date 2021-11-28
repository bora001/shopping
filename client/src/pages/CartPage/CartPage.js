import axios from "axios";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem/CartItem";

function CartPage() {
  const [CartInfo, setCartInfo] = useState([]);
  const [total, settotal] = useState([]);

  useEffect(() => {
    let token = window.localStorage.getItem("x_auth");
    axios.post("/api/auth", { token }).then((response) => {
      setCartInfo(response.data.user.cart);
      settotal(
        response.data.user.cart
          .map((info) => info.total)
          .reduce((a, b) => a + b)
      );
    });
  }, []);

  return (
    <div>
      {CartInfo &&
        CartInfo.map((info, index) => {
          return <CartItem info={info} key={index} />;
        })}
      <p style={{ fontSize: "23px" }}>Total : ${total}</p>
    </div>
  );
}

export default CartPage;
