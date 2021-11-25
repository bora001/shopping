import React from "react";
import { SearchOutlined } from "@ant-design/icons";

function Search({ onSearch, onChange }) {
  return (
    <div style={{ display: "flex", justifyContent: "end", margin: "1% 2%" }}>
      <form
        style={{
          width: "190px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onSubmit={onSearch}
      >
        <input
          style={{
            border: "none",
          }}
          onChange={onChange}
        />

        <button style={{ border: "none" }} onSubmit={onSearch}>
          <SearchOutlined
            style={{ color: "rgba(197, 116, 10, 0.726)", cursor: "pointer" }}
          />
        </button>
      </form>
    </div>
  );
}

export default Search;
