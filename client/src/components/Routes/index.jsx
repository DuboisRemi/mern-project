import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import Home from "../../pages/Home.jsx";
import Profile from "../../pages/Profile.jsx";
import ProfilePage from "../Profile/ProfilePage.jsx";
import Trending from "../../pages/Trending.jsx";

const index = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/profile/:id" element={<ProfilePage/>}/>
                <Route path="/trending" element={<Trending/>}/>
                <Route element={<Home/>}/>
            </Routes>
        </Router>
    );
};

export default index;
