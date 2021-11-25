import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import axios from "axios";
import { message } from "antd";

function UploadPage(props) {
  const [Image, setImage] = useState("");
  const [Info, setInfo] = useState({
    title: null,
    Image: null,
    desc: null,
    price: null,
    option: null,
  });

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "form-data" },
    };
    formData.append("file", files[0]);

    axios.post("api/product/image", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data, "res uploadpage");
        setImage(response.data.filePath);
        setInfo({ ...Info, Image: response.data.filePath });
      } else {
        alert("failed to upload image");
      }
    });

    console.log(files, "upload file");
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    console.log("change img", Image);
    setInfo({ ...Info, [name]: value, Image });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(Info);
    let err = Object.entries(Info).filter((obj) => Boolean(obj[1]) === false);

    if (err.length !== 0) {
      console.log("info", err[0][0]);
      message.warning(`Please enter the ${err[0][0]}`);
    } else {
      axios.post("/api/product", Info).then((response) => {
        if (response.data.success) {
          message.success(`Thank you for upload!`);
          window.location.assign("/");
        } else {
          message.error("failed to upload, try again");
        }
      });
    }
  };

  return (
    <div>
      <h1>Upload Page</h1>
      <div>
        <div className="img_box" style={{ display: "flex" }}>
          <Dropzone onDrop={onDrop}>
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
          >
            <img src={`http://localhost:5000/${Image}`} />
          </div>
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
          <div className="input_right">
            <form
              onSubmit={onSubmit}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <input type="text" name="title" onChange={onChange} />
              <textarea type="text" name="desc" onChange={onChange} />
              <input type="number" name="price" onChange={onChange} />
              <select name="option" onChange={onChange}>
                <option>Bread</option>
                <option>Coffee</option>
                <option>Dessert</option>
                <option>Sandwich</option>
              </select>
              <button onSubmit={onSubmit}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
