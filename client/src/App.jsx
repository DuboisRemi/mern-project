import React, { useContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Routes from "./components/Routes";
import NavBar from "./components/NavBar";
import UserContext from "./AppContext";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
import axios from "axios";
import Context from "react-redux/lib/components/Context";

require("dotenv").config();

const App = () => {
  const dispatch = useDispatch();
  const [uid, setUid] = useState("default");
  const [loading, setLoading] = useState(true);
  const defineUid = (id) => {
    setUid(id);
  };
  useEffect(() => {
    async function fetchUser() {
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/user/currentUser`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data) setUid(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    }
    if (loading && uid === "default") {
      fetchUser();
    }
    if (uid !== "default") {
      dispatch(getUser(uid));
    }
  }, [uid, loading, dispatch]);

  return (
    <UserContext.Provider value={{ uid, defineUid, loading }}>
      <React.Fragment>
        <CssBaseline />
        <NavBar />
        <Routes />
      </React.Fragment>
    </UserContext.Provider>
  );
};

export default App;
