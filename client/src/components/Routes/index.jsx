import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../../pages/Home.jsx";
import Profile from "../../pages/Profile.jsx";
import Trending from "../../pages/Trending";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trending" element={<Trending />} />
        <Route element={<Home />} />
      </Routes>
    </Router>
  );
};

export default index;
