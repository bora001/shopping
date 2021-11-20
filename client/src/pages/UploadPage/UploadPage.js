import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";

function UploadPage() {
  return (
    <div>
      <h1>Upload Page</h1>
      <div>
        <div className="img_box" style={{ display: "flex" }}>
          <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "250px",
                  height: "250px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid black",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined style={{ fontSize: "32px" }} />
              </div>
            )}
          </Dropzone>

          <div
            className="img_right"
            style={{
              backgroundColor: "rgba(196, 196, 196, 0.3)",
              width: "250px",
              height: "250px",
              display: "flex",
            }}
          ></div>
        </div>
        <div className="input_box" style={{ display: "flex" }}>
          <div
            className="input_left"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>Title</label>
            <label>Description</label>
            <label>Price $</label>
          </div>
          <div
            className="input_right"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <input type="text" name="title" />
            <textarea type="text" name="description" />
            <input type="number" name="price" />
            <select>
              <option>bread</option>
              <option>coffee</option>
            </select>
          </div>
        </div>
        <button>Submit</button>
      </div>
    </div>
  );
}

export default UploadPage;
