import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Routes from "./components/Routes";
import NavBar from "./components/NavBar";
import UserContext from "./AppContext";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
import axios from "axios";

require("dotenv").config();

const App = () => {
  const dispatch = useDispatch();
  const [uId, setUId] = useState("default");
  const [loading, setLoading] = useState(true);
  const value = {
    uId: uId,
    loading: loading,
    setUId: setUId,
  };
  useEffect(() => {
    async function fetchUser() {
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/user/currentUser`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data) setUId(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (loading && uId === "default") {
      fetchUser();
      setLoading(false);
    }
    if (uId !== "default") {
      dispatch(getUser(uId));
    }
  }, [uId, loading, dispatch]);

  return (
    <UserContext.Provider value={value}>
      <React.Fragment>
        <CssBaseline />
        <NavBar />
        <Routes />
      </React.Fragment>
    </UserContext.Provider>
  );
};

export default App;
