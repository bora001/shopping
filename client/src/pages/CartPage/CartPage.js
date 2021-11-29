import axios from "axios";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem/CartItem";

function CartPage() {
  const [CartInfo, setCartInfo] = useState([]);
  const [UserId, setUserId] = useState("");
  const [total, settotal] = useState([]);

  useEffect(() => {
    getCartInfo();
    console.log("h");
  }, []);

  const getCartInfo = () => {
    let token = window.localStorage.getItem("x_auth");

    axios.post("/api/auth", { token }).then((response) => {
      setCartInfo(response.data.user.cart);
      setUserId(response.data.user._id);
      // setCartInfo(response.data.user.cart);
      // settotal(
      //   response.data.user.cart && response.data.user.cart.length == 0
      //     ? response.data.user.cart
      //         .map((info) => info.Qty * info.price)
      //         .reduce((a, b) => a + b)
      //     : 0
      // );
    });
  };

  const itemDelete = (id) => {
    axios
      .post("/api/product/cart/delete", { _id: UserId, ProductId: id })
      .then((response) => {
        setCartInfo(response.data.update.cart);
      });
  };

  const modifyQty = (text, id) => {
    let newQty = text == "plus" ? 1 : -1;
    let newInfo = {
      userId: UserId,
      ProductId: id,
      Qty: newQty,
    };

    axios.post("/api/product/cart", newInfo).then((response) => {
      console.log(response.data, "data!");
      setCartInfo(response.data.update.cart);
      // settotal(
      //   response.data.user.cart && response.data.user.cart.length == 0
      //     ? response.data.user.cart
      //         .map((info) => info.Qty * info.price)
      //         .reduce((a, b) => a + b)
      //     : 0
      // );
    });
  };
  console.log(CartInfo);
  return (
    <div>
      {CartInfo &&
        CartInfo.map((info, index) => {
          return (
            <CartItem
              info={info}
              key={index}
              modifyQty={modifyQty}
              itemDelete={itemDelete}
            />
          );
        })}
      <p style={{ fontSize: "23px" }}>Total : ${total}</p>
    </div>
  );
}

export default CartPage;
