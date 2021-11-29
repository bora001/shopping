import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusSquareOutlined, MinusSquareOutlined } from "@ant-design/icons";

function ProductPage(props) {
  let length = props.path.length;
  const productId = window.location.pathname.slice(length);
  const [Qty, setQty] = useState(1);
  const [ProductInfo, setProductInfo] = useState({});
  const [UserId, setUserId] = useState("");

  useEffect(() => {
    let token = window.localStorage.getItem("x_auth");
    axios.post("/api/auth", { token }).then((response) => {
      setUserId(response.data.user._id);
    });

    axios.post("/api/product/getinfo", { _id: productId }).then((response) => {
      setProductInfo(Object.assign({}, ...response.data.info));
    });
  }, []);

  const minus = () => {
    if (Qty > 1) {
      setQty(Qty - 1);
    }
  };

  const plus = () => {
    setQty(Qty + 1);
  };

  const addCart = (ProductInfo) => {
    let newInfo = {
      userId: UserId,
      ProductId: ProductInfo._id,
      img: ProductInfo.Image,
      title: ProductInfo.title,
      price: ProductInfo.price,
      Qty: Qty,
    };

    axios.post("/api/product/cart", newInfo).then((response) => {
      console.log(response.data);
    });
    console.log(newInfo);
  };
  console.log(ProductInfo);

  return (
    <div style={{ display: "flex" }}>
      <div className="img_box">
        <img
          src={`http://localhost:5000/${ProductInfo.Image}`}
          style={{ width: "100%", height: "100 %" }}
        />
      </div>
      <div style={{ padding: "2%", fontSize: "17px" }}>
        <div className="txt_box">
          <p>{ProductInfo.title}</p>
          <p>{ProductInfo.desc}</p>
          <p>$ {ProductInfo.price}</p>
        </div>

        <div
          style={{
            width: "30%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "22px",
          }}
        >
          <MinusSquareOutlined onClick={minus} />
          <span>{Qty}</span>
          <PlusSquareOutlined onClick={plus} />
        </div>

        <button onClick={() => addCart(ProductInfo)}>Add Cart</button>
      </div>
    </div>
  );
}

export default ProductPage;
