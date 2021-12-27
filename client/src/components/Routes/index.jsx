import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../pages/Home.jsx";
import Profile from "../pages/Profile.jsx";
import Trending from "../pages/Trending.jsx";
import Auth from "../pages/Auth.jsx";

const index = () => {
  return (
    <Router basename={"/mern-network"}>
      <Routes>
        <Route  path= {`/`} element={<Home />} />
        <Route  path={`/profile`} element={<Profile />} />
        <Route  path={`/trending`} element={<Trending />} />
        <Route  path={`/auth`} element={<Auth signup={false} signin={true} />} />
      </Routes>
    </Router>
  );
};

export default index;
