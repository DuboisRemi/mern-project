import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../../pages/Home.jsx";
import Profil from "../../pages/Profil.jsx";
import Trending from "../../pages/Trending";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/trending" element={<Trending />} />
        <Route element={<Home />} />
      </Routes>
    </Router>
  );
};

export default index;
