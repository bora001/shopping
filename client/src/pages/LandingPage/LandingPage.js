import React, { useEffect, useState } from "react";
import ProductList from "../ProductList/ProductList";

function LandingPage({
  CurrentPage,
  Products,
  keyword,
  viewMore,
  searchActive,
}) {
  useEffect(() => {}, [searchActive]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {Products && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ProductList
            Products={Products}
            searchActive={searchActive}
            keyword={keyword}
          />
          {CurrentPage === "Main" ? (
            <button onClick={viewMore}>View more</button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default LandingPage;
