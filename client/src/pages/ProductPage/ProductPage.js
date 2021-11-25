import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductPage(props) {
  const productId = props;
  // const productId = props.match.params.productId;
  console.log(productId, "props");
  //   const [ProductInfo, setProductInfo] = useState("");
  useEffect(() => {
    console.log(props);
    let body = "";
    // axios.post("/api/product/getinfo", body).then((response) => {
    //   console.log("api/getinfo");
    //   //   setProducts(response.data.products);
    // });
  }, []);

  return <div>this is product page</div>;
}

export default ProductPage;
