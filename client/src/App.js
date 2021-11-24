import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Nav from "./pages/LandingPage/Section/Nav";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import UploadPage from "./pages/UploadPage/UploadPage";

function App() {
  const [newBody, setnewBody] = useState("");
  const [limit, setlimit] = useState(3);
  const [skip, setskip] = useState(0);
  const [search, setsearch] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    setsearch(value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    let body = { skip: skip + limit, limit, search };
    setnewBody(body);
  };

  const getMenuPage = (e) => {
    let menu = e.target.innerText;
    let body = { skip: skip + limit, limit, menu };
    setnewBody(body);
  };

  return (
    <Router>
      <div>
        <Nav
          onChange={onChange}
          onSearch={onSearch}
          getMenuPage={getMenuPage}
        />
        <Routes>
          <Route exact path="/" element={<LandingPage newBody={newBody} />} />
          <Route exact path="/upload" element={<UploadPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
